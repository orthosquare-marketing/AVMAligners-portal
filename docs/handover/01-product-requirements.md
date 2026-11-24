# 01 — Product requirements

## 1. Purpose

AVMAligners Portal is the single system for the clear-aligner business run by the Flexismile manufacturing team. It replaces four things used today:

- the current portal, which records cases but lets the doctor, clinic and case number be typed as free text;
- the manufacturing team's Excel print register, which is the only record of what was printed and has no patient identifier;
- email, which is how STL scans are sent and then deleted by hand;
- the separate ad-platform exports, sheets and calling tools in which sales leads are held today.

The business goal is to know, at any moment and for every clinic, how many aligner sets are planned, printed, dispatched and still pending, so that print capacity can be planned.

## 2. Users

| User | Uses | Main jobs |
|---|---|---|
| Marketing | Web | Run lead generation on Meta, Google, Bing, TikTok and re-engagement; see lead quality and cost by source |
| BDE (calling team) | Web | Call and engage new leads, qualify them, book follow-ups, hand over to sales |
| Field sales | Web | Visit and close leads in a territory; log each visit |
| Direct sales | Web | Own named large accounts from first contact to onboarding |
| Distributor | Web | Refer and onboard dentists and clinics in own territory; follow own accounts; see own invoices |
| Sales head | Web | First approval of every new dentist and clinic |
| Dentist | Web | Add patients, send scans and prescriptions, approve plans, follow cases and dispatches |
| Clinic staff | Web | Upload records for the dentist, confirm receipt of boxes |
| Treatment planner | Web | Download scans, upload the treatment setup and IPR, handle revisions |
| Production | Web | Raise print orders, record print batches, manage stock and machines |
| Quality check | Web | Pass or reject printed batches |
| Dispatch | Web | Pack boxes, record courier and tracking |
| Accounts | Web | Price lists, invoices, payments |
| Admin | Web | Day-to-day control of users, masters, approvals and settings |
| Super Admin | Web | Everything, including roles and system settings |
| Patient | Android and iPhone app | Follow own tray schedule, record tray changes, send photos, track boxes |

## 3. Scope

### 3.1 In scope

| # | Module | Summary |
|---|---|---|
| 1 | Identity and access | Sign-in, roles, permissions, audit log. Built |
| 2 | Onboarding | Two-step approval that turns a won lead into a distributor, clinic, doctor and login. Built, approval to change |
| 3 | Masters | Clinics, doctors, products, price lists. Built, price lists to add |
| 4 | Cases | Patients, prescriptions, plans |
| 5 | Files | Photos, x-rays, videos, IPR files, STL scans with timed deletion |
| 6 | Treatment planning | Setup upload, doctor approval, revisions, refinements |
| 7 | Production | Aligner sets, print orders, print batches, quality check, reprints |
| 8 | Inventory | Raw materials, finished aligners, machines with maintenance and downtime |
| 9 | Dispatch | Boxes, courier, tracking, receipt, due-to-order list |
| 10 | Patient tracker | Tray schedule, tray changes, wear time, photos, doctor check |
| 11 | Billing | Invoices to distributors and direct dentists, payments recorded |
| 12 | Notifications | WhatsApp, email, app notifications |
| 13 | Reports | Clinic-wise sets, print queue, output, stock, sales, receivables |
| 14 | Lead management | Leads for dentists, clinics and distributors from every marketing source; calling, visits, accounts, pipeline |
| 15 | Integrations | Ad platforms, LumenAI, MCube, Exotel and WhatsApp Business, each through its own adapter |

### 3.2 Out of scope

- Orthosquare PMS and AVMSmiles VSoft. No integration.
- Old cases from the current portal. They finish in the current portal. **Settled.**
- The price a distributor charges its dentists. It stays outside the portal. **Settled.**
- Online payment collection in the first version. Payments are recorded by Accounts. The design must allow a gateway later. **Settled.**
- SMS. Not a chosen channel. **Settled.**
- Treatment-planning software itself. The planner works in their own tool and uploads the result.

## 4. Requirements by module

Each requirement has an id used in the acceptance tests.

### 4.1 Identity and access

- **ID-1** Staff, partners and dentists sign in with email and password. Patients sign in with mobile number and a one-time code.
- **ID-2** A user on a temporary password can do nothing except change it.
- **ID-3** Five wrong passwords lock the account for 15 minutes.
- **ID-4** Access is by role. A role is a set of permissions. Super Admin can change which permissions a role has.
- **ID-5** A user can create or change only users whose role is lower than their own.
- **ID-6** Three permissions are reserved for Super Admin and cannot be given to any other role: change roles, change system settings, delete records permanently.
- **ID-7** Every sign-in, user change, approval, price change and access change is written to an audit log that cannot be edited.

