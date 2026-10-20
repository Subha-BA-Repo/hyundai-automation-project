# Tool code

| File | Used in | What it does |
|---|---|---|
| `01_score_review_v2_gemini.js` | Tool – Score Review → Code node (current) | Takes Gemini's English text and scores it: sentiment, 12 topics, urgency, safety and churn flags, owner team |
| `01_score_review_v1.js` | First version, kept for reference | Same rules without the Gemini step |
| `02_escalation_radar.js` | Tool – Escalation Radar → Code node | Risk score 0–100 for each open ticket and groups of repeated faults |
| `prompts-and-descriptions.md` | All workflows | Every prompt, tool description, setting and the chat page styling |
