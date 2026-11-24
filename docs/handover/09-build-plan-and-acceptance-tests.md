# 09 — Build plan and acceptance tests

## 1. Phases

| Phase | Delivers | Depends on |
|---|---|---|
| 1 | Identity, masters, onboarding, gateway, web shell | **Built and merged** |
| 1b | Changes to phase 1 listed below | |
| Sales track | Lead management and integrations. Runs alongside phases 2 and 3 | 1b |
| 2 | Cases, files, treatment planning | 1b |
| 3 | Production, inventory, machines, dispatch, schedule | 2 |
| 4 | Notifications, tracker, patient app | 3 |
| 5 | Billing, reports, staging and production hosting, cut-over | 2 for billing; 3 for reports |

Each phase ends with: all its acceptance tests passing in CI, a demo to the business owner on sample data, and the documents updated where the build differs.

Billing (phase 5) can start alongside phase 3 if a second developer is available; it depends only on phase 2.

## 2. Changes needed to phase 1 code

| # | Change | Where |
|---|---|---|
| 1 | Add role `sales_head` (level 60) and permission `leads:review`. Add roles `marketing`, `bde`, `direct_sales`. Rename `sales_executive` to `field_sales` | `packages/common/src/permissions.js` |
| 2 | Two-step approval: new status `reviewed`, new endpoint `POST /leads/:id/review`; approve only from `reviewed`; Sales head may reject | `services/onboarding` |
| 3 | Nobody reviews or approves a lead they own | `services/onboarding` |
| 4 | Add the remaining permissions from document 02 to the list and the default roles | `packages/common` |
| 5 | Clinic and distributor billing fields; product tax fields | `services/masters`, `services/onboarding` |
| 6 | Price lists | `services/masters` |
| 7 | Patient sign-in by one-time code; `patientId` scope; settings collection | `services/identity` |
| 8 | Event outbox, delivery worker and `/internal/events` receiver | `packages/common` |
| 9 | OpenAPI file per service | all services |
| 10 | Replace browser prompts in the web app with proper dialogs | `apps/web` |
| 11 | Token signing with a key pair instead of a shared secret | `packages/common`, `services/identity` |

Existing data: existing roles in a running database are not overwritten by the seed. Add a small migration script that adds the new role and permissions.

## 3. How to test

`scripts/e2e.mjs` runs checks through the gateway against running services. CI runs it on every pull request against MongoDB 7. 36 checks exist for phase 1.

For each phase, add the checks below to that script. A phase is done when all of them pass in CI. Use sample data only.

## 4. Acceptance tests

Ids in brackets refer to requirements in document 01.

### Phase 1b

| # | Check |
|---|---|
| 1b-1 | A submitted lead cannot be approved by Admin until the Sales head has reviewed it [ON-4] |
| 1b-2 | Sales head can review and can reject, but cannot approve [ON-4] |
| 1b-3 | A user cannot review or approve a lead they own |
| 1b-4 | A distributor sees only its own price list; a direct dentist sees the direct list; a distributor dentist gets none [MA-5, BI-5] |
| 1b-5 | A patient signs in with a one-time code; a wrong code five times blocks that code [ID-1] |
| 1b-6 | A setting can be changed by Super Admin and not by Admin [ID-6] |

### Sales track — lead management and integrations

