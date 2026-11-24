# 05 — API specification

Phase 1 endpoints are built and listed in `docs/API.md`. This document lists the changes to them and every endpoint still to build.

## Conventions

- Base path through the gateway: `/api/<service>/...`
- `Authorization: Bearer <access token>` on every call except sign-in.
- JSON in and out. Errors: `{ "error": "plain message", "details": [ { "field", "message" } ] }`.
- Status codes: 200 OK, 201 created, 400 bad input, 401 not signed in, 403 no permission, 404 not found **or outside your scope**, 409 conflict, 502 a dependent service failed.
- Lists take `page`, `limit` (max 100), `q` and return `{ items, total, page, limit }`.
- Dates are ISO 8601 in the API. The apps show DD-MM-YYYY.
- "Scoped" means the result is limited to the caller's own records (document 02, section 3).
- Each service must publish an OpenAPI 3 file at `/api/<service>/openapi.json` generated from its request schemas. **To do for all services, including phase 1.**

---

## 1. identity — changes and additions

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/auth/otp/request` | none | `{ phone }` or `{ email }`. Sends a one-time code to a patient. Always answers 200 so numbers cannot be probed |
| POST | `/auth/otp/verify` | none | `{ phone or email, code }` → tokens. Patient role only |
| POST | `/devices` | signed in | `{ platform, token }` register a phone for push. Forwarded to notifications |
| GET | `/settings` | `users:read` | Read system settings |
| PUT | `/settings/:key` | `settings:update` | Change a setting. Audited with before and after |
| POST | `/internal/users` | internal | Extend allowed roles with `patient`; accept `patientId` |

Add role `sales_head` and permission `leads:review` to the seed.

## 2. onboarding — changes and additions

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/leads/:id/review` | `leads:review` | Sales head marks a submitted lead as reviewed |
| POST | `/leads/:id/approve` | `leads:approve` | **Change:** allowed only from `reviewed`, not from `submitted` |
| POST | `/leads/:id/reject` | `leads:review` or `leads:approve` | **Change:** Sales head may also reject |
| POST | `/leads/:id/documents` | `leads:update` | `{ fileId }` attach an uploaded document |

### Lead management (sales track)

| Method | Path | Permission | Purpose |
|---|---|---|---|
| GET | `/leads` | `leads:read` | Scoped. Filter by `stage`, `leadType`, `sourceId`, `campaignId`, `assignedTo`, `followUpDue` |
| POST | `/leads` | `leads:create` | Manual entry. Checks for a duplicate on phone and email first |
| POST | `/leads/import` | `leads:import` | File of leads; returns created, merged and rejected rows |
| GET | `/leads/export` | `leads:export` | Excel. Audited |
| POST | `/leads/:id/assign` | `leads:assign` | `{ userId }`. Raises `lead.assigned` |
| POST | `/leads/:id/stage` | `leads:update` | `{ stage, lostReason? }`. Only allowed moves; `lost` needs a reason |
| POST | `/leads/:id/handover` | `leads:update` | `{ toUserId, note }` BDE to field or direct sales |
| GET | `/leads/:id/activities` | `leads:read` | The lead's full history |
| POST | `/leads/:id/activities` | `activities:create` | A note, or a call outcome entered by hand |
| POST | `/leads/:id/visits` | `visits:create` | `{ at, metWith, outcome, nextStep }` |
| POST | `/leads/:id/call` | `activities:create` | Starts a call through telephony; the result arrives as an activity |
| POST | `/leads/:id/do-not-contact` | `leads:update` | `{ calls, whatsapp }` |
| GET | `/follow-ups` | `leads:read` | The caller's leads with a follow-up due or missed |
| GET, POST | `/accounts`, PATCH `/accounts/:id` | `accounts:read` / `accounts:manage` | Scoped to the owner |
| GET, POST | `/campaigns`, `/sources` | `campaigns:read` / `campaigns:manage` | |
| GET, POST | `/spend` | `campaigns:read` / `spend:manage` | Monthly spend by source and campaign |
| GET, PUT | `/assignment-rules` | `leads:assign` | |
| POST | `/internal/events` | internal | `lead.received` creates or merges a lead and applies the assignment rule. `lead.qualified` sets score and stage. `call.completed` and `message.received` add activities |

