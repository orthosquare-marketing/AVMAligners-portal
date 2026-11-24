# 05 — API specification

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

## Conventions

- Base path through the gateway: `/api/<service>/...`
- `Authorization: Bearer <access token>` on every call except sign-in and the public status route.
- JSON in and out. Errors: `{ "error": "plain message", "details": [ { "field", "message" } ] }`.
- Status codes: 200 OK, 201 created, 400 bad input, 401 not signed in, 403 no permission, 404 not found **or outside your scope**, 409 conflict, 502 a dependent service failed.
- Lists take `page`, `limit` (max 100), `q`, and return `{ items, total, page, limit }`.
- Dates are ISO 8601 in the API. Screens show DD-MM-YYYY.
- Every request body is validated with zod through `validate(schema)`.
- Every create, update, approval and access change writes `audit(req, action, entity, id)`.
- "Scoped" means the result is limited to the caller's own records — see [02](02-roles-and-permissions.md), section 3.
- Each service publishes OpenAPI 3 at `/api/<service>/openapi.json`, generated from its schemas.
- `/internal/...` routes are refused at the gateway and require the internal key.

## identity

`avm_identity` — Logins, roles, permissions, sessions, the audit log and the release log.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/auth/login` | none | Email and password. Returns an access token (15 min) and a refresh token (7 days, single use). A user on a temporary password gets a token that can do nothing but change it. |
| POST | `/auth/refresh` | none | Exchange a refresh token. The old one is burnt. |
| POST | `/auth/logout` | signed in | Ends the session. Audited. |
| POST | `/auth/change-password` | signed in | Current and new password. Required at first sign-in. |
| POST | `/auth/forgot-password` | none | Always answers 200, so addresses cannot be probed. |
| POST | `/auth/reconfirm` | signed in | Re-enter the password to seal an approval. Returns a short-lived confirmation token used by the approval endpoints. |
| GET | `/users` | `users:read` | Scoped. Filter by role, state, territory, station. |
| POST | `/users` | `users:create` | Only for a role whose level is below the caller’s. Returns the temporary password once, in the response body, never stored or logged. |
| PATCH | `/users/:id` | `users:update` | Name, territory, station, state. Role change needs roles:update. |
| POST | `/users/:id/disable` | `users:update` | A state, not a delete. All sessions end at once. |
| GET | `/roles` | `users:read` | The fifteen roles and their permissions. |
| PATCH | `/roles/:code` | `roles:update` | Super Admin only. SUPER_ADMIN_ONLY permissions can never be granted to another role. |
| GET | `/audit` | `audit:read` | Append-only. Filter by actor, entity, action, date. Never deletable through any route. |
| GET | `/releases` | signed in | The release log: version, date, what changed, who approved, link to the test report. |
| POST | `/internal/releases` | internal | Written by the deployment job, not by a person. |
| GET | `/me` | signed in | The caller, their role, permissions and scope. |


## partners

`avm_partners` — Channel partner accounts, agreements, brand profiles, dentists and price lists.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| GET | `/partners` | `partners:read` | Scoped. A partner sees only itself. |
| POST | `/partners` | `partners:create` | Creates the account from an approved onboarding. Creates the one partner login through identity. |
| PATCH | `/partners/:id` | `partners:update` | Territory, credit limit, terms, supply type default. |
| POST | `/partners/:id/approve` | `partners:approve` | Sales head. Sets the price list, the territory and the credit limit, and triggers the welcome notification. |
| POST | `/partners/:id/hold` | `partners:update` | A credit hold or a compliance hold. New cases are refused with the reason. |
| GET | `/partners/:id/agreements` | `partners:read` | Agreement and non-disclosure agreement with versions and signature dates. |
| POST | `/partners/:id/brand-profile` | `partners:update` | White-label artwork, logo, box text. Needs approval before use. |
| POST | `/brand-profiles/:id/approve` | `partners:approve` | Artwork approved for printing. Audited with the file reference. |
| GET | `/dentists` | `dentists:read` | Scoped to the partner. A record, never a login. |
| POST | `/dentists` | `dentists:create` | Name, registration number, clinic, city, partner. |
| GET | `/price-lists` | `prices:read` | By customer type and supply type, with the in-force date. |
| POST | `/price-lists` | `prices:create` | A new list is a new version. The old one stays, closed by date. |
| POST | `/price-lists/:id/acknowledge` | signed in | The partner records that they have seen the list in force. |


## sales

`avm_sales` — Leads from marketing, the call centre, the pipeline and targets.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/internal/leads/import` | internal | Marketing hands leads in as a file or a feed, with the campaign tag. Duplicates are matched on phone. |
| GET | `/enquiries` | `leads:read` | Scoped to the owner or the territory. |
| POST | `/enquiries` | `leads:create` | Manual entry for a walk-in or a referral. |
| POST | `/enquiries/:id/assign` | `leads:assign` | By rule or by hand. Audited with the rule that fired. |
| POST | `/enquiries/:id/outcome` | `leads:update` | Call outcome, next action, next date. An enquiry with no next action is flagged. |
| POST | `/enquiries/:id/qualify` | `leads:update` | Becomes an MQL and moves to a sales owner. |
| GET | `/pipeline` | `sales:read` | By stage, owner and territory. |
| POST | `/opportunities/:id/stage` | `sales:update` | Stage change with a reason. Backwards moves are allowed and recorded. |
| POST | `/opportunities/:id/submit` | `sales:update` | Submits the onboarding pack for review. |
| POST | `/opportunities/:id/review` | `partners:approve` | Sales head reviews before approval. |
| GET | `/targets` | `sales:read` | By person, month and territory. |
| GET | `/reports/funnel` | `sales:read` | Enquiry to partner, by source and campaign tag. |


