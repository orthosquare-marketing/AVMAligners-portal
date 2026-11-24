# 01 — Product requirements

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

## 1. What the portal is for

One system that takes an aligner case from a channel partner, plans it, gets it approved by our own
orthodontist, makes it, checks it, packs it, ships it and bills for it — and can prove afterwards
exactly what was made, from what, by whom, and on which version of the software.

## 2. Who uses it

| # | Role | Level | Who they are | What they decide |
|---|---|---|---|---|
| 01 | Super Admin | — | The system owner. One or two people. | Everything, including who may be Admin, and the settings nobody else may touch. |
| 02 | Admin | — | Day-to-day control of the portal. | Approves partner accounts, creates users, makes price lists live, releases credit holds, confirms recalls, answers privacy requests. |
| 03 | Management | — | Leadership. | Reads everything. Approves capital purchases and write-offs. Takes no operational action. |
| 04 | Business Development | Call centre | Telecallers. | Calls every new lead, qualifies it, and passes a marketing qualified lead to Sales. |
| 05 | Sales Team | Head | Head of sales, branded and white label. | Targets, territories, onboarding review, discounts within limit, the lead plan. |
| 06 | Sales Team | Member | Field and direct sales. | Owns their leads, visits partners, collects documents, submits onboardings. |
| 07 | Channel Partner | External | Distributor, channel partner or OEM partner. One login, no staff logins. | Creates cases, uploads records, tracks every case and box, pays invoices. |
| 08 | Planning Team | Orthodontist | In-house orthodontist. | Final medicolegal approval of every treatment plan. Nothing is made without it. |
| 09 | Planning Team | Planner | Treatment planners. | Checks records, builds the 3D setup, sets IPR, attachments, staging and counts. |
| 10 | Purchase | — | Purchase officer. | Finds the vendor, raises the proforma invoice, sends it for approval, receives the goods. |
| 11 | Inventory | — | Stores. | Holds stock and lots, issues material to production, raises the requirement when stock runs low. |
| 12 | Production | Head | Manufacturing head. | Capacity, the schedule, machines, corrective actions, recalls. |
| 13 | Production | Operator | Floor operators. | Runs batches, scans each set through every station, records materials used. |
| 14 | Quality Check | — | Quality inspectors. | Passes or rejects every set. Nobody else may. |
| 15 | Dispatch | — | Packing and hand-over. | Packs each box, applies the right packaging and label, hands over to the courier. |
| 16 | Logistics | — | Courier and transport. | Books the courier, tracks every consignment, handles failed deliveries, returns and claims. |
| 17 | Accounts | — | Finance. | Invoices, receipts, reminders, credit holds, vendor payments, statements. |
| 18 | Support / Facility | — | Support agent and facility manager. | Tickets from partners and from staff: product complaints, IT, building and equipment. |


Eighteen logins across fifteen roles: some roles have a head and members. The dentist, the clinic
staff and the patient have **no login at all**. They are records inside a case, entered and held by
the channel partner.

## 3. What it must do

