# Sticky notes for the n8n canvases

How to add one: right-click an empty spot on the canvas → **Add sticky note** (or press Shift + S) → double-click it → paste → drag the corner to make it wide → Save. Notes do not need republishing.

## Option 1 · One paragraph per workflow (recommended)

**Tool – Score Review**
```
**Score Review** – This workflow scores one customer complaint and is used by both Claude and the chatbot. It receives the complaint text and the car model, then sends the text to Google Gemini, which translates Hindi or Hinglish into plain English (if Gemini is busy or fails, the original text is used so the tool never stops). The Code node then applies our business rules: it finds which of 12 topics the customer is talking about (gearbox, AC, sunroof, service and so on), scores the tone from −1 (very negative) to +1 (very positive), sets the urgency, flags safety and churn risks, and names the team that should act. To add a new topic or change a team, edit the THEMES and OWNER lists at the top of the code. Website: [Customer Voice Hub](https://claude.ai/artifact/5zcaETuNP1thw1ksJPTWLv)
```

**Tool – Escalation Radar**
```
**Escalation Radar** – This workflow ranks every open service ticket by risk and finds faults that many customers are reporting. It receives a car model (or "All") and how many tickets to list, then reads the live Service Tickets Google Sheet fresh on every run, turns it into one row per ticket, and applies five rules to give each open ticket a risk score from 0 to 100: days open, repeat workshop visits, safety, whether the fault is repeated across customers, and fleet or corporate customers. A score of 60 or more means escalate today, 35–59 means watch. It also groups tickets about the same fault, such as the DCT gearbox judder reported 16 times across 3 models in 8 cities. To use new data, change the sheet link in the HTTP Request node. Website: [Customer Voice Hub](https://claude.ai/artifact/5zcaETuNP1thw1ksJPTWLv)
```

**MCP 1 – Review Intelligence**
```
**Review Intelligence (tool for Claude)** – This workflow makes our complaint scoring available to Claude. When someone asks Claude to check a complaint, Claude reads the tool description, decides to use it, and sends the complaint text and car model here. This workflow passes them to "Tool – Score Review" and returns the result to Claude, which then explains it, routes it to the right teams and can draft the follow-up email. Claude reaches this workflow through our fixed ngrok web address, so it works whenever the laptop and Docker Desktop are running. Website: [Customer Voice Hub](https://claude.ai/artifact/5zcaETuNP1thw1ksJPTWLv)
```

**MCP 2 – Service Escalation Radar**
```
**Escalation Radar (tool for Claude)** – This workflow makes our ticket risk ranking available to Claude. When someone asks Claude which cases to escalate or whether a problem is widespread, Claude sends a car model (or "All") and a number of tickets here. This workflow runs "Tool – Escalation Radar", which reads the live ticket sheet, and returns the ranked tickets with their reasons and the list of repeated faults. Claude then turns that into a decision, an escalation email or a leadership brief. Website: [Customer Voice Hub](https://claude.ai/artifact/5zcaETuNP1thw1ksJPTWLv)
```

**Chat – Hub Bot**
```
**Hub Bot (chatbot)** – This workflow is a chatbot anyone can use in a web browser. A question typed on the chat page goes to the AI Agent, powered by Google Gemini, which decides whether to use Score Review (for a single complaint) or Escalation Radar (for tickets and repeated faults), reads the result and replies in a few short lines with one recommended action. Simple Memory keeps the last 10 messages so follow-up questions make sense, and automatic retries plus a backup AI model keep it working if Google is busy. It uses the same two tools as Claude, so both always give the same numbers. Chat page: [Open the chatbot](http://localhost:5678/webhook/ca0d46d6-0a19-42a9-b7bc-64d1a43d363e/chat) · Website: [Customer Voice Hub](https://claude.ai/artifact/5zcaETuNP1thw1ksJPTWLv)
```

**00 Warm-up – Review Ratings** (optional)
```
**Warm-up** – My first workflow, built to learn the basics. It downloads the Customer Reviews Google Sheet, turns it into 180 rows, converts the ratings into numbers, works out the average rating and review count for each car model, and sorts them from lowest to highest. It showed that the Exter has the lowest rating (2.61 out of 5), mostly because of weak AC cooling, which is the kind of pattern the main tools now find automatically.
```

