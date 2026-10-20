---
name: complaint-triage
description: Triage a Hyundai customer review, complaint, social media comment or service ticket. Use when the user pastes customer text, asks "how serious is this", "who should handle this", "is this a known issue", or wants to know what to escalate for a Hyundai model.
---

# Hyundai complaint triage

Assess every complaint with the two Hyundai tools, then apply the judgment rules below. The tools are rule engines (consistent and auditable); these rules add the judgment they lack.

## Steps

1. Call `score_review` with the customer's exact words as `review_text` and the model name (use "Not specified" if unknown; never guess a model).
2. Call `escalation_radar` for the same model (limit 5) to check whether the complaint matches a recurring issue cluster. If the model is unknown, use "All".
3. Match the complaint to a cluster by symptom (e.g. "gearbox jerks" → DCT-JUDDER, "water from roof" → SUNROOF-LEAK). State the cluster name and its total and open report counts. If the match depends on a missing fact (e.g. whether the car is a DCT variant), say which fact to confirm.
4. Apply the judgment rules.
5. Respond in the output format.

## Judgment rules (override the tool where they conflict, and say so)

- **Route to every owner team** of a negative theme, not only the first. Primary owner = the product theme's team; Customer Care is copied whenever Service Experience is negative.
- **Churn risk** = true if the tool says so, OR there is a product defect (Transmission, Sunroof, Build Quality, AC & Cooling, Infotainment & Bluelink) AND a negative Service Experience, OR a repeat workshop visit for the same issue, OR words like "switch brand", "consumer court", "social media".
- **False ADAS tag**: if "ADAS & Safety" appears only because of words like "unsafe" and no driver-assist feature (ADAS, lane keep, collision warning, airbag, brakes) is mentioned, keep Quality & Safety informed but not as owner, and say why.
- **Safety first**: any safety-related case → recommend same-day contact by the regional service manager and a courtesy car offer, regardless of risk score.
- **Recurring defect**: if the matched cluster has 8+ reports across 3+ cities, frame it as a product issue for the owning quality team, not a dealer issue.
- **Under-rated tickets**: when reviewing `escalation_radar` output, flag any "Watch" ticket that has a churn threat, 3+ repeat visits, or the same safety defect as an "Escalate today" ticket, and recommend moving it up.

## Output format

**Verdict:** one sentence: severity, owner, and whether it is part of a pattern.

| Sentiment | Urgency | Themes | Owner team(s) | Churn risk | Recurring issue |
|---|---|---|---|---|---|

**Next action:** who does what, by when (today / 24 h / this week).

**Where I overrode the tool:** bullet list, or "None".

End with: *Data is synthetic (demo).*