| # | Module | Phase | What it covers |
|---|---|---|---|
| M01 | Identity and access | 1 | Logins, roles, permissions, temporary passwords, sign-out on role change, audit of every access change. |
| M02 | Partner management | 1 | Channel partner accounts, agreements, non-disclosure agreements, supply type, brand profiles and artwork approval. |
| M03 | Leads and call centre | 1 | Lead import from marketing, assignment rules, call outcomes, follow-ups, qualification to MQL. |
| M04 | Sales and pipeline | 1 | Pipeline by stage, visits, proposals, onboarding submission and review, targets, territories. |
| M05 | Case intake | 1 | The partner creates the case, enters the patient and dentist, uploads photos, x-rays and scans, and states the prescription. |
| M06 | Treatment planning | 1 | Records check, 3D setup, IPR, attachments, staging, counts, versions, second review. |
| M07 | Orthodontic approval | 1 | The in-house orthodontist approves or rejects each plan. The approval record carries the name, registration number, version and time. |
| M08 | Production planning | 1 | Print orders, due-to-order list, capacity against demand, the schedule board, printer continuity. |
| M09 | Shop floor | 1 | Batches, station scans, machines, downtime, maintenance, calibration, operator skills. |
| M10 | Quality | 2 | Set-by-set check with reason and photo, reject trends, non-conformance records, corrective action. |
| M11 | Inventory | 2 | Stock by item and lot, issue to production, returns, wastage, counts and adjustments, expiry. |
| M12 | Purchase | 2 | Requirement, vendor, proforma invoice, approval, purchase order, goods receipt, vendor rating. |
| M13 | Dispatch | 1 | Box building by scan, packaging by supply type, label, photo, hand-over and manifest. |
| M14 | Logistics | 2 | Courier booking, tracking, delivery watch against the run-out date, failed deliveries, returns and claims. |
| M15 | Billing and receivables | 1 | Invoice on approval, e-invoice filing, receipts, matching, reminders, credit holds, statements. |
| M16 | Vendor payables | 2 | Proforma and vendor invoices, approval, payment, advance, vendor ledger. |
| M17 | Price lists and discounts | 1 | Price lists by customer and supply type, in force from a date, discount approvals with an end date. |
| M18 | Traceability and recall | 2 | Lot to set to box to partner, software version per case, hold, recall, mock recall. |
| M19 | Documents, training and QMS | 3 | Work instructions with versions, approvals, training records, internal audits, management review. |
| M20 | Support and facility | 3 | Tickets by type, response targets, product complaints, IT and facility requests, asset register. |
| M21 | Notifications | 1 | Every message the portal sends, by channel, with templates and quiet hours. |
| M22 | Reports and dashboards | 2 | Every report in this document, scheduled or on demand, by role. |
| M23 | Partner API | 3 | Case status to a partner's own website, with a one-time code, so their patients see their brand and not ours. |
| M24 | Audit, privacy and retention | 2 | Audit log of every create, update and approval; data requests; scan retention and deletion. |
| M25 | Management console | 3 | One read-only view of the whole business for leadership, with no operational buttons. |


## 4. The rules the product must enforce

| # | Area | Rule |
|---|---|---|
| R01 | Approval | No set is made until the in-house orthodontist has approved the plan. The approval record carries the orthodontist's name, registration number, the plan version and the time. |
| R02 | Approval | A planner cannot approve their own plan, and nobody outside the Planning Team can approve any plan. |
| R03 | Access | Dentists and patients never receive a login. They exist as records, entered and maintained by the channel partner. |
| R04 | Access | A channel partner has one login. What the partner does with it inside their own business is their affair. |
| R05 | Access | A partner sees only its own cases, boxes, invoices and prices. Out-of-scope records return "not found", not "no access". |
| R06 | Supply type | Branded or white label is a setting on the partner account and can be changed per case before approval. It decides packaging, tray marking and price list. |
| R07 | Supply type | A white-label box carries no AVMAligners mark anywhere. The pack station refuses the wrong packaging. |
| R08 | Production | A patient's later sets print on the same printer as the earlier ones, unless the head overrides it with a reason. |
| R09 | Production | No batch starts on a machine that is marked down or whose service is overdue. |
| R10 | Production | A batch cannot be closed without the material lot it used. |
| R11 | Quality | Only Quality Check passes or rejects a set. A reject needs a reason from the fixed list and a photo. |
| R12 | Traceability | Every set traces to its batch, machine, operator, material lot, software version, box, consignment and partner. |
| R13 | Stock | Production never buys. It asks Inventory; Inventory asks Purchase. |
| R14 | Purchase | No payment without an approved proforma invoice. No stock enters the system without a goods receipt and a lot number. |
| R15 | Dispatch | A box is closed only when every tray in it has been scanned into it. |
| R16 | Dispatch | A courier label carries the patient code and the partner, never a patient phone number. |
| R17 | Billing | The invoice is raised when the plan is approved, on the price list in force that day. A wrong invoice is cancelled and re-raised, never edited. |
| R18 | Billing | A credit hold stops new approvals. It never stops a case already in production. |
| R19 | Prices | A price list in force is never edited. A change is a new list with its own in-force date. |
| R20 | Data | Scan files are deleted 180 days after upload unless Admin has approved a hold. The treatment record stays. |
| R21 | Data | Patient name and contact are visible to the partner who entered them, to Planning and to Admin. Everyone else works from the patient code. |
| R22 | Audit | Every create, update, approval and access change writes an audit event with the actor and the time. |
| R23 | Audit | Nothing is deleted. Records are superseded, cancelled or disabled, and the earlier version stays readable. |


## 5. The things the portal keeps