**About the pinned test data:** the purple pin on the "When Executed by Another Workflow" node is only used when you click Execute in the editor. Real calls from Claude or the chatbot ignore it, so it is safe to keep for manual demos.

---

## Option 2 · Small notes for each step
## Chat – Hub Bot

**Big note (left of the chat trigger, yellow)**
```
## Customer Voice Hub · Chatbot
An AI assistant that answers questions about customer complaints and service tickets, using our two tools.

**Website:** [Customer Voice Hub](https://claude.ai/artifact/5zcaETuNP1thw1ksJPTWLv)
**Chat page:** [Open the chatbot](http://localhost:5678/webhook/ca0d46d6-0a19-42a9-b7bc-64d1a43d363e/chat)

Synthetic demo data · built by Subha Das
```
**Above "When chat message received"**
```
**1 · Question comes in**
Someone types in the chat page. This node passes the message to the assistant.
```
**Above "AI Agent"**
```
**2 · The assistant decides**
Reads the question, picks the right tool, reads the result and writes a short answer with one recommended action.
```
**Below "Google Gemini Chat Model"**
```
**Brain:** Google Gemini Flash-Lite (fast). Backup model takes over if Google is busy.
```
**Below "Simple Memory"**
```
**Memory:** remembers the last 10 messages, so follow-up questions make sense.
```
**Below the two tool nodes**
```
**Tools:** Score Review (one complaint) and Escalation Radar (all open tickets). Same tools Claude uses.
```

---

## MCP 1 – Review Intelligence

**Big note**
```
## Tool for Claude · Review Intelligence
Lets Claude score any customer complaint.
Claude asks → this runs "Tool – Score Review" → the answer goes back to Claude.

**Website:** [Customer Voice Hub](https://claude.ai/artifact/5zcaETuNP1thw1ksJPTWLv)
```
**Below "score_review"**
```
Calls the workflow **Tool – Score Review**. Inputs come from Claude: the complaint text and the car model.
```

---

## MCP 2 – Service Escalation Radar

**Big note**
```
## Tool for Claude · Escalation Radar
Lets Claude rank open service tickets by risk and spot repeated faults.
Claude asks → this runs "Tool – Escalation Radar" → the answer goes back to Claude.

**Website:** [Customer Voice Hub](https://claude.ai/artifact/5zcaETuNP1thw1ksJPTWLv)
```
**Below "escalation_radar"**
```
Calls the workflow **Tool – Escalation Radar**. Inputs: car model (or "All") and how many tickets to list.
```

---

## Tool – Score Review

**Big note (top)**
```
## Score Review
Scores one customer complaint. Used by Claude and the chatbot.
**In:** complaint text + car model
**Out:** positive or negative, topics, urgency, safety and churn warnings, the team that should act
```
**Above the trigger**
```
**1 · Input**
The complaint and the car model, sent by Claude or the chatbot.
```
**Above "Basic LLM Chain"**
```
**2 · Translate**
Google Gemini turns Hindi or Hinglish into English. If Gemini fails, the original text is used, so the tool never stops.
```
**Above "Code in JavaScript"**
```
**3 · Business rules**
12 topics (gearbox, AC, sunroof…), score from −1 to +1, urgency, safety and churn warnings, owner team.
To add a topic or change a team, edit the lists at the top of this code.
```

---

## Tool – Escalation Radar

**Big note (top)**
```
## Escalation Radar
Ranks open service tickets by risk (0–100) and finds faults reported by many customers.
**Data source:** the Service Tickets Google Sheet (read fresh on every run).
```
**Above the trigger**
```
**1 · Input**
Car model (or "All") and how many tickets to list, sent by Claude or the chatbot.
```
**Above "HTTP Request"**
```
**2 · Read the live sheet**
Downloads the Service Tickets Google Sheet.
**To use new data, change the link here.**
```
**Above "Extract from File"**
```
**3 · Turn into rows**
One row per ticket (86 in the demo data).
```
**Above "Code in JavaScript"**
```
**4 · Risk rules**
Days open · repeat visits · safety · repeated fault · fleet customer
60+ = escalate today · 35–59 = watch · below 35 = routine
```

---

## 00 Warm-up – Review Ratings (optional)
```
## Warm-up
My first workflow: reads the reviews sheet and finds the lowest-rated model (Exter, 2.61 of 5, mostly weak AC).
```