### 4.2 Onboarding

Onboarding is the last step of the lead pipeline (4.14). It starts when a lead is won.

- **ON-1** A won lead is one of three kinds: dentist, clinic or distributor. **Settled.**
- **ON-2** The lead owner attaches the documents (licence, registration, GST certificate) and submits the lead.
- **ON-3** A submitted lead is reviewed by the Sales head, then approved by Admin. Either can reject with a reason. **Settled.**
- **ON-4** Approving a dentist or clinic lead creates the clinic, the doctor and the dentist's login in one step. Approving a distributor lead creates the distributor account, with territory and billing details, and its first login. If any part fails, nothing is left half-made.
- **ON-5** Admin can also create a distributor directly, without a lead.
- **ON-6** A distributor sees only its own leads, clinics and dentists. Sales staff see only their own.
- **ON-7** Nobody reviews or approves a lead they own.

### 4.3 Masters

- **MA-1** Clinic is a record that is picked from a list. It is never typed on a case.
- **MA-2** A doctor can work at several clinics; a clinic can have several doctors.
- **MA-3** Each clinic is either direct (billed by the company) or belongs to one distributor.
- **MA-4** Products are a list (for example Classic). Each has a code.
- **MA-5** Price lists: one for direct dentists, one per distributor or a default distributor list, each in two versions: branded and white label. Prices have a start date; old prices are kept. **Separate white-label price list: settled.**
- **MA-6** Every clinic and every distributor has a default supply type: **Branded** (AVMAligners name on trays and packaging) or **White label** (plain, no brand at all). Admin sets it at onboarding. A distributor's default is copied to its clinics and can be changed per clinic. **Settled.**

### 4.4 Cases

- **CA-1** A dentist adds a patient: name, mobile, gender, date of birth, clinic (picked), optional clinic case number. The doctor is the signed-in dentist.
- **CA-2** For a patient under 18, a parent or guardian's name and mobile are required. See document 10.
- **CA-3** Clinical conditions are recorded as tick boxes plus notes. They are for reference and statistics, not instructions.
- **CA-4** A prescription records: chief complaint, product, expected upper aligners, expected lower aligners, midlines, canine and molar relationship, overbite, overjet, instructions per item, IPR, attachments, and per-tooth instructions using FDI tooth numbers. **Two aligner counts: settled.**
- **CA-5** A patient can have several plans. A refinement or rescan is a new plan. Numbering restarts at 1 and the remaining sets on the old plan are closed.
- **CA-6** A dentist sees only their own patients. Clinic staff see the patients of the dentist they work for.
- **CA-8** Each plan has a supply type, Branded or White label. It starts from the clinic's default and the dentist can change it on the prescription. It is fixed when the plan is approved. **Settled.**
- **CA-7** When a patient is added, the patient is invited to the app automatically. **Settled.**

### 4.5 Files

- **FI-1** Photos: four extraoral and five intraoral named slots, plus extra photos.
- **FI-2** X-rays: panoramic and lateral ceph slots. Videos. IPR file.
- **FI-3** STL scans are uploaded in the portal against the plan: upper, lower, bite. Email is no longer used. **Settled.**
- **FI-4** Files go straight from the browser to storage. The portal records who uploaded, when, and the size.
- **FI-5** STL scans sit in their own storage bucket. They move to low-cost storage 30 days after upload and are deleted 180 days after upload. **Settled: clock starts on upload.**
- **FI-6** The portal lists scans due for deletion in the next 14 days.
- **FI-7** An Admin can put a hold on a scan. A held scan is not deleted until the hold is lifted.
- **FI-8** When a scan is deleted the record stays, showing that it existed, who uploaded it and when it was removed.
- **FI-9** A file can be opened only by users who may see its case.

### 4.6 Treatment planning

- **TP-1** A planner sees cases waiting for a setup, downloads the scans and uploads the setup, the final upper and lower aligner counts and the IPR file.
- **TP-2** The dentist approves or rejects the setup. A rejection needs a reason and returns the case to the planner.
- **TP-3** Each revision is kept, with who and when.
- **TP-4** On approval the portal creates one row per aligner set, per arch, from the final counts, plus the retainer if included.

### 4.7 Production

