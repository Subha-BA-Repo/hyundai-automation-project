# Changing or updating the data

The project uses data in **two places**. They update differently.

| Part | Where its data comes from | Updates by itself? |
|---|---|---|
| **Live tools**: Claude, the chatbot and n8n | The **Service Tickets Google Sheet**, read fresh on every question | **Yes**, within about 5 minutes |
| **Customer Voice Hub website** | A copy of the numbers saved inside the page (snapshot to 17 Oct 2026) | **No**, it must be rebuilt |

---

## Part 1 · Live tools (Claude, chatbot, n8n)

### A. Edit or add a few tickets
1. Open the **Service Tickets** Google Sheet.
2. Change a cell or add a new row at the bottom. Keep the same columns (see the table below).
3. Wait up to **5 minutes**. Google refreshes the published copy on its own schedule.
4. Ask the chatbot or Claude again. The new numbers appear.

Tip for a live demo: add the row about 5 minutes before you show it.

### B. Use a completely new set of tickets
1. Make a new Google Sheet with **exactly the same column names** in row 1.
2. File → Share → **Publish to web** → choose "Comma-separated values (.csv)" → Publish.
3. Copy the link and change its ending from `pubhtml` to `pub?output=csv`.
4. In n8n, open **Tool – Escalation Radar** → **HTTP Request** node → paste the new link in **URL**.
5. Click **Publish**. Ask the chatbot "How many open tickets?" to check.

### Ticket columns (row 1 must match exactly)
| Column | What to put | Example |
|---|---|---|
| ticket_id | A unique ID | TK-0087 |
| opened_date | Date as YYYY-MM-DD | 2026-10-18 |
| model | Car model | Venue |
| powertrain | Engine and gearbox | Turbo DCT |
| city | City | Pune |
| dealer | Dealer name | Pune Dealer 01 |
| category | One of: Transmission, Sunroof, Build Quality, Infotainment & Bluelink, AC & Cooling, Spare Parts, ADAS & Safety, Service Cost, Service Experience | Transmission |
| issue_cluster | The **same short code for the same fault**, so repeats are counted together | DCT-JUDDER |
| description | The complaint in words | Gearbox jerks in traffic |
| status | Open, In progress or Resolved | Open |
| days_open | A number | 20 |
| repeat_visits | A number | 3 |
| customer_type | Retail, Fleet or Corporate lease | Retail |
| safety_related | Yes or No | Yes |

### Adding a new kind of problem or a new team
- **New ticket category** (for example "Battery"): it works straight away but goes to "Customer Care". To send it to a specific team, add it to the `OWNER` list at the top of the Code node in **Tool – Escalation Radar**, then Publish.
- **New complaint topic** for scoring (for example "Battery"): add it to `THEMES` (the words customers use) and `OWNER` (the team) at the top of the Code node in **Tool – Score Review**, then Publish.
- **Change the risk rules** (for example make 45+ "escalate today"): edit section 3 of the Code node in **Tool – Escalation Radar**.

### About the reviews sheet
The **Customer Reviews** sheet is used for the website's model table and by your warm-up workflow. The Score Review tool scores whatever complaint text it is given, so it does not need the sheet.

---

## Part 2 · Customer Voice Hub website

The website shows a **saved snapshot**, so it stays the same until it is rebuilt. That keeps it fast and always online, even when your laptop is off.

**To refresh it with new data:**
1. Update your Google Sheets (same columns as above; reviews need `review_id, date, model, powertrain, city, source, rating, review_text`).
2. Open a Claude chat and say: *"Refresh the Customer Voice Hub with my updated sheets"* and paste both published sheet links (or attach the two CSV files).
3. Claude recalculates every number, updates the "Ticket snapshot to …" date and republishes **the same link**.

**What changes on the website:** the readout (open tickets, escalate today, net sentiment), the escalation list, repeated faults, the model table, the weekly ticket chart and the built-in chat assistant's data.

---

## Quick check after any change
| Check | Good result |
|---|---|
| Chatbot: "How many open tickets and how many to escalate today?" | Numbers match your sheet |
| n8n: Tool – Escalation Radar → Executions → newest run → Extract from File | Row count matches your sheet |
| Website (after a refresh) | New snapshot date at the top of Today's readout |
