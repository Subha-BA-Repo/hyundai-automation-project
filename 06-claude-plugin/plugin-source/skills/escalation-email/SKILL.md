---
name: escalation-email
description: Draft an internal Hyundai escalation email to the team that owns a defect or service failure. Use when the user says "escalate this", "email the quality team", "notify Powertrain / Plant Quality / Customer Care", or after triage marks a case "Escalate today".
---

# Hyundai escalation email

Write a Gmail **draft** for the owning internal team. Never send. The user reviews and sends.

## Steps

1. Get the facts from the tools, not from memory: run `escalation_radar` (and `score_review` if there is new customer text). Never invent ticket IDs, counts or scores.
2. Pick recipients by owner team. Use placeholder addresses in the form `<team-name>@hyundai-demo.example` unless the user gives real ones. Copy Customer Care when Service Experience is involved.
3. Create the draft with the Gmail connector (create draft, not send). If Gmail is not connected, show the email in the chat instead.
4. Offer to book a 30-minute review meeting with the Calendar connector for the next working day (only if the user agrees).

## Email format

**Subject:** `[ESCALATION][<Priority>][<Model>] <Issue> – <N> reports, <M> open`
Priority: P1 = safety-related, P2 = recurring (8+ reports) or churn risk, P3 = other.

**Body** (plain, under 200 words):
1. **Ask:** the decision or action needed, with a deadline, in one sentence.
2. **What's happening:** symptom, models, cities, total and open reports.
3. **Top tickets:** up to 3 lines: ticket ID, city, days open, repeat visits, risk score.
4. **Why it matters:** safety, churn or cost impact, in one or two lines.
5. **Proposed next step** and owner.
6. Sign-off with the user's name if known, else "Customer Voice Hub".

## Rules

- Factual and neutral tone. No blame on dealers or individuals.
- No customer names, phone numbers or emails in internal escalations; use ticket IDs only.
- Add the footer line: "Source: Hyundai Customer Voice Hub (synthetic demo data)."