- **PR-1** Every aligner set has a status: Planned, Ordered, Printed, QC Passed, Dispatched, Received. Side states: Rejected, Superseded, Cancelled.
- **PR-2** The manufacturing team raises every print order. Clinics do not. **Settled.**
- **PR-3** A print order is for one plan, a range of sets, and upper, lower or both.
- **PR-4** A print batch records date, machine, operator and model count, and the sets it contains.
- **PR-5** Quality check passes or rejects a batch or single sets. A rejected set goes back to Ordered with a reason. This is a reprint.
- **PR-6** Nobody types a patient name on the production side. Everything is picked.
- **PR-7** Every set carries its plan's supply type, and every production, quality check and dispatch screen shows it. A white-label set carries no AVMAligners marking on the tray.

### 4.8 Inventory

- **IN-1** Raw materials: items with unit, current stock, reorder level. Stock in, stock out against a batch, adjustments and wastage, each with who and when.
- **IN-2** Finished aligners: sets that are printed and checked but not yet dispatched, by clinic.
- **IN-3** Machines: a register of printers and other machines, with maintenance records and downtime records. **Settled.**
- **IN-5** Branded packaging and plain packaging are separate stock items.
- **IN-4** Low-stock list: items at or below reorder level.

### 4.9 Dispatch

- **DI-1** Sets go out in boxes. The manufacturing team sets how many sets go in each box, per plan.
- **DI-2** A dispatch records the sets, clinic, courier, tracking number and date.
- **DI-3** The clinic confirms receipt. The dentist or clinic staff records the date the patient starts set 1.
- **DI-4** Each plan has days per set and a start date. Every set gets a due-to-start date from these.
- **DI-5** Run-out date of a box = due-to-start date of its last set + days per set.
- **DI-6** Order-by date = run-out date − lead time. Lead time is one setting: print days + courier days + buffer.
- **DI-7** The due-to-order list shows plans whose order-by date has arrived, sorted by run-out date.
- **DI-8** A confirmed tray change that is early or late moves every later date.
- **DI-9** The last box carries the retainer where the plan includes one.
- **DI-10** A white-label box is packed in plain box and pouches, and its label carries no AVMAligners name: patient code, sets, clinic and dentist only. The partner adds its own branding.

### 4.10 Patient tracker (app)

- **PT-1** The patient sees the current set, days left, next change date and the whole schedule.
- **PT-2** The patient confirms each tray change, with a photo. The record is stamped with set number and date.
- **PT-3** The patient can record daily wear time.
- **PT-4** Reminders: tray change day, and a missed change.
- **PT-5** The dentist reviews check-in photos and marks continue, hold or rescan. A hold takes the plan off the due-to-order list. Rescan starts a new plan.
- **PT-6** The patient sees where the next box is.
- **PT-7** A patient sees only their own treatment. No prices are shown.

### 4.11 Billing

- **BI-1** For a clinic that belongs to a distributor, the company invoices the distributor. For a direct clinic, the company invoices the clinic. **Settled.**
- **BI-2** The invoice is raised when the dentist approves the treatment plan. **Assumed.**
- **BI-3** The price comes from the price list that applies on the approval date, for the plan's supply type (branded or white label).
- **BI-4** Accounts records payments: amount, date, mode, reference. Part payments are allowed.
- **BI-5** Direct dentists see the price and payment status of their cases. Distributor dentists do not. Distributors see their own invoices. **Settled.**
- **BI-6** The design leaves room for an online payment gateway and for offline collection through distributors. **Settled.**

### 4.12 Notifications

- **NO-1** Channels: WhatsApp, email, app notifications. **Settled.**
- **NO-2** Each event has a template per channel. Admin can switch an event on or off.
- **NO-3** Every message sent is logged with its result.

Events are listed in document 06.

### 4.13 Reports

- **RE-1** Clinic-wise sets: planned, ordered, printed, dispatched, received, pending.
- **RE-2** Print queue by needed-by date.
- **RE-3** Daily output by machine and operator.
- **RE-4** Stalled cases: plans with planned sets and no activity for six months.
- **RE-5** Reprints by reason.
- **RE-6** Stock and low stock. Machine downtime.
- **RE-7** Sales funnel: leads by stage, source, campaign and owner; cost per lead and per onboarded account; call and visit outcomes.
- **RE-8** Receivables: invoiced, paid, outstanding, by distributor and by direct clinic.
- **RE-9** Scan storage: space in use and scans due for deletion.
- **RE-10** Every report respects the viewer's access. A distributor's report shows only its own accounts.

### 4.14 Lead management