## cases

`avm_cases` — Patients, cases, records, plans and the orthodontist’s approval. The medicolegal heart of the system.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/cases` | `cases:create` | The partner creates it: patient code, dentist, supply type, product, prescription. |
| GET | `/cases` | `cases:read` | Scoped. A partner sees only its own; the factory sees cases in production states. |
| GET | `/cases/:id` | `cases:read` | Full case with records, plans, approval and current state. |
| POST | `/cases/:id/records` | `cases:update` | Photos and x-rays uploaded direct to storage with a short-lived signed URL. The scan is a link and a version, never the file. |
| POST | `/cases/:id/records/check` | `cases:review` | The planner accepts or rejects the records with the reason. A rejection notifies the partner. |
| POST | `/cases/:id/supply-type` | `cases:update` | Branded or white label. Allowed only before approval. |
| POST | `/plans` | `plans:create` | A new plan or a refinement. A refinement is a new plan, never an edit. |
| PATCH | `/plans/:id` | `plans:update` | IPR, attachments, staging, counts. Blocked once submitted. |
| POST | `/plans/:id/submit` | `plans:update` | Goes to second review, then to the orthodontist. |
| POST | `/plans/:id/approve` | `plans:approve` | Orthodontist only, with a confirmation token from /auth/reconfirm. Writes the sealed approval: name, registration number, plan version, scan reference, payload fingerprint, time, address. Never editable. |
| POST | `/plans/:id/reject` | `plans:approve` | Reason is mandatory and goes back to the planner. |
| GET | `/plans/:id/approval` | `cases:read` | The approval record as filed. Read-only to everyone, including Super Admin. |
| GET | `/cases/:id/history` | `cases:read` | Every state change with who and when. |
| POST | `/internal/cases/:id/state` | internal | Production, quality, dispatch and money move the case state through their own services. |


## production

`avm_production` — Print orders, the schedule, batches, station scans and machines.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/print-orders` | `production:create` | Created on approval, or by hand for a refinement or a remake. Carries the set range, type, needed-by date and urgency. |
| GET | `/print-orders` | `production:read` | Filter by state, due date, urgency, machine. |
| POST | `/print-orders/:id/schedule` | `production:schedule` | Places it on a machine and a slot. Enforces printer continuity: a case stays on the printer that made its earlier sets unless overridden with a reason. |
| GET | `/schedule` | `production:read` | The board: machine by slot, with capacity against demand. |
| POST | `/batches` | `production:create` | One run on one machine. Records operator, resin lot and sheet lot at the start. |
| POST | `/batches/:id/scan` | `production:update` | A station scan: station, set, operator, time. The chain of custody on the floor. |
| POST | `/batches/:id/close` | `production:update` | Models made, rejects, downtime. A batch cannot close with sets unaccounted for. |
| GET | `/sets` | `production:read` | By case, batch, arch, state. Each set carries its material lots. |
| GET | `/machines` | `production:read` | State, hours run, service dates, calibration, software version. |
| POST | `/machines/:id/downtime` | `production:update` | Start, end, reason. Feeds capacity. |
| POST | `/machines/:id/maintenance` | `production:update` | Planned or breakdown, with the work done and the next due date. |
| GET | `/reports/due-to-order` | `production:read` | Cases whose next sets must be started now to arrive before the patient runs out. |