A distributor lead, when approved, creates the distributor and its login instead of a clinic and doctor.

## 3. masters — additions

| Method | Path | Permission | Purpose |
|---|---|---|---|
| GET | `/price-lists` | `pricelists:read` | Scoped: a distributor sees its own; a direct dentist sees the direct list |
| POST | `/price-lists` | `pricelists:manage` | New list or new prices from a date. Each list is for one `branding`: `branded` or `white_label` |
| GET | `/internal/price` | internal | `?clinicId&productCode&onDate` → the price that applies. Used by billing |
| GET | `/internal/clinics/:id`, `/internal/doctors/:id` | internal | For other services to copy names and check links |

## 4. cases (phase 2)

| Method | Path | Permission | Purpose |
|---|---|---|---|
| GET | `/patients` | `patients:read` | Scoped. Filter by `clinicId`, `status`, `q` (name, code, mobile) |
| POST | `/patients` | `patients:create` | Doctor is taken from the token. `clinicId` must be one of the doctor's clinics. Raises `patient.created` |
| GET | `/patients/:id` | `patients:read` | Scoped |
| PATCH | `/patients/:id` | `patients:update` | Doctor and clinic cannot be changed here |
| GET | `/patients/:id/plans` | `plans:read` | |
| POST | `/patients/:id/plans` | `plans:create` | Creates a draft plan. `type` is `initial` for the first, else `refinement` or `rescan` |
| GET | `/plans/:id` | `plans:read` | Scoped. Price fields never included |
| PATCH | `/plans/:id` | `plans:create` | Edit prescription, conditions, tooth instructions and `branding` while `draft` or `revision_requested`. `branding` cannot change after approval |
| POST | `/plans/:id/submit` | `plans:create` | Needs the required photos and both scans, or an explicit "upload later" flag. Moves to `submitted` |
| GET | `/planning/queue` | `setups:upload` | Plans in `submitted` or `revision_requested`, oldest first |
| POST | `/plans/:id/setups` | `setups:upload` | `{ setupFileId, iprFileId?, upper, lower, retainerIncluded, notes }`. Moves to `setup_uploaded` |
| POST | `/plans/:id/setups/:version/approve` | `setups:approve` | Treating dentist only. Sets final counts, moves to `approved`, raises `plan.approved`. If the plan replaces another, raises `plan.superseded` for the old one |
| POST | `/plans/:id/setups/:version/reject` | `setups:approve` | `{ reason }`. Moves to `revision_requested` |
| POST | `/plans/:id/cancel` | `plans:create` | Only before approval |
| GET | `/internal/plans/:id` | internal | For other services |
| POST | `/internal/events` | internal | Receives `checkin.decided` (rescan) |