- **LM-1** A lead is a dentist, a clinic or a distributor. **Settled.**
- **LM-2** Leads arrive automatically from Meta, Google, Bing and TikTok lead forms, from website forms, from re-engagement campaigns and from LumenAI. They can also be imported from a file or entered by hand. **Settled.**
- **LM-3** Every lead keeps its source, campaign and ad details, and the date and time it arrived.
- **LM-4** A repeat enquiry from the same mobile number or email is added to the existing lead as a new touch. It does not create a second lead. **Assumed.**
- **LM-5** New leads are assigned by rule. The rule is a setting: by territory, in rotation, or by hand. **Open: which rule.**
- **LM-6** LumenAI qualifies a new lead and returns a score and an outcome. Its calls and WhatsApp conversations appear on the lead as activities, with summary, transcript and recording link. **Settled.**
- **LM-7** A BDE works a queue of assigned leads: calls from the lead screen, records the outcome, sets the next follow-up. Follow-ups that are due or missed are listed.
- **LM-8** A BDE hands a lead to field sales or direct sales. The full history goes with it.
- **LM-9** Field sales logs each visit: date, who was met, outcome, next step. No location stamp. **Settled.**
- **LM-10** Direct sales owns accounts. An account groups the leads, clinics and dentists of one large practice or chain.
- **LM-11** Stages: New, Qualified, Contacted, With sales, Won, In review, Approved, Onboarded. A lead can be marked Lost at any stage, with a reason, and re-opened later. **Assumed.**
- **LM-12** A lead who asks not to be called or messaged is marked, and every channel respects it.
- **LM-13** Marketing records spend by source and campaign. The portal shows cost per lead, per won lead and per onboarded account. **Open: spend pulled automatically or entered monthly.**
- **LM-14** Marketing sees all leads, read-only. BDE, field sales and direct sales see only the leads and accounts assigned to them. Exporting a lead list is logged.

### 4.15 Integrations

- **IG-1** One integrations service connects the portal to outside partners. Each partner has its own adapter: Meta, Google, Bing, TikTok, website forms, LumenAI, MCube, Exotel, WhatsApp Business. **Settled.**
- **IG-2** Everything a partner sends is stored as received, checked for a valid signature, processed once and shown in a log. A failed item can be retried.
- **IG-3** The portal sends to partners: a new lead to LumenAI for qualification, a call request to telephony, a template message to WhatsApp.
- **IG-4** Telephony (MCube, Exotel) and WhatsApp Business may be connected on the portal's side or on LumenAI's side. The choice is a setting per channel. Either way, a call or a message becomes an activity on the lead. **Open: which side.**
- **IG-5** A call record holds number, direction, start time, duration, outcome, who handled it and a link to the recording. The recording stays with the provider.
- **IG-6** Each partner has its own key with the least access it needs. A partner can write only to its own endpoint.
- **IG-7** Admin sees each connection's status, last activity and failures.
- **IG-8** If a partner is down, work on leads continues. Items wait and are sent when the partner is back.
- **IG-9** Messages to dentists and patients (4.12) use the same WhatsApp Business connection.

### 4.16 Extended modules (added in version 2.0)

All services in the services checklist (document 12) are in scope. **Settled.** The 179 services that were not in the earlier design are carried by fifteen new modules. Each requirement below keeps its checklist number.

| # | Module | What it is for | Phase |
|---|---|---|---|
| 4.17 | Partner management | Everything a distributor needs to run its business with the company: staff logins, dashboard, schemes, territory and reviews. | 6 |
| 4.18 | White-label branding | A partner's own brand applied to packaging, trays, the patient app, messages, the dentist portal and documents. | 6 |
| 4.19 | Store and asset library | Kits, consumables, retainers and marketing material ordered like a shop; approved assets to download. | 6 |
| 4.20 | Support desk and complaints | One desk for requests and complaints from every user, each with an owner and a deadline. | 6 |
| 4.21 | Finance extensions | Online payment, e-invoice, credit control, reminders, credit notes, payouts and patient finance. | 6 |
| 4.22 | Marketing automation | Tracking, conversions feedback, audiences, pages, journeys, events, referrals, patient leads, consent and attribution. | 7 |
| 4.23 | Calling workspace and AI playbooks | The BDE calling screen, call scoring, and every job LumenAI does as a switchable playbook. | 7 |
| 4.24 | Sales performance | Day planning, targets, incentives, account health, proposals, agreements, forecast and expenses. | 7 |
| 4.25 | Clinical extensions | 3D viewer, patient simulation, suitability check, scanner links, planner chat, preferences, consent, transfers and planning workload. | 8 |
| 4.26 | Patient engagement | Care guides, appointments, clinic chat, lost-tray requests, progress photos, retainer phase, fit check and ratings. | 8 |
| 4.27 | Logistics | Courier integration, scan-to-pack, delivery watch, returns, claims, manifests and pick-ups. | 8 |
| 4.28 | Manufacturing execution and quality system | Barcodes, stations, scheduling, lot traceability, machine effectiveness, non-conformance, documents and training. | 9 |
| 4.29 | Purchasing and costing | Requisition to goods receipt, supplier rating and cost per case. | 9 |
| 4.30 | Learning and knowledge | Courses, certificates, provider levels and the approved knowledge base used by people and by LumenAI. | 9 |
| 4.31 | Platform, privacy and management insight | Two-step sign-in, single sign-on, partner keys, privacy console, management dashboards and scheduled reports. | 10 |

