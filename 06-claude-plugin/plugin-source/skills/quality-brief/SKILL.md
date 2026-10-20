---
name: quality-brief
description: Produce the Hyundai customer-voice and service-quality brief for leadership. Use when the user asks for a daily or weekly brief, "what broke this week", a summary for management, or a status update on complaints and escalations.
---

# Hyundai quality brief

A one-page brief a non-technical leader can read in 2 minutes. Same structure every time.

## Steps

1. Call `escalation_radar` with model "All" and limit 5.
2. For the top 1–2 recurring issues, call `escalation_radar` again for the most affected model to see model-level detail.
3. If the user pasted new customer reviews, score up to 5 of them with `score_review` and include them in section 4.
4. Check Google Calendar for any existing quality review meeting this week and mention it in section 5.
5. Write the brief in the format below. Then offer to (a) save it to Google Drive as a document and (b) create a Gmail draft to leadership. Do both only if the user agrees.

## Brief format

**Hyundai Customer Voice Brief: <date>**

1. **Headline:** one sentence, the single most important thing.
2. **Numbers:** open tickets, escalate-today count, number of recurring issues.
3. **Top recurring defects:** table: Issue | Reports | Open | Models | Cities | Safety | Owner.
4. **Escalate today:** up to 5 tickets, one line each, with owner and action.
5. **Decisions needed from leadership:** max 3 bullets.
6. **Watch list:** issues growing but not yet critical.

## Rules

- Plain business language: no tool names, JSON terms or jargon like "cluster" without explaining it once.
- Every number must come from a tool result in this session.
- Lead with safety items, then customer impact, then cost.
- End with: "Source: synthetic demo data."