| # | Check |
|---|---|
| S-1 | A lead posted by an ad-platform adapter appears with its source, campaign and ad details [LM-2, LM-3] |
| S-2 | The same item delivered twice creates one lead [IG-2] |
| S-3 | A repeat enquiry on the same mobile or email is merged as a new touch, not a new lead [LM-4] |
| S-4 | An item with a bad signature is stored, marked invalid and not processed [IG-2] |
| S-5 | A new lead is assigned by the rule in force [LM-5] |
| S-6 | A LumenAI score and outcome move the lead to Qualified and appear on its timeline [LM-6] |
| S-7 | A BDE sees only leads assigned to them; another BDE's lead returns "not found" [LM-14] |
| S-8 | A completed call appears as an activity with duration, outcome and recording link, whether telephony sits on the portal's side or LumenAI's [IG-4, IG-5] |
| S-9 | A hand-over moves the lead to the new owner with its full history [LM-8] |
| S-10 | A visit can be logged only by the lead's field or direct sales owner [LM-9] |
| S-11 | A lead cannot be marked lost without a reason; a lost lead can be re-opened [LM-11] |
| S-12 | A do-not-contact lead is refused by the call and WhatsApp endpoints [LM-12] |
| S-13 | Marketing can read all leads and cannot change them; an export is written to the audit log [LM-14] |
| S-14 | Cost per lead equals spend divided by leads for a known sample [LM-13] |
| S-15 | Approving a distributor lead creates the distributor account and its login [ON-4] |
| S-16 | A failed incoming item can be replayed and is then processed once [IG-2] |
| S-17 | With a partner switched off, leads can still be worked and queued items are sent when it returns [IG-8] |
| S-18 | No patient or clinical field is present in anything sent to a partner |

### Phase 2 — cases, files, planning

| # | Check |
|---|---|
| 2-1 | A dentist adds a patient; the doctor is taken from the sign-in, not from the request [CA-1] |
| 2-2 | A dentist cannot add a patient to a clinic that is not theirs [CA-1] |
| 2-3 | A patient under 18 cannot be saved without guardian details [CA-2] |
| 2-4 | Another dentist gets "not found" for this patient, its plans and its files [CA-6, FI-9] |
| 2-5 | A distributor cannot list or open any patient |
| 2-6 | Clinic staff see the patients of their dentist and no others [CA-6] |
| 2-7 | A plan cannot be submitted without product and both expected counts [CA-4] |
| 2-8 | A file upload link is refused for a plan the caller cannot see [FI-9] |
| 2-9 | A confirmed scan has an expiry date 180 days after upload [FI-5] |
| 2-10 | The expiring list shows a scan 14 days before expiry [FI-6] |
| 2-11 | A held scan survives its expiry date; a released one is removed [FI-7] |
| 2-12 | After deletion the record remains with a deletion date, and download answers "gone" [FI-8] |
| 2-13 | A new upload to the same slot is a new version; the old one stays [FI-3] |
| 2-14 | The planner sees the plan in the queue and uploads a setup with final counts [TP-1] |
| 2-15 | Only the treating dentist can approve; Admin cannot [TP-2] |
| 2-16 | A rejection needs a reason and returns the plan to the planner; the earlier version is kept [TP-2, TP-3] |
| 2-17 | Approval raises `plan.approved` exactly once, even if the request is repeated |
| 2-18 | Production, quality check and dispatch users cannot read a patient's mobile or date of birth |
| 2-19 | A new plan takes the clinic's default supply type; the dentist can change it before approval and nobody can change it after [CA-8] |

### Phase 3 — production, inventory, dispatch

| # | Check |
|---|---|
| 3-1 | Approving a plan with upper 20, lower 18 and a retainer creates 38 aligner rows and the retainer rows, all `planned` [TP-4] |
| 3-2 | The same event delivered twice creates the sets once |
| 3-3 | A dentist cannot raise a print order; Production can [PR-2] |
| 3-4 | An order for sets that are not `planned` is refused [PR-3] |
| 3-5 | A batch moves its sets to `printed` and reduces stock by the materials used [PR-4, IN-1] |
| 3-6 | Stock cannot go below zero [IN-1] |
| 3-7 | A batch cannot be recorded on a machine that is down [IN-3] |
| 3-8 | A QC rejection returns the set to `ordered` with a reason and appears in the reprint report [PR-5] |
| 3-9 | Only `qc_passed` sets can be dispatched [DI-2] |
| 3-10 | Dispatch computes run-out and order-by dates from the schedule and lead time [DI-5, DI-6] |
| 3-11 | A plan appears on the due-to-order list on its order-by date and not before [DI-7] |
| 3-12 | A plan on hold does not appear on the due-to-order list [PT-5] |
| 3-13 | Only the receiving clinic's dentist or staff can confirm receipt [DI-3] |
| 3-14 | Superseding a plan closes its `planned` and `ordered` sets and leaves printed ones alone [CA-5] |
| 3-15 | Clinic-wise counts equal the sum of set statuses for a known sample [RE-1] |
| 3-16 | Every set status change has a row in the set history |
| 3-17 | An item at reorder level appears on the low-stock list [IN-4] |
| 3-18 | A white-label dispatch produces a label without the AVMAligners name; a branded one carries it [DI-10] |