### 4.17 Partner management

Everything a distributor needs to run its business with the company: staff logins, dashboard, schemes, territory and reviews.

- **DB-7** Logins for the distributor's own staff. Sales, accounts and support users with limited rights.
- **DB-8** Distributor dashboard. Cases, revenue, growth, clinics with no case in 60 days.
- **DB-12** Targets, slabs and schemes. Volume discounts and quarterly incentives tracked against targets.
- **DB-13** Margin report. Margin by clinic and product, if it records its own selling price.
- **DB-15** Company leads passed to the distributor. Marketing leads in its territory routed to it, with follow-up tracked.
- **DB-16** Territory protection. Alert when another channel touches a lead or clinic in its territory.
- **DB-23** Announcements with acknowledgement. Price changes, new products and policy notices.
- **DB-25** Quarterly business review. One-page review of volume, growth, payments and service levels.
- **DN-28** Provider tiers and loyalty. Volume-based pricing and benefits.

### 4.18 White-label branding

A partner's own brand applied to packaging, trays, the patient app, messages, the dentist portal and documents.

- **DW-5** Partner's own brand on packaging. Box, pouch and insert printed with the partner's artwork.
- **DW-6** Partner's brand or code on the tray. Laser marking of its name or case code.
- **DW-7** Partner-branded patient app. Its logo, colours and app name.
- **DW-8** Partner-branded patient messages. WhatsApp sender name and templates in its name.
- **DW-9** Partner-branded dentist portal. Its sub-domain, logo and colours for its dentists.
- **DW-10** Partner-branded documents. Treatment plan, setup link and reports on its letterhead.
- **DW-11** Partner's own product names. Its product tiers mapped to the company's products.
- **DW-12** Partner's price list and invoicing to its dentists. It bills its dentists from the portal.
- **DW-13** Artwork approval and brand asset library. Upload, proof, approve and version its artwork.
- **DW-14** Packaging stock held for the partner. Its printed packaging tracked with reorder alerts and minimum order.
- **DW-16** Confidentiality controls. AVMAligners name hidden at every touchpoint; non-disclosure agreement on record.
- **DW-17** Editable marketing templates. Unbranded brochures and creatives the partner can brand.
- **DW-18** Regulatory label check. Manufacturer details shown where the law requires them, agreed with the partner.

### 4.19 Store and asset library

Kits, consumables, retainers and marketing material ordered like a shop; approved assets to download.

- **DB-14** Marketing kit. Brochures, patient leaflets, social creatives, videos and standee artwork.
- **DB-18** Starter kits and consumables. Order sample aligners, typodonts, chewies, cases and display stands.
- **DB-19** Demo case and scan service booking. Ask for a sample case or a company scanner visit for a clinic.
- **DN-30** Clinic marketing kit. Posters, leaflets, social creatives and a smile-assessment link.
- **DN-31** Retainer and consumables reorder. One-tap reorder of retainers, chewies and cases.
- **MK-24** Asset library for partners. Approved creatives and documents with versions.

### 4.20 Support desk and complaints

One desk for requests and complaints from every user, each with an owner and a deadline.

- **DB-20** Requests on behalf of clinics. Refinement, replacement tray and complaint raised and tracked.
- **DB-21** Support desk with response times. Tickets with owner, deadline and escalation.
- **DN-34** Quality feedback per case. Fit and finish rating that reaches production.
- **AD-9** Support desk for all users. Tickets from dentists, distributors and patients with deadlines.
- **AD-10** Complaint handling. Each complaint linked to the case, batch and corrective action.

### 4.21 Finance extensions

Online payment, e-invoice, credit control, reminders, credit notes, payouts and patient finance.

