# 12 — Services checklist

Every service the portal offers, by who receives it. **All 268 are ticked and all are now in the design.** **Settled.**

| Status | Meaning | Count |
|---|---|---|
| Core design | In the design before version 2.0, built in phases 1 to 5 and the sales track | 89 |
| Added in 2.0 | Added to the design in version 2.0, built in phases 6 to 10. The module and phase are shown | 179 |

A team that wants to drop a service still strikes it out here; the business owner then removes it from the phase.

## Summary

| # | For | Services | Core design | Added in 2.0 |
|---|---|---|---|---|
| 12.1 | Distributors reselling AVMAligners (branded) | 25 | 6 | 19 |
| 12.2 | Distributors reselling white label | 18 | 4 | 14 |
| 12.3 | Dentists and clinic staff | 36 | 12 | 24 |
| 12.4 | Marketing | 24 | 8 | 16 |
| 12.5 | BDE team | 20 | 8 | 12 |
| 12.6 | LumenAI | 22 | 7 | 15 |
| 12.7 | Sales team | 23 | 8 | 15 |
| 12.8 | Manufacturing team | 28 | 11 | 17 |
| 12.9 | Dispatch team | 22 | 7 | 15 |
| 12.10 | Other teams: treatment planning | 9 | 4 | 5 |
| 12.11 | Other teams: quality check | 5 | 2 | 3 |
| 12.12 | Other teams: accounts | 11 | 4 | 7 |
| 12.13 | Other teams: admin, support and management | 14 | 5 | 9 |
| 12.14 | Patients | 11 | 3 | 8 |
| | **Total** | **268** | **89** | **179** |

## 12.1 Distributors reselling AVMAligners (branded)

A distributor buys from the company and resells to its own dentists under the AVMAligners name.

| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | DB-1 | Own login, scoped to its territory | Sees only its own leads, clinics, dentists and invoices | Core | STD |
| [x] | DB-2 | Lead management | Adds and works leads for dentists and clinics in its territory | Core | STD |
| [x] | DB-3 | Onboarding of dentists and clinics | Submits won leads with documents; Sales head and Admin approve | Core | STD |
| [x] | DB-4 | My dentists and clinics | Accounts it onboarded with active case counts, no clinical data | Core | STD |
| [x] | DB-5 | Invoices, payments and balance | Own invoices with status and statement download | Core | STD |
| [x] | DB-6 | Branded price list | Its own prices with effective dates | Core | STD |
| [x] | DB-7 | Logins for the distributor's own staff | Sales, accounts and support users with limited rights | Partner management · phase 6 | STN |
| [x] | DB-8 | Distributor dashboard | Cases, revenue, growth, clinics with no case in 60 days | Partner management · phase 6 | STN |
| [x] | DB-9 | Box tracking for its clinics | Every dispatch to its clinics with courier status | Logistics · phase 8 | STN |
| [x] | DB-10 | Credit limit and credit days | Limit, ageing alerts and an automatic hold when over the limit | Finance extensions · phase 6 | STN |
| [x] | DB-11 | Online payment | Pay invoices by UPI, net banking or card; receipt at once | Finance extensions · phase 6 | STN |
| [x] | DB-12 | Targets, slabs and schemes | Volume discounts and quarterly incentives tracked against targets | Partner management · phase 6 | STN |
| [x] | DB-13 | Margin report | Margin by clinic and product, if it records its own selling price | Partner management · phase 6 | STN |
| [x] | DB-14 | Marketing kit | Brochures, patient leaflets, social creatives, videos and standee artwork | Store and asset library · phase 6 | STN |
| [x] | DB-15 | Company leads passed to the distributor | Marketing leads in its territory routed to it, with follow-up tracked | Partner management · phase 6 | STN |
| [x] | DB-16 | Territory protection | Alert when another channel touches a lead or clinic in its territory | Partner management · phase 6 | STN |
| [x] | DB-17 | Training and certification | Courses, quizzes and certificates for its staff and its dentists | Learning and knowledge · phase 9 | STN |
| [x] | DB-18 | Starter kits and consumables | Order sample aligners, typodonts, chewies, cases and display stands | Store and asset library · phase 6 | STN |
| [x] | DB-19 | Demo case and scan service booking | Ask for a sample case or a company scanner visit for a clinic | Store and asset library · phase 6 | STN |
| [x] | DB-20 | Requests on behalf of clinics | Refinement, replacement tray and complaint raised and tracked | Support desk and complaints · phase 6 | STN |
| [x] | DB-21 | Support desk with response times | Tickets with owner, deadline and escalation | Support desk and complaints · phase 6 | STN |
| [x] | DB-22 | Tax and ledger documents | GST e-invoice, e-way bill copies and ledger download | Finance extensions · phase 6 | STN |
| [x] | DB-23 | Announcements with acknowledgement | Price changes, new products and policy notices | Partner management · phase 6 | STN |
| [x] | DB-24 | Events and webinars | Invite its dentists and see who registered and attended | Marketing automation · phase 7 | STN |
| [x] | DB-25 | Quarterly business review | One-page review of volume, growth, payments and service levels | Partner management · phase 6 | STN |

