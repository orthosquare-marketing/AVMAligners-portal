# 04 — Data model

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

## 1. The eleven databases

| Database | Modules | Main collections | Note |
|---|---|---|---|
| avm_identity | M01, M24 | users, roles, sessions, permissions, audit_events, release_log, data_requests | The only database the gateway talks to on every request. The audit log and the release log live here because they outlive everything else. |
| avm_partners | M02, M17 | channel_partners, agreements, brand_profiles, dentists, price_lists, price_acknowledgements | Dentists are records here, under the partner that serves them. They never have a login. |
| avm_sales | M03, M04 | enquiries, call_outcomes, follow_ups, pipeline_stages, visits, proposals, targets, territories | Marketing hands leads in; this is where they land and are worked. |
| avm_cases | M05, M06, M07 | patients, cases, records, plans, approvals, refinements, scan_references | The medicolegal heart of the system. Plans are versioned; approvals are sealed and never edited. |
| avm_production | M08, M09 | print_orders, schedule, batches, sets, station_scans, machines, downtime, maintenance, calibration, operator_skills | Printer continuity is a field on the case, enforced when the print order is scheduled. |
| avm_quality | M10 | checks, reject_reasons, non_conformances, containment, corrective_actions, holds | A rejected set never silently disappears; it becomes a record with a reason and a photo. |
| avm_stock | M11, M12, M16 | items, lots, stock_moves, issues, returns, counts, requisitions, purchase_orders, goods_receipts, vendors, vendor_bills | Lot numbers start here. Everything downstream quotes them. |
| avm_dispatch | M13, M14 | boxes, pack_photos, labels, manifests, consignments, tracking_events, delivery_failures, claims | A box is built by scanning sets into it, so the box knows which lots it contains. |
| avm_money | M15 | invoices, e_invoice_filings, credit_notes, payments, matches, statements, reminders, credit_holds | The e-invoice number and any filing failure are stored against the invoice, with the reason. |
| avm_support | M19, M20 | tickets, response_targets, product_complaints, assets, documents, document_versions, training_records, internal_audits, management_reviews | The quality system an auditor reads. Built in phase 3, but its shape is fixed in phase 1. |
| avm_notify | M21 | templates, channels, quiet_hours, messages, delivery_status | Every message the portal sends, with what was sent and whether it arrived. |


No service reads another service's database. Ever. It calls that service's API.

## 2. What appears on every document

| Part | Fields | Why |
|---|---|---|
| Stamp | created_by, created_at, changed_by, changed_at, version, release | On every document in every database. Written by shared code, not by each module. |
| Soft state | state, state_changed_at, state_changed_by, state_reason | There is no delete. A cancelled case, a scrapped set and a retired machine are states. |
| Scope | partner_id or territory or station, on every record that belongs to someone | Put into the database query, so a record outside a user’s scope cannot be returned at all. |
| Trace keys | lot_ids, set_ids, box_id, consignment_id, case_id carried forward at each step | What makes the whole-chain query one query instead of a reconciliation exercise. |


These four are written by shared code in `packages/common`, not by each service. One implementation,
no exceptions. **They cannot be added later without lying about the records already written.**

## 3. What each thing is

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


## 4. The chain that has to hold

> material lot → set → box → consignment → partner → dentist → patient code

Each step carries the keys of the step before it. "Which cases used resin lot R-4471" and "what went
into this patient's box" are then the same query read in two directions. Built as a report assembled
by hand it takes a day and is wrong; built into the keys it takes a second.

## 5. The sealed approval

The single most important document in the system.

```
approvals {
  plan_id, case_id, plan_version,
  scan_reference, scan_version,
  orthodontist_user_id, orthodontist_name, registration_number,
  payload_fingerprint,      // hash of exactly what was on screen
  approved_at, approved_from_ip,
  confirmation_token_id,    // proves the password was re-entered
  release                   // software version that wrote it
}
```

Write once. No update route exists. No delete route exists. Super Admin cannot change it either.

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


## 7. What is not in the data model

No patient login, no dentist login, no clinic staff, no patient app device registration. The dentist
and the patient are records inside a case. Treatment planning files live outside; the case holds the
reference and the version. Marketing lives outside; leads arrive as a file or a feed.