## quality

`avm_quality` — The set-by-set check, rejects, non-conformances and corrective action.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/checks` | `quality:create` | One result per set: pass, rework or scrap, with a reason and a photo where it failed. |
| GET | `/checks` | `quality:read` | By batch, case, operator, reason, date. |
| POST | `/sets/:id/hold` | `quality:hold` | Stops a set, a batch or a lot from moving. Only quality can release it. |
| POST | `/holds/:id/release` | `quality:hold` | With the reason and the evidence. |
| POST | `/non-conformances` | `quality:create` | What happened, containment, cause, action, owner, due date. |
| POST | `/non-conformances/:id/close` | `quality:approve` | Needs the proof of effectiveness. Cannot close without it. |
| GET | `/reports/reject-trend` | `quality:read` | By reason, machine, operator, material lot and week. |


## stock

`avm_stock` — Items, lots, movements, requisitions, purchase orders, goods receipts and vendors.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| GET | `/items` | `stock:read` | Sheet, resin, packaging, consumables, with reorder levels. |
| GET | `/lots` | `stock:read` | By item, supplier, expiry, hold state. |
| POST | `/lots/:id/hold` | `stock:update` | Quarantine on arrival, or a hold raised by quality. |
| POST | `/issues` | `stock:update` | Issue to a batch. The lot number is written onto every set in that batch. |
| POST | `/returns` | `stock:update` | Unused material back to stores, with the condition. |
| POST | `/counts` | `stock:count` | A physical count and its adjustment, with the reason and the approver. |
| POST | `/requisitions` | `purchase:create` | What is needed, how much, why. |
| POST | `/requisitions/:id/approve` | `purchase:approve` | Above the limit it goes a level up. The limit is a setting. |
| POST | `/purchase-orders` | `purchase:create` | Vendor, items, rates, taxes, delivery date. |
| POST | `/goods-receipts` | `stock:update` | What actually arrived, the lot numbers, the condition and the test certificate. |
| GET | `/vendors` | `purchase:read` | With rating, lead time and the last three receipts. |
| GET | `/reports/reorder` | `stock:read` | Below reorder level, with consumption and expected demand. |


## dispatch

`avm_dispatch` — Boxes, labels, manifests, consignments and tracking.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/boxes` | `dispatch:create` | Built by scanning sets in. The box inherits the lots of the sets it holds. |
| POST | `/boxes/:id/pack` | `dispatch:update` | Packaging by supply type, pack photo, weight. |
| GET | `/boxes/:id/label` | `dispatch:read` | Label PDF, built on the queue. White-label boxes carry the partner’s approved artwork. |
| POST | `/consignments` | `logistics:create` | Books the courier, stores the waybill, prints the manifest. |
| POST | `/internal/consignments/:id/tracking` | internal | Written by the courier poller on q-courier. |
| GET | `/consignments` | `logistics:read` | By state, courier, partner, date, exception. |
| POST | `/consignments/:id/pod` | `logistics:update` | Proof of delivery. |
| POST | `/consignments/:id/claim` | `logistics:update` | A lost or damaged consignment, with the claim reference. |
| GET | `/reports/delivery-watch` | `logistics:read` | Consignments that will not land before the patient runs out. |


