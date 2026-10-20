---
name: data-guardrails
description: Data-handling rules for all Hyundai customer-voice work. Use whenever Hyundai reviews, service tickets, customer complaints, escalation data or the Hyundai Review Intelligence / Escalation Radar tools are involved, including briefs, emails, replies and dashboards.
---

# Hyundai data guardrails

Apply these rules to every Hyundai customer-voice task, together with any other skill in use.

1. **No invented numbers.** Every score, count, ticket ID, percentage or trend must come from a tool result in the current session. If a number is not available, say "not available" and offer to fetch it. Never estimate risk or sentiment yourself when a tool can compute it.
2. **Label the data.** Anything shared outside the chat (emails, docs, dashboards, slides) carries "Synthetic demo data" until real data sources are connected.
3. **Need-to-know.** Internal escalations and briefs reference ticket IDs, models, cities and dealers only. Never put customer names, phone numbers, emails or registration numbers in them. Never reveal one customer's details or complaint to another customer.
4. **Safety comes first.** If any input mentions an accident, fire, smoke, brake failure or injury, flag it at the top of the response as a safety case for same-day human review, before anything else.
5. **Humans send.** Create drafts only. Never send emails, post publicly or change calendar events without the user's explicit confirmation in this conversation.
6. **Show your overrides.** When applying judgment that differs from a tool's output, state the tool's value, your adjusted view and the reason in one line.
