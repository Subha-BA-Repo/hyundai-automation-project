# Hyundai Customer Voice (plugin)

Bundles 5 skills and 2 custom n8n MCP connectors for the Hyundai Customer Voice & Service Insight Hub.

## Skills
| Skill | Purpose |
|---|---|
| complaint-triage | Score a complaint, match it to recurring defects, apply Hyundai judgment rules, route to all owner teams |
| escalation-email | Gmail draft to the owning team in a fixed P1/P2/P3 format |
| quality-brief | One-page leadership brief with a fixed structure; optional Drive doc and Gmail draft |
| customer-reply | Warm, brand-safe customer reply in English or Hinglish; never promises fixes or admits liability |
| data-guardrails | No invented numbers, synthetic-data labels, need-to-know, humans send |

## Connectors
- `hyundai-review-intelligence`: n8n MCP, tool `score_review`
- `hyundai-escalation-radar`: n8n MCP, tool `escalation_radar`
- Uses the user's own Gmail, Google Calendar and Google Drive connectors.

Requires the n8n Docker container and the ngrok tunnel to be running on the author's laptop. All data is synthetic.
