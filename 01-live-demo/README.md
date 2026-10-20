# Live demo

## Start here
Double-click **`open-live-app.html`**. It opens a launcher with big buttons for everything below.

| What | Link | Needs |
|---|---|---|
| **Customer Voice Hub (live website)** | https://claude.ai/artifact/5zcaETuNP1thw1ksJPTWLv | Always online. Open it in the Claude app so "Chat with the bot" works |
| **Hub Bot (this laptop)** | http://localhost:5678/webhook/ca0d46d6-0a19-42a9-b7bc-64d1a43d363e/chat | Laptop on, Docker Desktop running |
| **Hub Bot (any device)** | https://lumpish-character-reload.ngrok-free.dev/webhook/ca0d46d6-0a19-42a9-b7bc-64d1a43d363e/chat | Laptop on, Docker Desktop and ngrok running |
| **n8n workflows** | http://localhost:5678 | Laptop on, Docker Desktop running |

The four `.url` files in this folder are Windows shortcuts to the same links (double-click to open).

## What is on the website
- **Today's readout** – 57 open tickets, 9 to escalate today, net sentiment, top repeated fault
- **Escalation list** – each ticket with the reasons behind its risk score
- **Repeated faults** – the same problem across many customers
- **Model-by-model feedback** – ratings and top complaint per car model
- **Review scorer** – type a complaint, change the model, see the pattern check
- **Chat with the bot** – button at the bottom right opens a chat window on the page
- How it is built, connected services, skills and limitations

## offline-copy
`offline-copy/customer-voice-hub-offline.html` is a backup to view the page without internet. Its chat window does not work there; use the live link above for the demo.