## 5. files (phase 2)

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/uploads` | `files:upload` | `{ kind, slot, planId or leadId, contentType, sizeBytes }` → `{ fileId, uploadUrl, expiresIn }`. Checks the caller may see that plan. Size and type limits per kind |
| POST | `/uploads/:fileId/confirm` | `files:upload` | `{ checksum }`. Verifies the object exists, marks `stored`, sets `expiresOn` for scans |
| GET | `/files` | `files:read` | `?planId` or `?leadId`. Scoped. Latest version per slot unless `allVersions=true` |
| GET | `/files/:id/download` | `files:read` | → `{ url, expiresIn }` short-lived link. 410 if deleted |
| GET | `/scans/expiring` | `files:read` | Scans whose `expiresOn` is within `days` (default 14). Scoped |
| POST | `/scans/:id/hold` | `scans:hold` | `{ reason }`. Sets the hold on the stored object |
| POST | `/scans/:id/release` | `scans:hold` | Lifts the hold. If already past `expiresOn`, the file is deleted at the next lifecycle run |
| GET | `/storage/summary` | `reports:operations` | Bytes and counts by bucket and status |

Limits (**assumed**): photo 15 MB, x-ray 25 MB, video 200 MB, STL 150 MB per file. STL accepts `.stl` and `.zip`.

## 6. production (phase 3)

### Sets and orders

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/internal/events` | internal | `plan.approved` creates the plan state and the set rows. `plan.superseded` closes remaining `planned` and `ordered` sets. `checkin.created` sets `startedOn` and moves later dates. `checkin.decided` sets or clears hold |
| GET | `/plans/:planId/sets` | `sets:read` | Scoped. All sets with status and dates |
| GET | `/orders` | `orders:read` | Filter by `status`, `urgent`, `clinicId`. Default sort `neededBy` |
| POST | `/orders` | `orders:create` | `{ planId, arches, fromSet, toSet, includeRetainer, urgent, neededBy }`. Every set in the range must be `planned`. Refused if the plan is on hold |
| POST | `/orders/:id/cancel` | `orders:create` | Sets return to `planned` |
| GET | `/due-to-order` | `orders:read` | Plans whose order-by date has arrived and that still have planned sets, sorted by run-out date. Plans on hold are left out |
| GET | `/batches` | `orders:read` | |
| POST | `/batches` | `batches:create` | `{ printedOn, machineId, modelCount, setIds, materialsUsed }`. Sets must be `ordered`. Writes stock issues |
| POST | `/batches/:id/qc` | `qc:decide` | `{ passedSetIds, rejected: [ { setId, reason } ] }`. Rejected sets return to `ordered` |

### Dispatch and schedule

| Method | Path | Permission | Purpose |
|---|---|---|---|
| GET | `/ready-to-dispatch` | `dispatch:read` | `qc_passed` sets grouped by plan and clinic |
| POST | `/dispatches` | `dispatch:create` | `{ planId, setIds, courier, trackingNo, dispatchedOn }`. Sets must be `qc_passed`. Computes `runsOutOn` and `orderByOn`. Copies the plan's `branding`; a `white_label` dispatch returns the plain label |
| GET | `/dispatches` | `dispatch:read` | Scoped. Dentists and patients see their own |
| POST | `/dispatches/:id/receive` | `dispatch:receive` | `{ receivedOn }`. Dentist or clinic staff of that clinic |
| PATCH | `/plans/:planId/schedule` | `schedule:update` | `{ daysPerSet?, treatmentStartDate?, setsPerBox? }`. Dentist may set start date and days per set; manufacturing team may set box size. Recomputes dates |

### Inventory and machines

| Method | Path | Permission | Purpose |
|---|---|---|---|
| GET, POST | `/items`, PATCH `/items/:id` | `stock:read` / `stock:manage` | |
| GET | `/items/low` | `stock:read` | At or below reorder level |
| GET | `/stock-movements` | `stock:read` | Filter by item and date |
| POST | `/stock-movements` | `stock:manage` | `{ itemId, type, quantity, reference }`. Stock cannot go below zero |
| GET | `/finished-stock` | `stock:read` | `printed` and `qc_passed` sets not yet dispatched, by clinic |
| GET, POST | `/machines`, PATCH `/machines/:id` | `machines:read` / `machines:manage` | |
| GET, POST | `/machines/:id/logs` | `machines:read` / `machines:manage` | Maintenance and downtime. Opening a downtime log sets the machine to `down` |

## 7. tracker (phase 4)

| Method | Path | Permission | Purpose |
|---|---|---|---|
| GET | `/me/treatment` | `plans:read` (patient) | Current plan, current set, schedule, next change date, next box status. One call for the app home screen |
| POST | `/checkins` | `checkins:create` | `{ setNo, changedOn, photoFileIds, note }`. Patient only, own plan. Raises `checkin.created` |
| GET | `/checkins` | `checkins:read` | Scoped. `?patientId`, `?awaitingDecision=true` |
| POST | `/checkins/:id/decision` | `checkins:decide` | `{ result: continue|hold|rescan, note }`. Treating dentist only. Raises `checkin.decided` |
| PUT | `/wear/:date` | `checkins:create` | `{ hoursWorn }` |
| GET | `/wear` | `checkins:read` | `?from&to`. Scoped |
| POST | `/me/consent` | patient | `{ version }` records consent at first use |

