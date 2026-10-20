# Customer Voice Hub – Demo Runbook (Hyundai MT interview, 29 Oct 2026)

## What is live
| Piece | Where | Who can use it |
|---|---|---|
| Command Center page | Claude artifact link (shared: anyone with the link) | Anyone |
| Ask the Hub (in the page) | Same page, opened in Claude by you | You (uses your Claude account) |
| Public chatbot (n8n AI Agent + Gemini) | https://lumpish-character-reload.ngrok-free.dev/webhook/ca0d46d6-0a19-42a9-b7bc-64d1a43d363e/chat (on your laptop: http://localhost:5678/webhook/ca0d46d6-0a19-42a9-b7bc-64d1a43d363e/chat) | Anyone, while your laptop is on |
| MCP #1 Review Intelligence | https://lumpish-character-reload.ngrok-free.dev/mcp/hyundai-review-intel | Claude Cowork (your plugin) |
| MCP #2 Escalation Radar | https://lumpish-character-reload.ngrok-free.dev/mcp/hyundai-escalation-radar | Claude Cowork (your plugin) |
| Plugin: hyundai-customer-voice | Claude → Settings → Plugins | You |

## Morning check (15 min before)
1. Laptop on charger. Windows: Settings → System → Power → Sleep = Never.
2. Open Docker Desktop, wait for "Engine running".
3. PowerShell: `docker ps` → `n8n` and `ngrok` both "Up". If not: `docker start n8n` then `docker start ngrok`.
4. Browser: open the ngrok URL → n8n login appears (click "Visit Site" if ngrok warns).
5. Open the public chatbot URL → ask "Which defect is most urgent?" → answer mentions DCT judder, 16 reports.
6. Cowork, new task, plugin on: "Triage this: 'Exter ka AC bilkul thanda nahi karta, service center ne kuch nahi kiya.'"
7. Open the Command Center → switch theme → click "Ask the Hub" chip once (allow Claude).
8. Keep backups: screenshots of each step in a folder, in case Wi-Fi fails.

## 5-minute demo flow
1. **Problem (30 s)** – "The same defect gets reported by 16 customers in 8 cities, and nobody connects them until it becomes a big escalation."
2. **Command Center (60 s)** – gauges → escalation queue (show the 'why' chips) → recurring defects → model table (Exter = AC).
3. **Live AI agent (90 s)** – Cowork triage of the Hinglish complaint: Gemini translates in n8n, rules score, the skill overrides churn and routes to two teams. Show the Gmail draft.
4. **Public bot (45 s)** – interviewer types a question into the n8n chatbot on their own phone.
5. **Architecture + honest limit (45 s)** – rules for audit-trail decisions, AI for judgment; runs on a laptop today, next step is cloud n8n with real ticket data.

## 2-minute pitch (say it out loud 3 times)
"I built Customer Voice Hub, an AI command center for after-sales quality, on synthetic Hyundai India data.
The problem: complaints arrive through reviews, social media and dealer tickets, and a recurring defect – like DCT judder across Venue, Verna and Creta in 8 cities – looks like 16 separate complaints.
I built two custom MCP tools in n8n. The first scores any complaint – Gemini translates Hindi or Hinglish, then auditable rules give sentiment, themes, urgency and the owner team. The second ranks open tickets on a 0–100 risk score with five business rules and clusters recurring defects.
Claude Cowork is the agent on top. A plugin with five skills tells it how Hyundai would triage, escalate, brief leadership and reply to customers – for example, it never promises a fix date and only creates Gmail drafts, never sends.
When I tested it, the agent caught gaps in my own rules – a churn threat my keywords missed – and the skill now corrects that, showing every override.
Today it runs on my laptop with synthetic data. The next step is cloud hosting and a real ticketing feed. For a Management Trainee, the point is this: I can take a business problem, design the decision rules, and use AI to make them faster and more consistent."

## Likely questions
- **Why rules and not just AI?** Escalation and safety decisions need consistency and an audit trail; the LLM handles language and judgment, and every override is shown.
- **What if Gemini fails?** The LLM step is set to continue on error; the tool falls back to the original text and rules.
- **Is the data real?** No – synthetic, built to mirror realistic patterns. Next step: connect a ticketing system.
- **What did you learn?** MCP servers, n8n sub-workflows, prompt and skill design, Docker, tunnels, and that agents need guardrails.

## Security after the interview
- ngrok dashboard → Authtoken → Reset, then recreate the ngrok container with the new token.
- `docker stop ngrok` when not demoing.
