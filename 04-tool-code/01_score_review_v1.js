// ===== Hyundai Review Scorer (MCP #1, tool 1) =====
// Input arrives from Claude via the MCP tool: review_text, model
const input = $input.first().json;
const text = String(input.review_text || '').toLowerCase();
const model = input.model || 'Not specified';

// 1) THEMES – which part of the car / ownership experience is the customer talking about?
const THEMES = {
  'Mileage': ['mileage', 'kmpl', 'fuel efficiency', 'fuel economy'],
  'ADAS & Safety': ['adas', 'airbag', 'lane keep', 'collision', 'brake', 'unsafe'],
  'Infotainment & Bluelink': ['bluelink', 'infotainment', 'touchscreen', 'android auto', 'screen'],
  'Ride & Comfort': ['ride', 'suspension', 'seat', 'cabin', 'cramped'],
  'Build Quality': ['rattle', 'build quality', 'fit and finish', 'panel gap', 'trim'],
  'AC & Cooling': [' ac ', 'cooling', 'climate control', 'compressor'],
  'Transmission': ['dct', 'gearbox', 'judder', 'jerk', 'clutch', 'gear'],
  'Sunroof': ['sunroof', 'roof lining'],
  'Service Experience': ['service advisor', 'advisor', 'follow-up', 'called back', 'service took'],
  'Service Cost': ['bill', 'estimate', 'charged', 'cost'],
  // EXERCISE: add 'Delivery & Waiting' and 'Spare Parts' yourself (look at the reviews for the words customers use)
};

// 2) OWNER – which Hyundai team should act on each theme
const OWNER = {
  'Mileage': 'Product Planning', 'ADAS & Safety': 'Quality & Safety', 'Infotainment & Bluelink': 'Connected Car (Bluelink)',
  'Ride & Comfort': 'Product Planning', 'Build Quality': 'Plant Quality', 'AC & Cooling': 'Service Engineering',
  'Transmission': 'Powertrain Quality', 'Sunroof': 'Plant Quality', 'Service Experience': 'Dealer Network / Customer Care',
  'Service Cost': 'After-Sales Pricing',
};

// 3) WORD LISTS for sentiment and business risk
const POSITIVE = ['excellent', 'good', 'great', 'smooth', 'solid', 'premium', 'superb', 'best', 'useful', 'polite',
  'affordable', 'reasonable', 'quick', 'fast', 'perfect', 'memorable', 'blessing', 'quiet', 'easy', 'peace of mind', 'on time'];
const NEGATIVE = ['poor', 'bad', 'weak', 'leak', 'rattle', 'judder', 'jerk', 'freeze', 'drops', 'disconnect', 'annoying',
  'falsely', 'cramped', 'stiff', 'delay', 'longer than promised', 'never', 'higher than', 'not available', 'stuck', 'too long',
  'unsafe', 'hesitation', 'noise', 'not cooling', 'wet', 'blocked'];
const SAFETY = ['unsafe', 'brake', 'lurch', 'airbag', 'fire', 'smoke', 'steering', 'hesitat'];
const CHURN = ['switch brand', 'never buy', 'social media', 'consumer court', 'refund', 'worst'];

// 4) Split the review into clauses, so "AC is great but mileage is poor" is scored part by part
const clauses = text.split(/[.;!?,]|\bbut\b|\bhowever\b/).map(c => c.trim()).filter(Boolean);
let pos = 0, neg = 0;
const themes = {};
for (const c of clauses) {
  const p = POSITIVE.filter(w => c.includes(w)).length;
  const n = NEGATIVE.filter(w => c.includes(w)).length;
  pos += p; neg += n;
  const polarity = n > p ? 'negative' : p > n ? 'positive' : 'neutral';
  for (const [theme, words] of Object.entries(THEMES)) {
    if (words.some(w => (' ' + c + ' ').includes(w))) {
      if (!themes[theme] || polarity === 'negative') themes[theme] = polarity;
    }
  }
}

// 5) Sentiment score from -1 (very negative) to +1 (very positive)
const score = pos + neg ? Number(((pos - neg) / (pos + neg)).toFixed(2)) : 0;
const sentiment = score >= 0.34 ? 'Positive' : score <= -0.34 ? 'Negative' : 'Mixed';

// 6) Business rules – this is the part no off-the-shelf connector does
const safety = neg > 0 && SAFETY.some(w => text.includes(w));
const churn = CHURN.some(w => text.includes(w));
const negThemes = Object.keys(themes).filter(t => themes[t] === 'negative');
const urgency = safety ? 'Critical' : (churn || score <= -0.6) ? 'High' : negThemes.length ? 'Medium' : 'Low';

return [{
  json: {
    model,
    sentiment,
    sentiment_score: score,
    urgency,
    safety_flag: safety,
    churn_signal: churn,
    themes: Object.entries(themes).map(([theme, polarity]) => ({ theme, polarity, owner: OWNER[theme] })),
    route_to: negThemes.length ? OWNER[negThemes[0]] : 'No action – share as positive feedback',
    reason: negThemes.length
      ? `Negative about ${negThemes.join(', ')}${safety ? ', with a safety keyword' : ''}${churn ? ', and a churn signal' : ''}.`
      : 'No negative theme found.',
  }
}];