- **DB-10** Credit limit and credit days. Limit, ageing alerts and an automatic hold when over the limit.
- **DB-11** Online payment. Pay invoices by UPI, net banking or card; receipt at once.
- **DB-22** Tax and ledger documents. GST e-invoice, e-way bill copies and ledger download.
- **DN-26** Patient finance options. Instalment plans offered through a finance partner.
- **DN-35** Online payment. Pay invoices online; receipt at once.
- **LU-16** Payment reminders. Polite calls and messages for overdue invoices.
- **AC-5** GST e-invoice and e-way bill. Generated from the portal.
- **AC-6** Accounting software export. To Tally or similar.
- **AC-7** Payment gateway and auto-reconciliation. Online payments matched to invoices.
- **AC-8** Payment reminders. Timed reminders before and after the due date.
- **AC-9** Credit notes and refunds. Linked to the original invoice.
- **AC-10** Credit hold. New cases paused for an account over its limit, with override.
- **AC-11** Incentive and commission payouts. Worked out from targets and schemes.

### 4.22 Marketing automation

Tracking, conversions feedback, audiences, pages, journeys, events, referrals, patient leads, consent and attribution.

- **DB-24** Events and webinars. Invite its dentists and see who registered and attended.
- **DN-29** Doctor locator and patient referrals. Listing on the brand site; patient leads routed to the clinic.
- **MK-9** Full tracking on every lead. UTM values, click identifiers, landing page and device.
- **MK-10** Conversions sent back to the ad platforms. Qualified, won and onboarded events returned to Meta and Google.
- **MK-11** Audience sync. Lists by stage for retargeting; onboarded and do-not-contact excluded.
- **MK-12** Landing page and form builder. Pages and forms that tag the source automatically.
- **MK-13** WhatsApp and email journeys. Broadcasts and timed sequences to segments.
- **MK-14** Webinar and event management. Registration, attendance and follow-up as lead activity.
- **MK-15** Referral programme. Doctor and patient referrals tracked to reward.
- **MK-16** Patient lead routing. Patient enquiries sent to the nearest partner clinic and tracked.
- **MK-17** Consent and preference centre. Opt-in record, do-not-disturb check and unsubscribe.
- **MK-18** Multi-touch attribution. Credit shared across the channels a lead touched.
- **MK-19** Return by campaign through to revenue. Cases and billing traced back to the campaign.
- **MK-20** Creative register link. Creative ID on each lead to compare creatives.
- **MK-21** Budget pacing alerts. Spend against plan, with alerts.
- **MK-22** Reviews, testimonials and satisfaction scores. Requests sent at the right moment and results collected.
- **MK-23** Market map. Onboarded clinics against potential by city and PIN code.

### 4.23 Calling workspace and AI playbooks

The BDE calling screen, call scoring, and every job LumenAI does as a switchable playbook.

- **BD-9** Speed-to-lead timer. First call within a set number of minutes, with alerts.
- **BD-10** Priority queue. Leads ordered by score and freshness.
- **BD-11** Call scripts and objection answers on screen. By lead type and stage.
- **BD-12** One-tap WhatsApp templates. Brochure, price list and meeting confirmation.
- **BD-13** Power dialling. The next lead is dialled automatically.
- **BD-14** Call recording playback and scoring. Recordings on the lead; calls scored for quality.
- **BD-15** Meeting booking for sales. Book a visit slot in the field person's calendar.
- **BD-16** Missed inbound call capture. A missed call becomes a lead or a callback.
- **BD-20** Attendance and talk-time report. Login hours, talk time and breaks.
- **LU-8** Instant first response, all hours. A new lead is contacted within a minute.
- **LU-9** Warm transfer to a BDE. A hot lead is passed live to a person.
- **LU-10** Visit booking. Books a slot in the field person's calendar.
- **LU-11** Re-engagement of lost and dormant leads. Timed campaigns by reason for loss.
- **LU-12** Several languages. Calls and messages in the lead's language.
- **LU-13** Onboarding reminders. Chases pending documents and unaccepted invitations.
- **LU-14** Dentist nudges. Setup waiting for approval, start date missing, box not confirmed.
- **LU-15** Patient reminders by voice. For a missed tray change.
- **LU-17** Feedback calls. After the first case and after treatment.
- **LU-18** Inbound answering for support. Answers common questions and opens a ticket.
- **LU-19** Conversation analytics. Objections, sentiment and reasons for loss.
- **LU-20** Approved knowledge only. Prices and answers come from an approved, versioned source.
- **LU-21** Human handover rules and audit. When the AI must stop; every AI message kept.
- **LU-22** Cost per qualified lead. AI cost set against results.