## money

`avm_money` — Invoices, e-invoicing, receipts, matching, statements and credit holds.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/internal/invoices` | internal | Raised on approval, from the price list in force on that date. |
| GET | `/invoices` | `money:read` | Scoped. A partner sees its own. |
| POST | `/invoices/:id/file` | `money:update` | Puts the IRP filing on q-einvoice. The returned number, or the failure and its reason, is stored on the invoice. |
| GET | `/invoices/:id/pdf` | `money:read` | Built on q-docs, stored in Blob. |
| POST | `/invoices/:id/pay-link` | `money:update` | A Razorpay link on the invoice and the statement. |
| POST | `/internal/payments/webhook` | internal | Razorpay callback. Signature checked; the payment matches itself to the invoice. |
| POST | `/payments` | `money:create` | A payment entered by hand, with the method and the reference. |
| POST | `/payments/:id/match` | `money:update` | Match against one or more invoices. Part payments allowed. |
| POST | `/credit-notes` | `money:approve` | Needs an approval and a reason. |
| GET | `/statements/:partnerId` | `money:read` | Opening, invoices, receipts, closing, ageing. |
| POST | `/partners/:id/credit-hold` | `money:approve` | Calls partners to put the account on hold. New cases are refused with the reason. |
| GET | `/reports/ageing` | `money:read` | By partner and bucket. |


## support

`avm_support` — Tickets, product complaints, assets, controlled documents and training records.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/tickets` | `support:create` | Type, links to a case or a box, description. |
| GET | `/tickets` | `support:read` | By type, owner, state, target breach. |
| POST | `/tickets/:id/assign` | `support:update` | With the response target for that type. |
| POST | `/tickets/:id/resolve` | `support:update` | Resolution and, for a product complaint, the linked non-conformance. |
| GET | `/documents` | `docs:read` | Controlled documents with number, version, approval and review date. |
| POST | `/documents/:id/version` | `docs:update` | A new version. The old one stays, marked superseded. |
| POST | `/documents/:id/approve` | `docs:approve` | With the confirmation token. The approval is sealed. |
| POST | `/training-records` | `docs:update` | Who was trained on which document version, and when. |
| GET | `/assets` | `support:read` | The asset register. |


## notify

`avm_notify` — Every message the portal sends, its template and whether it arrived.

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/internal/send` | internal | Puts a message on q-notify with its template and parameters. |
| GET | `/templates` | `notify:read` | By event and channel, with the approved WhatsApp template name. |
| PATCH | `/templates/:id` | `notify:update` | Text, channel, quiet hours. |
| GET | `/messages` | `notify:read` | What was sent, to whom, and the delivery status. |
| POST | `/internal/status` | internal | Delivery callbacks from WATI and the mail provider. |
| POST | `/otp/request` | none | Partner status API. Sends a one-time code by WhatsApp to the patient or dentist. Always answers 200. |
| POST | `/otp/verify` | none | Returns a short-lived token for the status lookup only. |


## public

Reachable without a login. Nothing else is.

| Method | Path | Authorisation | Purpose |
|---|---|---|---|
| GET | `/public/status` | one-time code | The partner status API. Returns the case state in the partner's own words and brand. Never our name, never the dentist's details, never a file. |