| Entity | What it is | What it holds |
|---|---|---|
| Channel Partner | The customer. Distributor, channel partner or OEM partner. | Name, type, territory, supply type default, price list, credit limit, terms, GSTIN, agreement, non-disclosure agreement, brand profile, one login. |
| Dentist | A record, not a user. The clinic the partner serves. | Name, registration number, clinic, city, partner it belongs to. Never has a login. |
| Patient | A record, not a user. Entered by the partner. | Patient code, name, age, guardian where under 18, consent. Never has a login or an app. |
| Enquiry | A lead for a new partner, from marketing or by hand. | Source, campaign tag, owner, score, stage, call outcomes, follow-ups, consent to be contacted. |
| Case | One patient's treatment, under one partner. | Patient code, dentist, partner, supply type, product, prescription, records, state. |
| Plan | One treatment plan for a case. A refinement is a new plan. | Version, planner, setup file, IPR chart, attachments, staging, counts, approval record. |
| Set | One tray for one arch at one step. | Arch, number, batch, material lot, machine, quality result, box. |
| Print order | An instruction to make a range of sets. | Case, arch, set range, type, needed-by date, urgency, state. |
| Batch | One run on one machine. | Machine, operator, start, models, resin lot, sheet lot, station scans, rejects. |
| Material lot | A received lot of sheet, resin or packaging. | Item, lot number, supplier, received date, expiry, quantity, hold state. |
| Machine | A printer, former, trimmer or cure unit. | Type, state, hours run, service dates, calibration, software version. |
| Stock item | Anything held in stores. | Item, unit, reorder level, on hand, lots, location. |
| Purchase requisition | A request to buy. | Item, quantity, raised by, reason, approval, linked proforma invoice. |
| Purchase order | The order placed on a vendor. | Vendor, items, rates, taxes, delivery date, state. |
| Goods receipt | What actually arrived. | Purchase order, lot numbers, quantity, condition, test certificate. |
| Box | A packed set of trays for one case. | Case, set range, packaging type, pack photo, weight, state. |
| Consignment | A box handed to a courier. | Courier, waybill, pick-up, tracking events, proof of delivery, claim. |
| Invoice | A bill to a partner. | Case, lines, price list, discount, tax, e-invoice number, due date, state. |
| Payment | Money received. | Date, method, reference, amount, invoices matched, receipt. |
| Price list | Prices for a customer type and supply type, in force from a date. | Products, rates, in-force date, acknowledgements. |
| Ticket | A request or a complaint. | Type, raised by, links to case or box, owner, response target, resolution. |
| Non-conformance | A fault that needs a cause and a fix. | What happened, containment, cause, action, owner, due date, proof, closure. |
| Document | A work instruction or procedure. | Number, title, version, approval, review date, training records. |
| User | A person who can sign in. | Name, role, level, territory or station, state, last sign-in. |
| Audit event | Who did what, when. | Actor, action, entity, id, time, before and after where it matters. |


## 6. How a case moves

| Stage | State | What starts it | Who owns it |
|---|---|---|---|
| Enquiry | A lead exists | Marketing import or manual entry | Business Development |
| Qualified | The lead is worth a meeting | Call outcome recorded | Business Development |
| In onboarding | Documents and agreement being collected | Won by sales | Sales member |
| Partner live | The partner can send cases | Admin approval | Admin |
| Case created | Patient and dentist entered | Partner creates the case | Channel Partner |
| Records complete | Photos, x-rays and scans are in | Partner uploads | Channel Partner |
| In planning | A planner is building the setup | Records accepted | Planner |
| Setup ready | A plan version is ready for approval | Planner sends it | Planner |
| Approved | Medicolegal approval given; counts and price are fixed | In-house orthodontist approves | Orthodontist |
| In production | Print orders raised, sets being made | Approval | Production |
| Quality passed | Sets passed and ready to pack | Quality check | Quality Check |
| Packed | A box is closed and labelled | Dispatch packs it | Dispatch |
| Handed over | The courier has it | Logistics books it | Logistics |
| Delivered | It reached the partner or the clinic | Courier proof of delivery | Logistics |
| In treatment | The patient is wearing the trays | Partner confirms the start date | Channel Partner |
| Refinement | More sets needed; a new plan begins | Partner asks, new scans arrive | Channel Partner |
| Closed | Treatment finished or withdrawn | Partner or Admin closes it | Channel Partner |


## 7. What the portal sends