## 12.2 Distributors reselling white label

Everything in the branded list applies. These are the extra services for a partner selling under no brand or its own brand.

| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | DW-1 | Plain supply | No brand on trays, box, pouch or label | Core | STD |
| [x] | DW-2 | White-label price list | Separate prices for white-label supply | Core | STD |
| [x] | DW-3 | Neutral patient app and messages | App named "My Aligners"; messages signed by the clinic only | Core | STD |
| [x] | DW-4 | Supply type per account and per case | Default on the account, changeable on each case until approval | Core | STD |
| [x] | DW-5 | Partner's own brand on packaging | Box, pouch and insert printed with the partner's artwork | White-label branding · phase 6 | STN |
| [x] | DW-6 | Partner's brand or code on the tray | Laser marking of its name or case code | White-label branding · phase 6 | STN |
| [x] | DW-7 | Partner-branded patient app | Its logo, colours and app name | White-label branding · phase 6 | STN |
| [x] | DW-8 | Partner-branded patient messages | WhatsApp sender name and templates in its name | White-label branding · phase 6 | STN |
| [x] | DW-9 | Partner-branded dentist portal | Its sub-domain, logo and colours for its dentists | White-label branding · phase 6 | STN |
| [x] | DW-10 | Partner-branded documents | Treatment plan, setup link and reports on its letterhead | White-label branding · phase 6 | STN |
| [x] | DW-11 | Partner's own product names | Its product tiers mapped to the company's products | White-label branding · phase 6 | STN |
| [x] | DW-12 | Partner's price list and invoicing to its dentists | It bills its dentists from the portal | White-label branding · phase 6 | STN |
| [x] | DW-13 | Artwork approval and brand asset library | Upload, proof, approve and version its artwork | White-label branding · phase 6 | STN |
| [x] | DW-14 | Packaging stock held for the partner | Its printed packaging tracked with reorder alerts and minimum order | White-label branding · phase 6 | STN |
| [x] | DW-15 | Dispatch under the partner's name | Its name and return address on the shipment | Logistics · phase 8 | STN |
| [x] | DW-16 | Confidentiality controls | AVMAligners name hidden at every touchpoint; non-disclosure agreement on record | White-label branding · phase 6 | STN |
| [x] | DW-17 | Editable marketing templates | Unbranded brochures and creatives the partner can brand | White-label branding · phase 6 | STN |
| [x] | DW-18 | Regulatory label check | Manufacturer details shown where the law requires them, agreed with the partner | White-label branding · phase 6 | STN |

## 12.3 Dentists and clinic staff

Direct dentists and the dentists of distributors.

| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | DN-1 | Add patient with automatic app invitation | Guardian details for a patient under 18 | Core | STD |
| [x] | DN-2 | Digital prescription | Conditions, expected counts, supply type and FDI tooth chart | Core | STD |
| [x] | DN-3 | Records upload in the portal | Photos, x-rays, videos and STL scans; no email | Core | STD |
| [x] | DN-4 | Setup review and approval | Versions, final counts, approve or reject with reason | Core | STD |
| [x] | DN-5 | Refinement and rescan plans | A new plan that supersedes the old one | Core | STD |
| [x] | DN-6 | Treatment schedule and dispatch clock | Due dates per set; next box ordered automatically in time | Core | STD |
| [x] | DN-7 | Box tracking and receipt confirmation | Courier, tracking and start date | Core | STD |
| [x] | DN-8 | Patient check-in review | Photos by set; continue, hold or rescan | Core | STD |
| [x] | DN-9 | Scan retention notices | Told before a scan is deleted at 180 days | Core | STD |
| [x] | DN-10 | Invoices for direct clinics | Own invoices, payments and balance | Core | STD |
| [x] | DN-11 | Clinic staff logins | Staff work for the dentist with fewer rights | Core | STD |
| [x] | DN-12 | Notifications on WhatsApp, email and app | Setup ready, box dispatched, check-in, start date missing | Core | STD |
| [x] | DN-13 | Phone screens for the dentist | Approve, review, confirm a box and add a patient | Clinical extensions · phase 8 | STN |
| [x] | DN-14 | Appointments and chat with patients | Visits tied to boxes and two-way chat | Patient engagement · phase 8 | STN |
| [x] | DN-15 | Lost or broken aligner handling | Patient reports, dentist decides, replacement printed | Patient engagement · phase 8 | STN |
| [x] | DN-16 | 3D setup viewer in the browser | Movement by step, IPR and attachment chart, before and after | Clinical extensions · phase 8 | STN |
| [x] | DN-17 | Treatment simulation to show the patient | A shareable link that helps the patient say yes | Clinical extensions · phase 8 | STN |
| [x] | DN-18 | Case suitability check | Quick opinion from a planner before the full records are sent | Clinical extensions · phase 8 | STN |
| [x] | DN-19 | Scanner integration | Scans arrive directly from the intraoral scanner's cloud | Clinical extensions · phase 8 | STN |
| [x] | DN-20 | Scan or impression pick-up booking | Book a scanner visit or a courier for impressions | Logistics · phase 8 | STN |
| [x] | DN-21 | Talk to the treatment planner | Chat, call or a booked case discussion | Clinical extensions · phase 8 | STN |
| [x] | DN-22 | Saved clinical preferences | The doctor's standing instructions applied to every case | Clinical extensions · phase 8 | STN |
| [x] | DN-23 | Turnaround promise with live timers | Planning, production and dispatch times shown against target | Clinical extensions · phase 8 | STN |
| [x] | DN-24 | Tracking alerts | A flag when photos or late changes suggest teeth are not tracking | Clinical extensions · phase 8 | STN |
| [x] | DN-25 | Patient consent and estimate | Consent form signed on screen; treatment estimate for the patient | Clinical extensions · phase 8 | STN |
| [x] | DN-26 | Patient finance options | Instalment plans offered through a finance partner | Finance extensions · phase 6 | STN |
| [x] | DN-27 | Education and certification | Courses, webinars, case gallery and provider levels | Learning and knowledge · phase 9 | STN |
| [x] | DN-28 | Provider tiers and loyalty | Volume-based pricing and benefits | Partner management · phase 6 | STN |
| [x] | DN-29 | Doctor locator and patient referrals | Listing on the brand site; patient leads routed to the clinic | Marketing automation · phase 7 | STN |
| [x] | DN-30 | Clinic marketing kit | Posters, leaflets, social creatives and a smile-assessment link | Store and asset library · phase 6 | STN |
| [x] | DN-31 | Retainer and consumables reorder | One-tap reorder of retainers, chewies and cases | Store and asset library · phase 6 | STN |
| [x] | DN-32 | Group dashboard for multi-clinic practices | All clinics of a group in one view | Clinical extensions · phase 8 | STN |
| [x] | DN-33 | Case transfer | Move a patient to another doctor or clinic with history | Clinical extensions · phase 8 | STN |
| [x] | DN-34 | Quality feedback per case | Fit and finish rating that reaches production | Support desk and complaints · phase 6 | STN |
| [x] | DN-35 | Online payment | Pay invoices online; receipt at once | Finance extensions · phase 6 | STN |
| [x] | DN-36 | My practice reports | Cases, turnaround, refinement rate and export of own data | Platform, privacy and management insight · phase 10 | STN |

## 12.4 Marketing

Lead generation through Meta, Google, Bing, TikTok, re-engagement and other channels.

| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | MK-1 | Lead capture from ad platforms and forms | Meta, Google, Bing, TikTok, website forms | Core | STD |
| [x] | MK-2 | Lead import by file | Events, old sheets and re-engagement lists | Core | STD |
| [x] | MK-3 | Duplicate merge | A repeat enquiry joins the existing lead | Core | STD |
| [x] | MK-4 | Sources and campaigns | Each campaign with leads, won and onboarded | Core | STD |
| [x] | MK-5 | Spend, pulled or entered | Monthly spend by campaign | Core | STD |
| [x] | MK-6 | Cost per lead, per won lead and per onboarded account | On the marketing dashboard | Core | STD |
| [x] | MK-7 | Lead quality by LumenAI score | Quality by source and campaign | Core | STD |
| [x] | MK-8 | Integration status | Each partner's health and failed items | Core | STD |
| [x] | MK-9 | Full tracking on every lead | UTM values, click identifiers, landing page and device | Marketing automation · phase 7 | STN |
| [x] | MK-10 | Conversions sent back to the ad platforms | Qualified, won and onboarded events returned to Meta and Google | Marketing automation · phase 7 | STN |
| [x] | MK-11 | Audience sync | Lists by stage for retargeting; onboarded and do-not-contact excluded | Marketing automation · phase 7 | STN |
| [x] | MK-12 | Landing page and form builder | Pages and forms that tag the source automatically | Marketing automation · phase 7 | STN |
| [x] | MK-13 | WhatsApp and email journeys | Broadcasts and timed sequences to segments | Marketing automation · phase 7 | STN |
| [x] | MK-14 | Webinar and event management | Registration, attendance and follow-up as lead activity | Marketing automation · phase 7 | STN |
| [x] | MK-15 | Referral programme | Doctor and patient referrals tracked to reward | Marketing automation · phase 7 | STN |
| [x] | MK-16 | Patient lead routing | Patient enquiries sent to the nearest partner clinic and tracked | Marketing automation · phase 7 | STN |
| [x] | MK-17 | Consent and preference centre | Opt-in record, do-not-disturb check and unsubscribe | Marketing automation · phase 7 | STN |
| [x] | MK-18 | Multi-touch attribution | Credit shared across the channels a lead touched | Marketing automation · phase 7 | STN |
| [x] | MK-19 | Return by campaign through to revenue | Cases and billing traced back to the campaign | Marketing automation · phase 7 | STN |
| [x] | MK-20 | Creative register link | Creative ID on each lead to compare creatives | Marketing automation · phase 7 | STN |
| [x] | MK-21 | Budget pacing alerts | Spend against plan, with alerts | Marketing automation · phase 7 | STN |
| [x] | MK-22 | Reviews, testimonials and satisfaction scores | Requests sent at the right moment and results collected | Marketing automation · phase 7 | STN |
| [x] | MK-23 | Market map | Onboarded clinics against potential by city and PIN code | Marketing automation · phase 7 | STN |
| [x] | MK-24 | Asset library for partners | Approved creatives and documents with versions | Store and asset library · phase 6 | STN |

## 12.5 BDE team

The team that calls and engages leads.

| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | BD-1 | Personal lead queue | Leads assigned by rule, by stage | Core | STD |
| [x] | BD-2 | Lead timeline | Every call, WhatsApp conversation, visit and note | Core | STD |
| [x] | BD-3 | Click to call | Through MCube or Exotel, logged automatically | Core | STD |
| [x] | BD-4 | Call outcome and notes | Recorded straight after the call | Core | STD |
| [x] | BD-5 | Follow-ups | Due and missed lists with reminders | Core | STD |
| [x] | BD-6 | Hand over to sales | With history and a note | Core | STD |
| [x] | BD-7 | Mark lost and do-not-contact | With a reason; can be re-opened | Core | STD |
| [x] | BD-8 | LumenAI summary on the lead | Score and conversation summary before the call | Core | STD |
| [x] | BD-9 | Speed-to-lead timer | First call within a set number of minutes, with alerts | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | BD-10 | Priority queue | Leads ordered by score and freshness | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | BD-11 | Call scripts and objection answers on screen | By lead type and stage | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | BD-12 | One-tap WhatsApp templates | Brochure, price list and meeting confirmation | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | BD-13 | Power dialling | The next lead is dialled automatically | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | BD-14 | Call recording playback and scoring | Recordings on the lead; calls scored for quality | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | BD-15 | Meeting booking for sales | Book a visit slot in the field person's calendar | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | BD-16 | Missed inbound call capture | A missed call becomes a lead or a callback | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | BD-17 | Targets and leaderboard | Calls, connects and hand-overs against target | Sales performance · phase 7 | STN |
| [x] | BD-18 | Incentive tracker | Earnings against hand-overs and onboarded accounts | Sales performance · phase 7 | STN |
| [x] | BD-19 | Knowledge base | Products, prices, policies and answers | Learning and knowledge · phase 9 | STN |
| [x] | BD-20 | Attendance and talk-time report | Login hours, talk time and breaks | Calling workspace and AI playbooks · phase 7 | STN |