### Phase 4 — notifications, tracker, patient app

| # | Check |
|---|---|
| 4-1 | Adding a patient sends one app invitation [CA-7] |
| 4-2 | A patient sees only their own treatment; another patient's ids return "not found" [PT-7] |
| 4-3 | The treatment response contains no price fields [PT-7] |
| 4-4 | A tray change two days early moves every later due date two days earlier [DI-8] |
| 4-5 | A check-in is stamped with set number and date and cannot be edited afterwards [PT-2] |
| 4-6 | Only the treating dentist can decide on a check-in [PT-5] |
| 4-7 | A hold removes the plan from the due-to-order list; continue restores it [PT-5] |
| 4-8 | A rescan decision lets the dentist start a new plan and supersedes the old one on approval [PT-5] |
| 4-9 | A switched-off event sends nothing [NO-2] |
| 4-10 | Every message has a log row with a final status [NO-3] |
| 4-11 | Consent is recorded before any treatment data is shown in the app |
| 4-12 | The app builds and passes the checks above on Android and iPhone test devices |

### Phase 5 — billing, reports, hosting

| # | Check |
|---|---|
| 5-1 | Approving a plan for a distributor's clinic creates one invoice to the distributor [BI-1] |
| 5-2 | Approving a plan for a direct clinic creates one invoice to the clinic [BI-1] |
| 5-3 | The price is the one in force on the approval date, not today's [BI-3] |
| 5-4 | A payment larger than the balance is refused; part payments move the status correctly [BI-4] |
| 5-5 | A distributor dentist gets an empty invoice list; a direct dentist sees their own [BI-5] |
| 5-6 | A distributor cannot open another distributor's invoice |
| 5-7 | An invoice cannot be edited or deleted, only cancelled with a reason |
| 5-8 | A distributor's sales and finance reports show only its own accounts [RE-10] |
| 5-9 | Receivables total equals the sum of invoice balances |
| 5-10 | Staging and production run with the database and internal ports closed to the internet |
| 5-11 | A database backup is restored to a fresh environment and the checks pass on it |
| 5-12 | The scan bucket's lifecycle rules are shown to move and delete a test object |
| 5-13 | A white-label plan is invoiced from the white-label price list and a branded plan from the branded list, for the same customer on the same day [BI-3] |

## 5. Definition of done, for every pull request

1. Acceptance checks for the change are added and pass in CI.
2. Every new route has authentication, a permission, scope and input validation.
3. At least one "another user cannot see this" check for each new record type.
4. Creates, updates, approvals and status changes are audited.
5. No secrets, no real patient data, no patient details in logs.
6. Documents 04 and 05 updated if the data model or API changed.

<!--EXT2-->
## 6. Phases added in version 2.0

These follow phase 5. Phases 6 to 9 can run side by side with separate people, as the modules are separate services.

| Phase | Name | Modules | Depends on |
|---|---|---|---|
| 6 | Partner services and money | Partner management, White-label branding, Store and asset library, Support desk and complaints, Finance extensions | Phase 5 (billing) |
| 7 | Growth: marketing, calling and sales | Marketing automation, Calling workspace and AI playbooks, Sales performance | Sales track |
| 8 | Clinical, patient and logistics | Clinical extensions, Patient engagement, Logistics | Phases 3 and 4 |
| 9 | Factory, quality and learning | Manufacturing execution and quality system, Purchasing and costing, Learning and knowledge | Phase 3 |
| 10 | Platform and management insight | Platform, privacy and management insight | All earlier phases |