| To whom | When | Channel |
|---|---|---|
| Channel Partner | Account approved and login created | Email, WhatsApp |
| Channel Partner | Case received; records missing; records accepted | Portal, email |
| Channel Partner | Plan ready to view; plan approved by the orthodontist | Portal, email, WhatsApp |
| Channel Partner | Change asked for; new version ready | Portal, email |
| Channel Partner | Box dispatched with waybill; delivered; receipt not confirmed | Portal, email, WhatsApp |
| Channel Partner | Invoice raised; payment received; reminder; account on hold | Email, WhatsApp |
| Channel Partner | New price list to acknowledge; brand proof to approve | Email |
| Channel Partner | Ticket acknowledged, replied and resolved | Email, WhatsApp |
| Business Development | New lead assigned; follow-up due; lead going cold | Portal |
| Sales | Onboarding to review; discount decided; partner at risk | Portal, email |
| Planning | New case in the queue; records returned; change asked for | Portal |
| Orthodontist | Plan waiting for approval; waiting over one day | Portal, email |
| Production | Order due; urgent order; machine down; reject rate rising | Portal, email |
| Inventory and Purchase | Stock below reorder level; proforma approved; goods overdue | Portal, email |
| Quality | Batch ready to check; trend crossed the limit; non-conformance due | Portal |
| Dispatch and Logistics | Box ready to pack; consignment at risk; delivery failed | Portal |
| Accounts | E-invoice failed; payment unmatched; invoice overdue; hold applied | Portal, email |
| Admin | Onboarding to approve; hold release asked; recall to confirm; data request | Portal, email |
| Patient | Nothing. The portal sends a patient no message. Status reaches the patient through the dentist, who hears it from the partner. | — |


## 8. What is outside the portal

- **Marketing.** Campaigns, budgets and creatives stay where they are. Leads arrive as a file or a feed.
- **Scan files and the 3D viewer.** An outside service holds them. The portal stores the link and the version.
- **Treatment planning software.** The plan is built there. The portal records the version and the output.
- **Accounting.** Invoices, receipts and vendor payments export to the books. _(Package still open.)_
- **Patient communication.** The partner talks to the patient. The portal never messages a patient, except the one-time code for the status API.

## 9. What the law and certification require of it

| Area | What the portal must hold | Target |
|---|---|---|
| Quality management system | The portal is the record: work instructions with versions, training records, batch records, quality results, non-conformances, corrective actions, internal audits and management review. | [ISO 13485 target date] |
| Product certification | Distributors are asking for it and competitors have it. The portal must hold the evidence an auditor will ask for, from sheet to patient. | [Which certification, and by when] |
| Medical device rules | Registration and labelling duties are being confirmed with the regulatory consultant. The portal is built so the data exists before the rule applies. | [Consultant to confirm] |
| Labelling | Not done today. Manufacturer name and address, licence number, batch and lot, and date of manufacture may be required on every pack, white label included. | [Confirm what must appear] |
| Traceability | A lot can be traced to every set, patient code, partner and box within minutes, and held or recalled from one screen. | Built in |
| Recall | Two people: the Production head starts it, Admin confirms it before partners are told. A mock recall once a year. | Built in |
| Audit scope | The full process is auditable, from sheet to the aligner in the patient's hand, not only model printing and the finished tray. | Built in |
| Software control | Every case records the software version used, and every change to planning or machine software is logged with a date and an owner. | Built in |


## 10. What it connects to

| Integration | What it does | Note |
|---|---|---|
| Marketing lead import | Leads arrive from the marketing team as a file or a feed, with their campaign tag, and land in the call centre queue. | Marketing stays outside the portal. |
| Partner status API | A partner's own website asks for a case status with a one-time code sent to the patient or dentist. The reply carries the partner's own brand, never ours. | Phase 3. |
| Payment | A pay link on every invoice and statement; online payments match themselves. | [Gateway to confirm] |
| GST e-invoicing | Invoices are filed and the number returned is stored. Failures are shown with the reason. | Phase 1. |
| Courier | Booking, waybill and tracking events pulled back into the consignment. | [Couriers to confirm] |
| WhatsApp | Utility messages to partners for cases, boxes and invoices. No patient messaging. | Templates need approval. |
| Scanner and planning software | Scan files uploaded by the partner; the planning software version is recorded against each case. | [Software to confirm] |
| Accounting software | Invoices, receipts and vendor payments export for the books. | [Package to confirm] |