## 8. notifications (phase 4)

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/internal/events` | internal | Turns an event into messages using the templates |
| POST | `/internal/devices` | internal | Register a device token |
| GET | `/templates`, PUT `/templates/:id` | `notifications:manage` | Edit text, switch on or off |
| GET | `/messages` | `notifications:manage` | Message log with status |
| GET | `/me/notifications` | signed in | The caller's own recent notifications, for an in-app list |

## 9. billing (phase 5)

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/internal/events` | internal | `plan.approved` creates the invoice: customer from the clinic (distributor or direct), price from masters |
| GET | `/invoices` | `invoices:read` | Scoped. Distributor: own. Direct dentist: own clinic's. Distributor dentist: always empty |
| GET | `/invoices/:id` | `invoices:read` | Scoped |
| GET | `/invoices/:id/pdf` | `invoices:read` | Branded invoice |
| POST | `/invoices/:id/cancel` | `invoices:manage` | `{ reason }` |
| POST | `/invoices/:id/payments` | `payments:record` | `{ amount, receivedOn, mode, reference }`. Cannot exceed the balance |
| GET | `/payments` | `invoices:read` | Scoped |
| GET | `/receivables` | `reports:finance` | Outstanding by customer with ageing |

## 10. reports (phase 5)

All read-only. Each calls the owning services' APIs with the caller's token, so scope is applied by those services.

| Method | Path | Permission | Returns |
|---|---|---|---|
| GET | `/clinic-sets` | `reports:operations` | Per clinic: planned, ordered, printed, qc passed, dispatched, received, pending |
| GET | `/print-queue` | `reports:operations` | Open orders by needed-by date |
| GET | `/daily-output` | `reports:operations` | Models and sets per day, per machine, per operator |
| GET | `/stalled-cases` | `reports:operations` | Plans with planned sets and no activity for the stalled period |
| GET | `/reprints` | `reports:operations` | Rejected sets by reason and machine |
| GET | `/machine-downtime` | `reports:operations` | Hours down per machine |
| GET | `/sales-funnel` | `reports:sales` | Leads by status and owner. Scoped |
| GET | `/receivables` | `reports:finance` | From billing |
| GET | `/scan-storage` | `reports:operations` | From files |

Every report also offers `?format=xlsx` for download.