### 4.24 Sales performance

Day planning, targets, incentives, account health, proposals, agreements, forecast and expenses.

- **BD-17** Targets and leaderboard. Calls, connects and hand-overs against target.
- **BD-18** Incentive tracker. Earnings against hand-overs and onboarded accounts.
- **SL-9** Phone screens for sales. Day plan, leads, card scan and document capture.
- **SL-10** Territory and day planning. Planned visits in a sensible order for the day.
- **SL-11** Targets, achievement and incentives. By person, team and month.
- **SL-12** Account health score. Falling volume and silent clinics flagged early.
- **SL-13** First-case activation programme. Tracked help for a new dentist to send a case in 30 days.
- **SL-14** Proposal and quotation generator. Standard proposals with approved prices.
- **SL-15** Special price approval. A request and approval path for discounts.
- **SL-16** Agreement signed on screen. Partner agreement signed digitally and stored.
- **SL-17** Sample and demo kit tracking. Who holds which kit.
- **SL-18** Key account plans and reviews. Plan, contacts and quarterly review per account.
- **SL-19** Pipeline forecast. Expected onboardings and volume.
- **SL-20** Win and loss analysis. Reasons by source, territory and person.
- **SL-21** Doctor-to-doctor referrals. Referrals from existing dentists tracked.
- **SL-22** Expense claims. Travel and visit expenses against visits.
- **SL-23** Competitor notes. What other labs offer, recorded on the lead.

### 4.25 Clinical extensions

3D viewer, patient simulation, suitability check, scanner links, planner chat, preferences, consent, transfers and planning workload.

- **DN-13** Phone screens for the dentist. Approve, review, confirm a box and add a patient.
- **DN-16** 3D setup viewer in the browser. Movement by step, IPR and attachment chart, before and after.
- **DN-17** Treatment simulation to show the patient. A shareable link that helps the patient say yes.
- **DN-18** Case suitability check. Quick opinion from a planner before the full records are sent.
- **DN-19** Scanner integration. Scans arrive directly from the intraoral scanner's cloud.
- **DN-21** Talk to the treatment planner. Chat, call or a booked case discussion.
- **DN-22** Saved clinical preferences. The doctor's standing instructions applied to every case.
- **DN-23** Turnaround promise with live timers. Planning, production and dispatch times shown against target.
- **DN-24** Tracking alerts. A flag when photos or late changes suggest teeth are not tracking.
- **DN-25** Patient consent and estimate. Consent form signed on screen; treatment estimate for the patient.
- **DN-32** Group dashboard for multi-clinic practices. All clinics of a group in one view.
- **DN-33** Case transfer. Move a patient to another doctor or clinic with history.
- **TP-5** Work allocation and deadlines. Cases shared by load, with timers against target.
- **TP-6** Second review before sending. A senior planner checks difficult cases.
- **TP-7** Case difficulty grading. Simple, moderate, complex.
- **TP-8** Planning software link. Counts, IPR and attachments read from the setup file.
- **TP-9** Case library. Finished cases searchable by condition.

### 4.26 Patient engagement

Care guides, appointments, clinic chat, lost-tray requests, progress photos, retainer phase, fit check and ratings.

- **DN-14** Appointments and chat with patients. Visits tied to boxes and two-way chat.
- **DN-15** Lost or broken aligner handling. Patient reports, dentist decides, replacement printed.
- **PT-4** Care guides and questions. Short how-to guides and answers in the app.
- **PT-5** Appointments and clinic chat. Visit requests and two-way chat with the clinic.
- **PT-6** Lost or broken aligner request. Report a problem; the dentist decides; a replacement is made.
- **PT-7** Smile progress and refer a friend. Before-and-now photos and a referral to the clinic.
- **PT-8** Retainer phase. Wear plan and check dates after treatment.
- **PT-9** Photo check for fit. The app checks the tray-change photo and flags a poor fit.
- **PT-10** Streaks and rewards. Encouragement for wearing and changing on time.
- **PT-11** Satisfaction rating. A short rating mid-treatment and at the end.

### 4.27 Logistics

Courier integration, scan-to-pack, delivery watch, returns, claims, manifests and pick-ups.