## 12.6 LumenAI

The AI partner for calling, WhatsApp and qualification.

| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | LU-1 | AI calling and follow-up | Outbound calls to new leads | Core | STD |
| [x] | LU-2 | WhatsApp conversations | Two-way conversations logged on the lead | Core | STD |
| [x] | LU-3 | Lead qualification | Score, outcome and summary returned to the portal | Core | STD |
| [x] | LU-4 | Activities on the lead timeline | Every AI call and message visible to people | Core | STD |
| [x] | LU-5 | Telephony and WhatsApp side setting | On the portal's side or LumenAI's side | Core | STD |
| [x] | LU-6 | Do-not-contact respected | Skipped by every channel | Core | STD |
| [x] | LU-7 | Failed item replay | Failed messages and events can be re-run | Core | STD |
| [x] | LU-8 | Instant first response, all hours | A new lead is contacted within a minute | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-9 | Warm transfer to a BDE | A hot lead is passed live to a person | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-10 | Visit booking | Books a slot in the field person's calendar | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-11 | Re-engagement of lost and dormant leads | Timed campaigns by reason for loss | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-12 | Several languages | Calls and messages in the lead's language | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-13 | Onboarding reminders | Chases pending documents and unaccepted invitations | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-14 | Dentist nudges | Setup waiting for approval, start date missing, box not confirmed | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-15 | Patient reminders by voice | For a missed tray change | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-16 | Payment reminders | Polite calls and messages for overdue invoices | Finance extensions · phase 6 | STN |
| [x] | LU-17 | Feedback calls | After the first case and after treatment | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-18 | Inbound answering for support | Answers common questions and opens a ticket | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-19 | Conversation analytics | Objections, sentiment and reasons for loss | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-20 | Approved knowledge only | Prices and answers come from an approved, versioned source | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-21 | Human handover rules and audit | When the AI must stop; every AI message kept | Calling workspace and AI playbooks · phase 7 | STN |
| [x] | LU-22 | Cost per qualified lead | AI cost set against results | Calling workspace and AI playbooks · phase 7 | STN |

## 12.7 Sales team

Field sales, direct sales and the Sales head.

| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | SL-1 | Lead queue for sales | Leads handed over with full history | Core | STD |
| [x] | SL-2 | Visit logging with outcome | Who was met, outcome and next step | Core | STD |
| [x] | SL-3 | Direct sales accounts | Clinics, dentists and leads grouped under one account | Core | STD |
| [x] | SL-4 | Onboarding submission | Documents and details for approval | Core | STD |
| [x] | SL-5 | Sales head review | First of two approval steps | Core | STD |
| [x] | SL-6 | Assignment rules | By territory, in rotation or by hand | Core | STD |
| [x] | SL-7 | Calling dashboard and sales funnel | Results by person and by distributor | Core | STD |
| [x] | SL-8 | My dentists and clinics | Onboarded accounts with case counts | Core | STD |
| [x] | SL-9 | Phone screens for sales | Day plan, leads, card scan and document capture | Sales performance · phase 7 | STN |
| [x] | SL-10 | Territory and day planning | Planned visits in a sensible order for the day | Sales performance · phase 7 | STN |
| [x] | SL-11 | Targets, achievement and incentives | By person, team and month | Sales performance · phase 7 | STN |
| [x] | SL-12 | Account health score | Falling volume and silent clinics flagged early | Sales performance · phase 7 | STN |
| [x] | SL-13 | First-case activation programme | Tracked help for a new dentist to send a case in 30 days | Sales performance · phase 7 | STN |
| [x] | SL-14 | Proposal and quotation generator | Standard proposals with approved prices | Sales performance · phase 7 | STN |
| [x] | SL-15 | Special price approval | A request and approval path for discounts | Sales performance · phase 7 | STN |
| [x] | SL-16 | Agreement signed on screen | Partner agreement signed digitally and stored | Sales performance · phase 7 | STN |
| [x] | SL-17 | Sample and demo kit tracking | Who holds which kit | Sales performance · phase 7 | STN |
| [x] | SL-18 | Key account plans and reviews | Plan, contacts and quarterly review per account | Sales performance · phase 7 | STN |
| [x] | SL-19 | Pipeline forecast | Expected onboardings and volume | Sales performance · phase 7 | STN |
| [x] | SL-20 | Win and loss analysis | Reasons by source, territory and person | Sales performance · phase 7 | STN |
| [x] | SL-21 | Doctor-to-doctor referrals | Referrals from existing dentists tracked | Sales performance · phase 7 | STN |
| [x] | SL-22 | Expense claims | Travel and visit expenses against visits | Sales performance · phase 7 | STN |
| [x] | SL-23 | Competitor notes | What other labs offer, recorded on the lead | Sales performance · phase 7 | STN |