## 11. integrations (sales track)

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/hooks/:partner` | partner key and signature | The one endpoint a partner calls. Stores the item as received, answers at once, processes it afterwards. No sign-in token; the partner's own key and a signed body |
| GET | `/connections` | `integrations:read` | Each partner: status, side, last activity, last error |
| PUT | `/connections/:partner` | `integrations:manage` | Pause, resume, set the side for telephony and WhatsApp |
| GET | `/events` | `integrations:read` | Incoming items with status. Filter by partner and status |
| POST | `/events/:id/replay` | `integrations:manage` | Process a failed item again |
| POST | `/internal/qualify` | internal | Send a lead to LumenAI |
| POST | `/internal/call` | internal | Start a call through the telephony provider, or through LumenAI if telephony sits there |
| POST | `/internal/whatsapp` | internal | Send a template message |

What each partner must be able to do, for the developer to confirm with them:

| Partner | Needs from the partner |
|---|---|
| Meta, Google, Bing, TikTok | Lead-form webhooks or a lead-retrieval API, with campaign and ad ids on each lead |
| LumenAI | An API to receive a lead and a follow-up request; webhooks for score, outcome, summaries, transcripts and recording links |
| MCube, Exotel | Click-to-call API; call-completed webhook with duration, outcome and recording link |
| WhatsApp Business | Template sending; webhooks for replies and delivery status |

<!--EXT2-->
## 12. Endpoints added in version 2.0

The conventions at the top of this document apply. Only the main endpoints are listed; each resource also has the usual list and read endpoints with scope.

### 12.1 Partner management (phase 6)

| Method | Path | Permission | Notes |
|---|---|---|---|
| GET | `/partners/me/dashboard` | `partner:read` | Own distributor only |
| POST | `/partners/me/users` | `partner:staff` | Owner creates staff with a `partnerRole`; temporary password shown once |
| GET | `/partners/me/schemes` | `partner:read` | Slabs and progress |
| POST | `/schemes` | `schemes:manage` | Accounts or Admin |
| GET | `/partners/me/territory-alerts` | `partner:read` |  |
| POST | `/announcements/:id/ack` | `partner:read` | Records who acknowledged |
| GET | `/partners/:id/review/:quarter` | `partner:review` | Distributor sees its own; Sales head sees all |
| PUT | `/partners/me/prices` | `partner:prices` | Own selling prices; never shown to the company's other partners |

### 12.2 White-label branding (phase 6)

| Method | Path | Permission | Notes |
|---|---|---|---|
| GET | `/brand-profiles/mine` | `brand:read` |  |
| PUT | `/brand-profiles/mine` | `brand:edit` | Goes to `in_review` |
| POST | `/brand-profiles/:id/approve` | `brand:approve` | Admin |
| POST | `/artworks` | `brand:edit` | New version of an item |
| POST | `/artworks/:id/decision` | brand:edit or brand:approve | Both sides must approve; company side records the regulatory check |
| GET | `/internal/brand/resolve` | internal | Given a clinic or plan, returns the theme, names and sender for the app, portal and messages |
| POST | `/partner-invoices` | `partnerbilling:manage` | Partner bills its own dentist |

### 12.3 Store and asset library (phase 6)

| Method | Path | Permission | Notes |
|---|---|---|---|
| GET | `/store/items` | `store:read` | Prices by the caller's price list; none for a distributor's dentist |
| POST | `/store/orders` | `store:order` | Raises `store.ordered`; billed on the next invoice |
| GET | `/store/orders` | `store:read` | Scoped |
| POST | `/kits/:id/issue` | `kits:manage` |  |
| GET | `/assets` | `assets:read` | Latest approved version only |
| POST | `/assets` | `assets:manage` | Draft, then approval |

### 12.4 Support desk and complaints (phase 6)

| Method | Path | Permission | Notes |
|---|---|---|---|
| POST | `/tickets` | `tickets:create` | Any signed-in user, the patient app and LumenAI |
| GET | `/tickets` | `tickets:read` | Scoped: own, own account, or own team's queue |
| POST | `/tickets/:id/messages` | `tickets:reply` |  |
| POST | `/tickets/:id/assign` | `tickets:manage` |  |
| POST | `/tickets/:id/close` | `tickets:reply` | Asks for a satisfaction score |
| POST | `/tickets/:id/link-nc` | `tickets:manage` | Opens or links a non-conformance for a complaint |

### 12.5 Finance extensions (phase 6)

| Method | Path | Permission | Notes |
|---|---|---|---|
| POST | `/payments/online/session` | `invoices:pay` | Creates a session with the payment partner for chosen invoices |
| POST | `/payments/online/webhook` | gateway signature | Verifies, records and matches; idempotent |
| POST | `/invoices/:id/einvoice` | `einvoice:manage` | Generates reference number and QR; retries on failure |
| PUT | `/credit-accounts/:id` | `credit:manage` | Limit and credit days |
| POST | `/credit-accounts/:id/release` | `credit:release` | Admin, with reason |
| GET | `/internal/credit/check` | internal | Called by cases before a plan is approved |
| POST | `/credit-notes` | `creditnotes:manage` | Always against an invoice, with an approver |
| GET | `/payouts` | `payouts:read` |  |
| POST | `/payouts/:id/approve` | `payouts:approve` |  |
| POST | `/exports/accounting` | `accounts:export` |  |

### 12.6 Marketing automation (phase 7)

| Method | Path | Permission | Notes |
|---|---|---|---|
| POST | `/public/forms/:slug` | none (rate-limited) | Creates a lead with tracking and consent |
| GET | `/tracking/:leadId` | `marketing:read` |  |
| POST | `/audiences` | `audiences:manage` |  |
| POST | `/audiences/:id/sync` | `audiences:manage` | Hashed identifiers; consented contacts only |
| POST | `/journeys` | `journeys:manage` |  |
| POST | `/events` | `events:manage` |  |
| POST | `/events/:id/attendance` | `events:manage` | Adds a lead activity |
| POST | `/referrals` | `referrals:create` | Dentist, distributor or patient app; consent flag required |
| POST | `/public/patient-leads` | none (rate-limited) | Routes to the nearest opted-in clinic |
| PUT | `/consents/:contactId` | `consent:manage` |  |
| GET | `/attribution` | `marketing:read` | Spend to revenue by campaign |

### 12.7 Calling workspace and AI playbooks (phase 7)

| Method | Path | Permission | Notes |
|---|---|---|---|
| GET | `/workspace/next` | `leads:call` | Next lead by score and freshness |
| POST | `/activities/:id/score` | `calls:score` |  |
| GET | `/scripts` | `leads:call` | By lead type and stage |
| GET | `/playbooks` | `ai:manage` |  |
| PUT | `/playbooks/:key` | `ai:manage` | Switch on or off, set limits |
| PUT | `/handover-rules` | `ai:manage` |  |
| GET | `/ai-messages` | `ai:audit` | Read-only audit |
| POST | `/integrations/lumenai/handover` | partner key | LumenAI passes a live call or chat to a person |

### 12.8 Sales performance (phase 7)

| Method | Path | Permission | Notes |
|---|---|---|---|
| GET | `/day-plans/:date` | `sales:plan` | Suggested order; own plan |
| PUT | `/targets` | `targets:manage` | Sales head |
| GET | `/account-health` | `accounts:read` | Scoped |
| POST | `/proposals` | `proposals:create` | Prices from the price list |
| POST | `/price-approvals/:id/decision` | `prices:approve` | By limit: Sales head or Admin |
| POST | `/agreements` | `agreements:send` | Sends for signature |
| POST | `/agreements/webhook` | e-sign signature | Marks signed and stores the file |
| POST | `/expenses` | `expenses:claim` | Must point to a logged visit |
| GET | `/forecast` | `sales:forecast` |  |

### 12.9 Clinical extensions (phase 8)

| Method | Path | Permission | Notes |
|---|---|---|---|
| POST | `/suitability-checks` | `suitability:ask` | Dentist |
| POST | `/suitability-checks/:id/answer` | `suitability:answer` | Planner |
| POST | `/plans/:id/simulation` | `setups:approve` | Creates a patient link with an expiry |
| GET | `/public/simulations/:token` | none | Clinic name only; no prices |
| POST | `/scanner-links` | `scans:connect` |  |
| POST | `/integrations/scanner/:provider` | partner key | Scan arrives in the inbox |
| POST | `/scan-inbox/:id/match` | `files:upload` | Attaches to a patient's plan |
| POST | `/plans/:id/chat` | `plans:read` | Dentist and planner on that plan |
| PUT | `/doctors/me/preferences` | `plans:create` |  |
| POST | `/patients/:id/consent` | `patients:create` | One-time code signature |
| POST | `/patients/:id/transfer` | `patients:transfer` | Within the same distributor or direct; else Admin |
| POST | `/plans/:id/assign` | `planning:allocate` |  |
| GET | `/case-library` | `library:read` | No names |

### 12.10 Patient engagement (phase 8)

| Method | Path | Permission | Notes |
|---|---|---|---|
| GET | `/app/guides` | patient |  |
| POST | `/app/appointments` | patient | A request the clinic confirms |
| POST | `/app/chat` | patient | To the patient's own clinic |
| POST | `/app/tray-issues` | patient | Opens a ticket for the dentist |
| POST | `/tray-issues/:id/decision` | `checkins:decide` | `replace` raises `replacement.requested` to production |
| GET | `/app/progress` | patient |  |
| POST | `/app/ratings` | patient | A low score opens a ticket |
| POST | `/internal/fit-check` | internal | Runs on a check-in photo |

### 12.11 Logistics (phase 8)

| Method | Path | Permission | Notes |
|---|---|---|---|
| GET | `/courier/options` | `dispatch:create` | Serviceability, days and rate for a PIN code |
| POST | `/shipments` | `dispatch:create` | Books, returns waybill and label |
| POST | `/integrations/courier/webhook` | partner signature | Tracking events and proof of delivery |
| POST | `/dispatches/:id/pack-scan` | `dispatch:pack` | Refuses a tray not in the box |
| POST | `/dispatches/:id/close` | `dispatch:pack` | Needs every tray scanned and a photo |
| GET | `/delivery-watch` | `dispatch:read` | Margin against run-out date |
| POST | `/returns` | `dispatch:returns` |  |
| POST | `/claims` | `dispatch:returns` |  |
| POST | `/manifests` | `dispatch:create` |  |
| POST | `/pickups` | `scans:connect` | Scanner visit or impression pick-up |

### 12.12 Manufacturing execution and quality system (phase 9)

| Method | Path | Permission | Notes |
|---|---|---|---|
| POST | `/station-scans` | `floor:scan` | Refuses an out-of-order station |
| GET | `/stations/board` | `floor:read` |  |
| GET | `/schedule/suggest` | `schedule:manage` | By needed-by date and capacity |
| PUT | `/schedule` | `schedule:manage` |  |
| GET | `/trace/tray/:code` | `trace:read` | Full history |
| GET | `/trace/lot/:id` | `trace:read` | Every set and patient code |
| POST | `/recalls` | `trace:recall` | Production head or Admin |
| GET | `/oee` | `machines:read` |  |
| POST | `/nonconformances` | `quality:manage` |  |
| POST | `/qc/checklists` | `qc:check` |  |
| POST | `/documents` | `documents:manage` | New version, approval |
| POST | `/training-records` | `documents:manage` |  |

### 12.13 Purchasing and costing (phase 9)

| Method | Path | Permission | Notes |
|---|---|---|---|
| POST | `/requisitions` | `purchase:request` | Also raised by `stock.low` |
| POST | `/purchase-orders` | `purchase:order` |  |
| POST | `/goods-receipts` | `purchase:receive` | Creates the material lot and the stock receipt |
| GET | `/suppliers/ratings` | `purchase:read` |  |
| GET | `/case-costs` | `costs:read` | Production head, Accounts, Management |

### 12.14 Learning and knowledge (phase 9)

| Method | Path | Permission | Notes |
|---|---|---|---|
| GET | `/courses` | `learning:read` | By audience |
| POST | `/enrolments/:id/quiz` | `learning:read` | Issues the certificate on a pass |
| POST | `/courses` | `learning:manage` |  |
| GET | `/articles` | `knowledge:read` |  |
| POST | `/articles/:id/approve` | `knowledge:approve` | Only approved articles are given to LumenAI |
| GET | `/internal/knowledge/ai` | internal | Approved articles marked for AI use |

### 12.15 Platform, privacy and management insight (phase 10)

| Method | Path | Permission | Notes |
|---|---|---|---|
| POST | `/auth/mfa/enrol` | signed-in |  |
| POST | `/auth/mfa/verify` | signed-in | Second step at sign-in |
| POST | `/api-keys` | `apikeys:manage` | Super Admin; key shown once |
| GET | `/privacy/requests` | `privacy:manage` |  |
| POST | `/privacy/requests/:id/complete` | `privacy:manage` | Records what was deleted and what was kept |
| POST | `/privacy/breaches` | `privacy:manage` |  |
| GET | `/insight/management` | `insight:read` |  |
| GET | `/insight/capacity` | `insight:read` |  |
| GET | `/insight/unit-economics` | `insight:read` |  |
| POST | `/report-schedules` | `reports:schedule` | Report is cut to each recipient's scope |