- **DB-9** Box tracking for its clinics. Every dispatch to its clinics with courier status.
- **DW-15** Dispatch under the partner's name. Its name and return address on the shipment.
- **DN-20** Scan or impression pick-up booking. Book a scanner visit or a courier for impressions.
- **DP-8** Courier integration. Waybill, label, pick-up booking and live tracking.
- **DP-9** Courier choice by PIN code. Serviceability, speed and rate compared.
- **DP-10** Scan-to-pack check. Every tray scanned into its box against the plan.
- **DP-11** Packing photo. A photo of the packed box kept on the dispatch.
- **DP-12** Proof of delivery. Name, time and signature from the courier.
- **DP-13** Delivery deadline watch. Delays flagged against the patient's run-out date.
- **DP-14** Failed delivery and return handling. Re-attempt, return and re-dispatch tracked.
- **DP-15** Returns and replacement shipments. Linked to the original dispatch.
- **DP-16** Address check. PIN code and address validated before dispatch.
- **DP-17** Daily manifest. Hand-over sheet per courier with counts.
- **DP-18** Invoice and e-way bill in the box. Printed with the label where needed.
- **DP-19** Insurance and claims. Lost or damaged shipments claimed and tracked.
- **DP-20** Direct-to-patient delivery. Where the dentist allows it.
- **DP-21** Export shipments. Documents for dispatch outside India.
- **DP-22** Packing material use. Boxes and pouches deducted from stock automatically.

### 4.28 Manufacturing execution and quality system

Barcodes, stations, scheduling, lot traceability, machine effectiveness, non-conformance, documents and training.

- **MF-12** Barcode on every model and tray. Scanned at each station for full traceability.
- **MF-13** Station-wise tracking. Print, wash, cure, form, trim, polish, mark and pack.
- **MF-14** Scheduling board. Batches suggested by due date and machine capacity.
- **MF-15** Printer integration. Job status read from the printer automatically.
- **MF-16** File preparation queue. Model files staged and checked before printing.
- **MF-17** Material lot traceability. Which lot went into which patient's set, for recall.
- **MF-18** Machine effectiveness. Availability, speed and quality per machine.
- **MF-19** Preventive maintenance calendar. Planned service with reminders.
- **MF-22** Operator productivity and shifts. Output per operator; shift planning.
- **MF-23** Work instructions on screen. Standard procedure at each station; training records.
- **MF-24** Non-conformance and corrective action. Each defect logged, investigated and closed.
- **MF-25** Calibration records. Instruments and machines with due dates.
- **MF-26** Regulatory document control. Device history record and controlled documents for audit.
- **MF-27** Rush lane. Priority cases marked and tracked separately.
- **MF-28** Waste and energy tracking. Material waste and power use by month.
- **QC-3** Checklists with photos. Fit, trim, clarity and marking per set.
- **QC-4** Final pack audit. A sample of packed boxes re-checked.
- **QC-5** Defect trend alerts. A rising defect on a machine or lot raises an alert.

### 4.29 Purchasing and costing

Requisition to goods receipt, supplier rating and cost per case.

- **MF-20** Purchasing. Requisition, purchase order, goods receipt and supplier rating.
- **MF-21** Cost per case. Material, machine time and labour per case.

### 4.30 Learning and knowledge

Courses, certificates, provider levels and the approved knowledge base used by people and by LumenAI.

- **DB-17** Training and certification. Courses, quizzes and certificates for its staff and its dentists.
- **DN-27** Education and certification. Courses, webinars, case gallery and provider levels.
- **BD-19** Knowledge base. Products, prices, policies and answers.

### 4.31 Platform, privacy and management insight

Two-step sign-in, single sign-on, partner keys, privacy console, management dashboards and scheduled reports.

- **DN-36** My practice reports. Cases, turnaround, refinement rate and export of own data.
- **AD-6** Two-step sign-in and single sign-on. For staff accounts.
- **AD-7** Privacy console. Consent log, data requests, deletion requests and breach register.
- **AD-8** Partner API keys and test environment. For scanner, courier and partner systems.
- **AD-11** Management dashboard. Volume, revenue, turnaround, quality and receivables on one page.
- **AD-12** Capacity against demand forecast. Pending sets and new cases against print capacity.
- **AD-13** Unit economics. Margin by product, channel and supply type.
- **AD-14** Scheduled reports by email. Daily and weekly reports sent automatically.

## 5. Brand and language

- Product name: **AVMAligners**. **Settled.**
- Aligners are sold either under the AVMAligners brand or as white label. White label means plain: no brand on trays, box, pouch or label. **Settled.**
- On a white-label case the patient app and patient messages carry no brand: a neutral theme, the app name "My Aligners", and messages signed by the clinic only. **Settled.**
- English only in the first version. **Assumed.**
- Dates are shown as DD-MM-YYYY. Amounts in rupees with Indian digit grouping.
