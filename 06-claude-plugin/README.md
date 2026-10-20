# Claude plugin · hyundai-customer-voice

Install `hyundai-customer-voice.plugin` in Claude (Settings → Plugins). It adds:

**Five skills**
| Skill | What it makes Claude do |
|---|---|
| complaint-triage | Uses both tools, routes to every team involved, explains where it overrides a tool |
| escalation-email | Writes an escalation as a Gmail draft (never sends), with a P1/P2/P3 subject line |
| quality-brief | The same six-part one-page brief for leadership every time |
| customer-reply | Warm replies in English or Hinglish; never promises fix dates or admits fault |
| data-guardrails | Never invents numbers, labels demo data, keeps customer details private, humans send |

**Two tools:** Review Intelligence and Escalation Radar (they need the laptop, Docker Desktop and ngrok running).

`plugin-source` holds the readable files inside the plugin.