**Effort.** The earlier design had 15 modules. Version 2.0 has 30. The build is roughly twice as large, and the new half leans on outside partners whose terms are still open (document 11). The developer should estimate each phase after the partners are chosen.

### Acceptance tests for the new phases

#### Phase 6 — Partner services and money

| # | Check |
|---|---|
| 6-1 | A distributor's staff user sees only that distributor's data, and only what the staff role allows [Partner management] |
| 6-2 | A staff user cannot create an owner or see another distributor's staff [Partner management] |
| 6-3 | Scheme progress equals the count of approved plans in the period [Partner management] |
| 6-4 | An announcement needing acknowledgement stays open until an owner acknowledges it [Partner management] |
| 6-5 | A distributor's own selling prices never appear in any response to another user [Partner management] |
| 6-6 | A brand profile goes live only after Admin approval [White-label branding] |
| 6-7 | With a live profile, the patient app, messages and dentist portal for that partner's clinics contain no “AVMAligners” text [White-label branding] |
| 6-8 | Artwork cannot be marked ready to print until both sides approve and the regulatory check is ticked [White-label branding] |
| 6-9 | A dispatch for a partner-branded case uses the partner's packaging stock and reduces it [White-label branding] |
| 6-10 | A partner invoice is visible only to that partner and that dentist [White-label branding] |
| 6-11 | A distributor's dentist sees no prices in the store [Store and asset library] |
| 6-12 | A store order creates a dispatch and a line on the next invoice [Store and asset library] |
| 6-13 | Only the latest approved version of an asset can be downloaded [Store and asset library] |
| 6-14 | An overdue kit appears on the issuer's list [Store and asset library] |
| 6-15 | A ticket raised from the patient app reaches the patient's own clinic and nobody else's [Support desk and complaints] |
| 6-16 | A ticket past its deadline is escalated and flagged [Support desk and complaints] |
| 6-17 | A complaint ticket can be linked to a non-conformance and shows its status [Support desk and complaints] |
| 6-18 | A distributor sees tickets for its own clinics only [Support desk and complaints] |
| 6-19 | A verified gateway event is matched to its invoices exactly once, even if delivered twice [Finance extensions] |
| 6-20 | The portal stores no card or bank details [Finance extensions] |
| 6-21 | An account over its limit or overdue past the rule cannot have a new plan approved; an Admin release with a reason lifts it [Finance extensions] |
| 6-22 | An e-invoice failure does not block the invoice; it can be retried [Finance extensions] |
| 6-23 | A credit note cannot exceed the invoice balance and needs an approver [Finance extensions] |
| 6-24 | Payout totals equal the rule applied to the period's results [Finance extensions] |

#### Phase 7 — Growth: marketing, calling and sales

| # | Check |
|---|---|
| 7-1 | A form submission stores UTM values, click identifier and consent with the lead [Marketing automation] |
| 7-2 | A conversion event is sent only for a consented lead and never for do-not-contact [Marketing automation] |
| 7-3 | An audience sync sends hashed identifiers only [Marketing automation] |
| 7-4 | A reply stops a journey for that contact [Marketing automation] |
| 7-5 | A referral without the consent flag is refused [Marketing automation] |
| 7-6 | A patient lead is routed to the nearest opted-in clinic and re-routed if not answered in the set time [Marketing automation] |
| 7-7 | Attribution revenue equals the invoices of the accounts traced to each campaign [Marketing automation] |
| 7-8 | The next lead offered is the highest-priority uncalled lead assigned to that BDE [Calling workspace and AI playbooks] |
| 7-9 | Every scored call shows its checklist and can be re-scored by a Sales head [Calling workspace and AI playbooks] |
| 7-10 | A playbook switched off sends nothing [Calling workspace and AI playbooks] |
| 7-11 | The AI stops and hands over on each handover rule [Calling workspace and AI playbooks] |
| 7-12 | Every AI message is in the audit with its source article [Calling workspace and AI playbooks] |
| 7-13 | A day plan contains only the user's own leads and accounts [Sales performance] |
| 7-14 | A proposal below the list price cannot be sent without the right approval for that discount [Sales performance] |
| 7-15 | An account cannot be approved without a signed agreement [Sales performance] |
| 7-16 | An expense without a logged visit is refused [Sales performance] |
| 7-17 | Account health falls when cases fall or an invoice is overdue [Sales performance] |

