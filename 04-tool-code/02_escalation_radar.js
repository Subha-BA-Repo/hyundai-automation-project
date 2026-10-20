// ===== Hyundai Service Escalation Radar (MCP #2, tool: escalation_radar) =====
// Inputs (from Claude): model ("All" or a model name), limit (how many tickets to return)
// Data: every row of the Service Tickets Google Sheet arrives as one item from "Extract from File"
const params = $('When Executed by Another Workflow').first().json;
const modelFilter = String(params.model || 'All').trim().toLowerCase();
const limit = Number(params.limit) || 5;
const tickets = $input.all().map(i => i.json);

// 1) Who owns each complaint category
const OWNER = {
  'Transmission': 'Powertrain Quality', 'Sunroof': 'Plant Quality', 'Build Quality': 'Plant Quality',
  'Infotainment & Bluelink': 'Connected Car (Bluelink)', 'AC & Cooling': 'Service Engineering',
  'Spare Parts': 'Parts Supply Chain', 'ADAS & Safety': 'Quality & Safety',
  'Service Cost': 'After-Sales Pricing', 'Service Experience': 'Dealer Network / Customer Care',
};

// 2) Count how many customers reported each underlying issue (cluster)
const clusters = {};
for (const t of tickets) {
  const c = clusters[t.issue_cluster] ||= { issue: t.issue_cluster, category: t.category, total: 0, open: 0, models: {}, cities: new Set(), safety: false };
  c.total++;
  if (t.status !== 'Resolved') c.open++;
  c.models[t.model] = (c.models[t.model] || 0) + 1;
  c.cities.add(t.city);
  if (t.safety_related === 'Yes') c.safety = true;
}

// 3) Risk score 0-100 for one ticket – Hyundai's own escalation rules
function riskOf(t) {
  const why = [];
  let score = 0;
  const add = (pts, reason) => { if (pts > 0) { score += pts; why.push(`+${pts} ${reason}`); } };
  const days = Number(t.days_open) || 0, visits = Number(t.repeat_visits) || 0;
  const size = clusters[t.issue_cluster].total;
  add(days > 30 ? 25 : days > 14 ? 18 : days > 7 ? 10 : 4, `open ${days} days`);
  add(Math.min(visits * 10, 25), `${visits} repeat workshop visit(s)`);
  add(t.safety_related === 'Yes' ? 25 : 0, 'safety-related');
  add(size >= 10 ? 15 : size >= 6 ? 8 : 0, `recurring issue (${size} reports)`);
  add(t.customer_type !== 'Retail' ? 8 : 0, `${t.customer_type} customer`);
  score = Math.min(score, 100);
  const level = score >= 60 ? 'Escalate today' : score >= 35 ? 'Watch' : 'Routine';
  return {
    ticket_id: t.ticket_id, model: t.model, city: t.city, dealer: t.dealer, issue: t.issue_cluster,
    description: t.description, risk_score: score, level, why, owner: OWNER[t.category] || 'Customer Care',
  };
}

// 4) Rank the open tickets (optionally for one model)
const open = tickets.filter(t => t.status !== 'Resolved' && (modelFilter === 'all' || t.model.toLowerCase() === modelFilter));
const ranked = open.map(riskOf).sort((a, b) => b.risk_score - a.risk_score);

// 5) Recurring issues = the pattern no single service advisor can see
const recurring = Object.values(clusters)
  .filter(c => c.total >= 8 && (modelFilter === 'all' || Object.keys(c.models).some(m => m.toLowerCase() === modelFilter)))
  .sort((a, b) => b.total - a.total)
  .map(c => ({ issue: c.issue, category: c.category, total_reports: c.total, still_open: c.open,
               models: c.models, cities: c.cities.size, safety_related: c.safety, owner: OWNER[c.category] || 'Customer Care' }));

return [{
  json: {
    scope: modelFilter === 'all' ? 'All models' : params.model,
    open_tickets: open.length,
    escalate_today: ranked.filter(r => r.level === 'Escalate today').length,
    top_risks: ranked.slice(0, limit),
    recurring_issues: recurring,
    note: 'Synthetic demo data. Risk rules: days open, repeat visits, safety, recurrence, fleet/corporate customer.',
  }
}];