## 12.8 Manufacturing team

The team that raises print orders and makes the aligners.

| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | MF-1 | New plans queue | Approved plans with box size to set | Core | STD |
| [x] | MF-2 | Due-to-order list | The next box for each patient, by run-out date | Core | STD |
| [x] | MF-3 | Print orders | By plan, arch and set range; only this team raises them | Core | STD |
| [x] | MF-4 | Print batches | Machine, operator, models and materials | Core | STD |
| [x] | MF-5 | Quality check and reprints | Pass or reject per set with reason | Core | STD |
| [x] | MF-6 | Plan production view | Every set with its history; replaces the print register | Core | STD |
| [x] | MF-7 | Raw material stock | Receipts, use, wastage, adjustments and low-stock list | Core | STD |
| [x] | MF-8 | Finished stock | Printed sets waiting to be dispatched | Core | STD |
| [x] | MF-9 | Machine register | Maintenance and downtime; no batch on a machine that is down | Core | STD |
| [x] | MF-10 | Supply type on every screen | Branded or white label | Core | STD |
| [x] | MF-11 | Production reports | Print queue, daily output, reprints and downtime | Core | STD |
| [x] | MF-12 | Barcode on every model and tray | Scanned at each station for full traceability | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-13 | Station-wise tracking | Print, wash, cure, form, trim, polish, mark and pack | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-14 | Scheduling board | Batches suggested by due date and machine capacity | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-15 | Printer integration | Job status read from the printer automatically | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-16 | File preparation queue | Model files staged and checked before printing | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-17 | Material lot traceability | Which lot went into which patient's set, for recall | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-18 | Machine effectiveness | Availability, speed and quality per machine | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-19 | Preventive maintenance calendar | Planned service with reminders | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-20 | Purchasing | Requisition, purchase order, goods receipt and supplier rating | Purchasing and costing · phase 9 | STN |
| [x] | MF-21 | Cost per case | Material, machine time and labour per case | Purchasing and costing · phase 9 | STN |
| [x] | MF-22 | Operator productivity and shifts | Output per operator; shift planning | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-23 | Work instructions on screen | Standard procedure at each station; training records | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-24 | Non-conformance and corrective action | Each defect logged, investigated and closed | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-25 | Calibration records | Instruments and machines with due dates | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-26 | Regulatory document control | Device history record and controlled documents for audit | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-27 | Rush lane | Priority cases marked and tracked separately | Manufacturing execution and quality system · phase 9 | STN |
| [x] | MF-28 | Waste and energy tracking | Material waste and power use by month | Manufacturing execution and quality system · phase 9 | STN |

## 12.9 Dispatch team

Packing, labels, courier and delivery.

| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | DP-1 | Ready-to-dispatch list | QC-passed sets grouped by plan and clinic | Core | STD |
| [x] | DP-2 | Box label | Patient code, sets and clinic; plain for white label; no phone number | Core | STD |
| [x] | DP-3 | Courier and tracking record | Entered on each dispatch | Core | STD |
| [x] | DP-4 | Dispatch list | Status and receipt for every box | Core | STD |
| [x] | DP-5 | Receipt confirmation by the clinic | With the patient's start date | Core | STD |
| [x] | DP-6 | Run-out and order-by dates | Worked out on every dispatch | Core | STD |
| [x] | DP-7 | Automatic notice to dentist and patient | On dispatch | Core | STD |
| [x] | DP-8 | Courier integration | Waybill, label, pick-up booking and live tracking | Logistics · phase 8 | STN |
| [x] | DP-9 | Courier choice by PIN code | Serviceability, speed and rate compared | Logistics · phase 8 | STN |
| [x] | DP-10 | Scan-to-pack check | Every tray scanned into its box against the plan | Logistics · phase 8 | STN |
| [x] | DP-11 | Packing photo | A photo of the packed box kept on the dispatch | Logistics · phase 8 | STN |
| [x] | DP-12 | Proof of delivery | Name, time and signature from the courier | Logistics · phase 8 | STN |
| [x] | DP-13 | Delivery deadline watch | Delays flagged against the patient's run-out date | Logistics · phase 8 | STN |
| [x] | DP-14 | Failed delivery and return handling | Re-attempt, return and re-dispatch tracked | Logistics · phase 8 | STN |
| [x] | DP-15 | Returns and replacement shipments | Linked to the original dispatch | Logistics · phase 8 | STN |
| [x] | DP-16 | Address check | PIN code and address validated before dispatch | Logistics · phase 8 | STN |
| [x] | DP-17 | Daily manifest | Hand-over sheet per courier with counts | Logistics · phase 8 | STN |
| [x] | DP-18 | Invoice and e-way bill in the box | Printed with the label where needed | Logistics · phase 8 | STN |
| [x] | DP-19 | Insurance and claims | Lost or damaged shipments claimed and tracked | Logistics · phase 8 | STN |
| [x] | DP-20 | Direct-to-patient delivery | Where the dentist allows it | Logistics · phase 8 | STN |
| [x] | DP-21 | Export shipments | Documents for dispatch outside India | Logistics · phase 8 | STN |
| [x] | DP-22 | Packing material use | Boxes and pouches deducted from stock automatically | Logistics · phase 8 | STN |

## 12.10 Other teams: treatment planning



| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | TP-1 | Planning queue | Oldest first, with a flag for records to follow | Core | STD |
| [x] | TP-2 | Case workbench | Prescription and records; setup, IPR and final counts upload | Core | STD |
| [x] | TP-3 | Setup versions | Each upload kept; dentist's reasons visible | Core | STD |
| [x] | TP-4 | My cases and scans expiring | Waiting on the dentist; scans due for deletion | Core | STD |
| [x] | TP-5 | Work allocation and deadlines | Cases shared by load, with timers against target | Clinical extensions · phase 8 | STN |
| [x] | TP-6 | Second review before sending | A senior planner checks difficult cases | Clinical extensions · phase 8 | STN |
| [x] | TP-7 | Case difficulty grading | Simple, moderate, complex | Clinical extensions · phase 8 | STN |
| [x] | TP-8 | Planning software link | Counts, IPR and attachments read from the setup file | Clinical extensions · phase 8 | STN |
| [x] | TP-9 | Case library | Finished cases searchable by condition | Clinical extensions · phase 8 | STN |

## 12.11 Other teams: quality check



| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | QC-1 | Pass or reject per set | With reason; a reject is a reprint | Core | STD |
| [x] | QC-2 | Reprint report | By reason and machine | Core | STD |
| [x] | QC-3 | Checklists with photos | Fit, trim, clarity and marking per set | Manufacturing execution and quality system · phase 9 | STN |
| [x] | QC-4 | Final pack audit | A sample of packed boxes re-checked | Manufacturing execution and quality system · phase 9 | STN |
| [x] | QC-5 | Defect trend alerts | A rising defect on a machine or lot raises an alert | Manufacturing execution and quality system · phase 9 | STN |

## 12.12 Other teams: accounts



| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | AC-1 | Automatic invoice on plan approval | To the distributor or the direct clinic | Core | STD |
| [x] | AC-2 | Price lists by customer type and supply type | With effective dates | Core | STD |
| [x] | AC-3 | Payments and receivables ageing | Part payments allowed | Core | STD |
| [x] | AC-4 | Cancel and re-issue | Invoices are never edited or deleted | Core | STD |
| [x] | AC-5 | GST e-invoice and e-way bill | Generated from the portal | Finance extensions · phase 6 | STN |
| [x] | AC-6 | Accounting software export | To Tally or similar | Finance extensions · phase 6 | STN |
| [x] | AC-7 | Payment gateway and auto-reconciliation | Online payments matched to invoices | Finance extensions · phase 6 | STN |
| [x] | AC-8 | Payment reminders | Timed reminders before and after the due date | Finance extensions · phase 6 | STN |
| [x] | AC-9 | Credit notes and refunds | Linked to the original invoice | Finance extensions · phase 6 | STN |
| [x] | AC-10 | Credit hold | New cases paused for an account over its limit, with override | Finance extensions · phase 6 | STN |
| [x] | AC-11 | Incentive and commission payouts | Worked out from targets and schemes | Finance extensions · phase 6 | STN |

## 12.13 Other teams: admin, support and management



| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | AD-1 | Users, roles and permissions | Super Admin and Admin one level apart | Core | STD |
| [x] | AD-2 | Audit log | Every create, update, approval and access change | Core | STD |
| [x] | AD-3 | Settings, templates and message log | Lead time, retention, reminders and wording | Core | STD |
| [x] | AD-4 | Scan retention and holds | Low-cost storage at 30 days, deletion at 180 | Core | STD |
| [x] | AD-5 | Nine operating reports | With filters and Excel download | Core | STD |
| [x] | AD-6 | Two-step sign-in and single sign-on | For staff accounts | Platform, privacy and management insight · phase 10 | STN |
| [x] | AD-7 | Privacy console | Consent log, data requests, deletion requests and breach register | Platform, privacy and management insight · phase 10 | STN |
| [x] | AD-8 | Partner API keys and test environment | For scanner, courier and partner systems | Platform, privacy and management insight · phase 10 | STN |
| [x] | AD-9 | Support desk for all users | Tickets from dentists, distributors and patients with deadlines | Support desk and complaints · phase 6 | STN |
| [x] | AD-10 | Complaint handling | Each complaint linked to the case, batch and corrective action | Support desk and complaints · phase 6 | STN |
| [x] | AD-11 | Management dashboard | Volume, revenue, turnaround, quality and receivables on one page | Platform, privacy and management insight · phase 10 | STN |
| [x] | AD-12 | Capacity against demand forecast | Pending sets and new cases against print capacity | Platform, privacy and management insight · phase 10 | STN |
| [x] | AD-13 | Unit economics | Margin by product, channel and supply type | Platform, privacy and management insight · phase 10 | STN |
| [x] | AD-14 | Scheduled reports by email | Daily and weekly reports sent automatically | Platform, privacy and management insight · phase 10 | STN |

## 12.14 Patients



| Keep | # | Service | What it gives | Module | Status |
|---|---|---|---|---|---|
| [x] | PT-1 | Tray schedule and change with photo | Reminders on the day and when missed | Core | STD |
| [x] | PT-2 | Wear time, box tracking and dentist messages | In the app | Core | STD |
| [x] | PT-3 | Consent, guardian access and data requests | As the law requires | Core | STD |
| [x] | PT-4 | Care guides and questions | Short how-to guides and answers in the app | Patient engagement · phase 8 | STN |
| [x] | PT-5 | Appointments and clinic chat | Visit requests and two-way chat with the clinic | Patient engagement · phase 8 | STN |
| [x] | PT-6 | Lost or broken aligner request | Report a problem; the dentist decides; a replacement is made | Patient engagement · phase 8 | STN |
| [x] | PT-7 | Smile progress and refer a friend | Before-and-now photos and a referral to the clinic | Patient engagement · phase 8 | STN |
| [x] | PT-8 | Retainer phase | Wear plan and check dates after treatment | Patient engagement · phase 8 | STN |
| [x] | PT-9 | Photo check for fit | The app checks the tray-change photo and flags a poor fit | Patient engagement · phase 8 | STN |
| [x] | PT-10 | Streaks and rewards | Encouragement for wearing and changing on time | Patient engagement · phase 8 | STN |
| [x] | PT-11 | Satisfaction rating | A short rating mid-treatment and at the end | Patient engagement · phase 8 | STN |