#### Phase 8 — Clinical, patient and logistics

| # | Check |
|---|---|
| 8-1 | A simulation link shows the clinic name only, no prices, and stops working after its expiry [Clinical extensions] |
| 8-2 | A scan from a linked scanner appears in the right clinic's inbox only [Clinical extensions] |
| 8-3 | Saved preferences fill a new prescription and can be overridden [Clinical extensions] |
| 8-4 | A transfer to another distributor's doctor needs Admin [Clinical extensions] |
| 8-5 | A complex plan cannot be sent to the dentist without a second review [Clinical extensions] |
| 8-6 | The case library returns no patient name or code [Clinical extensions] |
| 8-7 | A lost-tray request reaches the treating dentist; a `replace` decision creates one print order for that set and moves the schedule [Patient engagement] |
| 8-8 | Appointment requests and chat reach the patient's own clinic only [Patient engagement] |
| 8-9 | Progress photos are visible only to the patient, guardian and treating dentist [Patient engagement] |
| 8-10 | A rating of 2 or below opens a support ticket [Patient engagement] |
| 8-11 | The fit check never blocks a tray change; it only flags [Patient engagement] |
| 8-12 | Courier options are returned only for couriers that serve the PIN code [Logistics] |
| 8-13 | A box cannot be closed until every expected tray is scanned and no other tray is [Logistics] |
| 8-14 | A tracking event updates the dispatch and, on delivery, stores proof of delivery [Logistics] |
| 8-15 | A box whose expected delivery is within 2 days of run-out appears as at risk [Logistics] |
| 8-16 | A replacement shipment points to its original dispatch [Logistics] |

#### Phase 9 — Factory, quality and learning

| # | Check |
|---|---|
| 9-1 | A set scanned at a station out of order is refused [Manufacturing execution and quality system] |
| 9-2 | Scanning a tray returns its plan, order, batch, machine, lots, checks and dispatch [Manufacturing execution and quality system] |
| 9-3 | A lot query returns every set and patient code made from it [Manufacturing execution and quality system] |
| 9-4 | A machine marked down is removed from the suggested schedule [Manufacturing execution and quality system] |
| 9-5 | A QC reject or a complaint can open a non-conformance, which cannot close without cause, action and proof [Manufacturing execution and quality system] |
| 9-6 | Only the current approved document version is shown at a station [Manufacturing execution and quality system] |
| 9-7 | A low-stock event raises one requisition, not several [Purchasing and costing] |
| 9-8 | A goods receipt creates a material lot and increases stock [Purchasing and costing] |
| 9-9 | Supplier on-time rate equals receipts against expected dates [Purchasing and costing] |
| 9-10 | Cost per case equals the sum of its recorded material, machine time, labour and packing [Purchasing and costing] |
| 9-11 | A certificate is issued only on a passed quiz and expires on its date [Learning and knowledge] |
| 9-12 | A provider level follows the rule for cases in 12 months [Learning and knowledge] |
| 9-13 | LumenAI receives only approved articles marked for AI use [Learning and knowledge] |

#### Phase 10 — Platform and management insight

| # | Check |
|---|---|
| 10-1 | A staff user without a second step cannot sign in once the rule is on [Platform, privacy and management insight] |
| 10-2 | A partner key can call only the endpoints in its scope and is stored hashed [Platform, privacy and management insight] |
| 10-3 | A deletion request removes what can be deleted and records what was kept and why [Platform, privacy and management insight] |
| 10-4 | A scheduled report sent to a distributor contains only its own data [Platform, privacy and management insight] |
| 10-5 | Management figures equal the totals of the operating reports for the same period [Platform, privacy and management insight] |
