# 07 — Screens

A list of every screen, who uses it, what it shows and what can be done on it. It is the brief for wireframes and for the front-end work. Layout and visual design are for the developer or a designer to propose.

General rules for every screen:

- Clinic, doctor, patient, product and machine are chosen from lists. Never typed.
- A user sees only menu items they have permission for. The API enforces the same.
- Dates DD-MM-YYYY. Amounts in rupees with Indian digit grouping, whole numbers.
- Every list has search, filters, paging and, where useful, Excel download.
- Brand: AVMAligners. Colours: indigo `#362997`, red `#DF2028`, white.
- The web app must work on a tablet, since clinics and the production floor use them.

## A. Web app — everyone

| Screen | Shows | Actions |
|---|---|---|
| Sign in | Email, password | Sign in. Built |
| Set new password | Shown when on a temporary password | Built |
| My notifications | Recent notifications for this user | Open the related record |
| Change password | | Built |

## B. Web app — Admin and Super Admin

| Screen | Shows | Actions |
|---|---|---|
| Dashboard | Counts: leads waiting, plans waiting for setup, sets pending, due to order, low stock, scans expiring, unpaid invoices | Open each list |
| Users | All users with role, status, last sign-in | Create, disable, enable, reset password, change role — only for roles below own level. Built |
| Roles and permissions | Matrix of roles against permissions | Super Admin ticks and unticks. Admin reads only. Built |
| Audit log | When, who, role, module, action, record | Filter. Built |
| Settings | Lead time, days per set default, scan retention, stalled period, tax settings | Super Admin only |
| Notification templates | Event, channel, text, on or off | Edit, switch |
| Message log | Messages sent with status | Filter |
| Scans on hold | Held scans with reason | Hold, release |

## C. Web app — leads and onboarding (Marketing, BDE, Field sales, Direct sales, Distributor, Sales head, Admin)

| Screen | Shows | Actions |
|---|---|---|
| Lead queue | Leads assigned to the user, by stage, with source, score and next follow-up. Sales head, Admin and Marketing see all | Filter by stage, type, source, campaign, owner. Add lead |
| Lead detail | Contact, type, source and campaign, LumenAI score and summary, stage, owner, and a timeline of every call, WhatsApp conversation, visit and note | Call, add note, set follow-up, change stage, hand over, mark lost with reason, mark do-not-contact |
| Follow-ups | The user's follow-ups due today and missed | Open the lead |
| Log a visit | Date, who was met, outcome, next step | Field and direct sales |
| Accounts | Direct sales accounts with their leads, clinics and dentists | Add, edit, link a lead |
| Onboarding | Won leads: documents and details | Attach documents, submit; Sales head: mark reviewed or reject; Admin: approve or reject |
| Assignment | Leads waiting for an owner; the assignment rule | Sales head and Admin: assign, change the rule |
| Import leads | Upload a file; result shows created, merged and rejected rows | Marketing, Sales head, Admin |
| Sources and campaigns | Each source and campaign with leads, won leads and onboarded accounts | Marketing: add, edit |
| Spend | Monthly spend by source and campaign | Marketing: enter or correct |
| Marketing dashboard | Leads by source and campaign, cost per lead, per won lead and per onboarded account, lead quality by score | Marketing, Sales head, Admin |
| Calling dashboard | Calls made, connected, outcomes and follow-ups kept, by BDE | Sales head, Admin |
| Distributors | List with territory, default supply type and status | Admin: add, edit, create login. Built |
| My dentists and clinics | For a distributor, field or direct sales: the accounts they onboarded, with number of active cases | Open (no clinical data) |
| Integrations | Each partner's status, last activity and failures; the list of incoming items | Admin: pause, resume, choose the side for telephony and WhatsApp, replay a failed item. Marketing: view |

## D. Web app — masters (Admin, Accounts)

| Screen | Shows | Actions |
|---|---|---|
| Clinics | Name, city, type, distributor or direct, default supply type (Branded or White label), status | Add, edit. Built; supply type new |
| Doctors | Name, clinics, login, status | Add, edit, link to clinics. Built |
| Products | Code, name, tax details | Add, edit. Built |
| Price lists | List by type, supply type (branded or white label) and start date, with prices per product | Accounts: add a new list from a date |

## E. Web app — Dentist and Clinic staff

| Screen | Shows | Actions |
|---|---|---|
| Dashboard | Tiles: in treatment, waiting for my approval, check-ins to review, boxes on the way | Open each list |
| Patients | Own patients: code, name, clinic, current plan status, current set | Add patient, search by code, name, mobile |
| Add patient | First name, last name, mobile, gender, date of birth, guardian (if under 18), clinic (picked), clinic case number (optional) | Save and continue to prescription |
| Patient detail | Details, plans, sets with status, dispatches, check-ins | New plan (refinement or rescan), edit details |
| Prescription | Step 1 clinical conditions; step 2 prescription with supply type (Branded or White label) and upper and lower counts; step 3 tooth chart (FDI) with four instruction types | Save draft |
| Records | Photo slots, x-ray slots, videos, STL scans (upper, lower, bite) with upload progress and expiry date on scans | Upload, replace (new version), submit plan |
| Setup approval | Setup file, IPR file, final upper and lower counts, planner's notes, earlier versions | Approve, or reject with reason (dentist only) |
| Treatment schedule | Sets with due-to-start dates, boxes with status and tracking | Set start date, change days per set, confirm receipt |
| Check-ins | Photos by set number and date, wear time | Continue, hold or rescan with a note (dentist only) |
| My invoices | **Direct clinics only.** Invoice, amount, paid, balance | Open, download PDF |

## F. Web app — Treatment planner

| Screen | Shows | Actions |
|---|---|---|
| Planning queue | Plans waiting for setup or revision, oldest first, flag for "records to follow" | Open |
| Case workbench | Prescription, conditions, tooth chart, photos, x-rays, scans with download | Download scans, upload setup and IPR, enter final upper and lower counts and retainer |
| My cases | Plans waiting for the dentist's decision | |
| Scans expiring | Scans due for deletion in 14 days | |

## G. Web app — Production, Quality check, Dispatch

| Screen | Shows | Actions |
|---|---|---|
| Production dashboard | New plans, due to order, open orders, awaiting QC, ready to dispatch, low stock, machines down | Open each list |
| New plans | Approved plans with nothing ordered | Set box size, raise first print order |
| Due to order | Plans past order-by date, sorted by run-out date | Raise print order |
| Print orders | Open orders by needed-by date, urgent first | Raise order (pick plan, arches, set range), cancel |
| Record batch | Pick machine, pick ordered sets, model count, materials used | Save. Production |
| Quality check | Batches awaiting check, sets in each | Pass, or reject per set with reason. Quality check |
| Ready to dispatch | QC-passed sets grouped by plan and clinic | Create dispatch, enter courier and tracking, print box label. Dispatch |
| Dispatches | All dispatches with status | Filter, open |
| Plan production view | One plan: every set with status, order, batch, dispatch and history | |
| Stock | Items with current stock and reorder level | Add item, receive stock, adjust, record wastage |
| Stock movements | History per item | |
| Finished stock | Printed sets not yet dispatched, by clinic | |
| Machines | Register with status | Add, edit, record maintenance, record downtime, bring back up |

Every production, quality check and dispatch list shows the supply type of each plan. A white-label dispatch prints a plain label.

The production floor screens show patient **code and name only**. No mobile number, no date of birth, no prices.

## H. Web app — Accounts

| Screen | Shows | Actions |
|---|---|---|
| Invoices | All invoices with customer, amount, paid, balance, status | Open, cancel with reason, download |
| Invoice detail | Lines, tax, payments | Record payment |
| Payments | All payments | |
| Receivables | Outstanding by customer with ageing | Download |
| Price lists | As in D | |

## I. Web app — Distributor (billing)

| Screen | Shows | Actions |
|---|---|---|
| My invoices | Own invoices with status | Open, download |
| My price list | The prices that apply to this distributor | |

## J. Reports (by permission)

Clinic-wise sets, print queue, daily output, stalled cases, reprints, machine downtime, sales funnel, receivables, scan storage. Each with filters and Excel download.

## K. Patient app — Android and iPhone

| Screen | Shows | Actions |
|---|---|---|
| Sign in | Mobile number, then one-time code | |
| Consent | What data is held, why, and for how long. Shown once, and again if the wording changes | Accept. For a minor, accepted by the guardian |
| Home | Current set number, days left on this set, next change date, progress through the plan | Change tray |
| Change tray | Camera for the photo, optional note | Confirm. Early or late change is allowed and recorded |
| Schedule | Every set with its date; past sets ticked | |
| Wear time | Today's hours; a simple week view | Enter hours |
| My boxes | Each box: dispatched, on the way with tracking, delivered to clinic | |
| Messages from my dentist | Hold notice or instructions | |
| Profile | Name, clinic, dentist | Sign out, request my data, request deletion (see document 10) |

The app shows no prices and no other patient's data. On a white-label case the app uses a neutral theme and the name "My Aligners".

The Screen Designs book, version 3.0, draws every screen listed here and the screens of the modules added in version 2.0, which are listed in section L.

<!--EXT2-->
## L. Screens added in version 2.0

Each is drawn in the Screen Designs book, version 3.0, at the number shown.

| No. | Screen | Used by | What it does |
|---|---|---|---|
| 037 | Tracking and conversions | Marketing | Full tracking kept on every lead, and qualified, won and onboarded events sent back to the ad platforms so they optimise for real results. |
| 038 | Audiences | Marketing | Lists built from lead stages and synced to the ad platforms for retargeting and exclusion. |
| 039 | Pages and forms | Marketing | Landing pages and forms built in the portal. Every submission becomes a lead with its source tagged automatically. |
| 040 | Journeys | Marketing | Timed WhatsApp, email and AI-call sequences to a segment. A reply stops the journey and alerts the owner. |
| 041 | Events and webinars | Marketing, Sales head, Distributor | Registration, attendance and follow-up for webinars and events. Attendance appears on the lead as an activity. |
| 042 | Referrals | Marketing, Sales head | Doctor and patient referrals tracked from the referral to the reward. |
| 043 | Patient leads and doctor locator | Marketing | Patient enquiries from the brand site are routed to the nearest partner clinic and tracked to consultation. |
| 044 | Consent centre | Marketing, Admin | The opt-in record for every contact, the do-not-disturb check before any campaign, and unsubscribe handling. |
| 045 | Attribution and return by campaign | Marketing, Management | Credit shared across the channels a lead touched, and cases and billing traced back to the campaign. |
| 046 | Budget pacing and creative comparison | Marketing | Spend against the monthly plan with alerts, and results by Creative ID to compare creatives. |
| 047 | Reviews and ratings | Marketing, Support | Satisfaction scores and review requests sent at the right moment, with the results collected in one place. |
| 048 | Market map | Marketing, Sales head, Management | Onboarded clinics against the estimated number of dental clinics in each city, to show where to push. |
| 049 | Asset library | Marketing; partners download | Approved brochures, creatives, videos and documents with versions, for distributors, dentists and sales. |
| 050 | Calling workspace | BDE | One screen for calling: a priority queue, the live call, the script and one-tap WhatsApp templates, with a speed-to-lead timer. |
| 051 | Recordings and call scoring | BDE, Sales head | Every call recording sits on the lead and is scored for quality against a short checklist. |
| 052 | Leaderboard, targets and incentives | BDE, Sales head | Calls, connects and hand-overs against target, the incentive earned so far, and login and talk time. |
| 053 | Knowledge base | BDE, Sales, Support, LumenAI | Products, prices, policies and answers in one approved place. LumenAI answers only from approved articles. |
| 054 | LumenAI control room | Admin, Sales head | Every job LumenAI does, as a playbook that can be switched on or off, with when it runs and what it achieved. |
| 055 | AI conversations: analytics, handover rules and audit | Admin, Sales head, Marketing | What leads say, when the AI must stop and hand over to a person, and a record of every AI message. |
| 056 | Day planner | Field sales, Direct sales | The day's visits in a sensible order, built from follow-ups, new hand-overs and accounts that have gone quiet. |
| 057 | Targets and incentives | Sales head, Field sales, Direct sales | Targets by person and month, achievement so far and the incentive worked out from the rule. |
| 058 | Account health | Sales head, Field sales, Direct sales, Distributor | A score for every onboarded account, so falling volume and silent clinics are seen early. |
| 059 | Proposals and price approvals | Field sales, Direct sales; Sales head approves | A standard proposal built from approved prices. A discount below the list needs approval before it can be sent. |
| 060 | Agreements signed on screen | Field sales, Direct sales, Distributor, Admin | The partner agreement is sent, signed digitally and stored against the account, with reminders until it is signed. |
| 061 | Forecast and win-loss | Sales head, Management | Expected onboardings and case volume from the pipeline, and why leads were won or lost. |
| 062 | Expenses and demo kits | Field sales, Direct sales; Sales head approves | Travel and visit expenses claimed against logged visits, and a record of who holds which sample or demo kit. |
| 063 | Distributor dashboard | Distributor | The distributor's business at a glance: cases, billing, growth, credit used and clinics that have gone quiet. |
| 064 | My staff | Distributor (owner) | The distributor creates logins for its own sales, accounts and support staff, each with limited rights inside its own account. |
| 065 | Box tracking for my clinics | Distributor and its staff | Every box going to the distributor's clinics with courier status, so its team can answer a clinic without calling the company. |
| 066 | Credit and schemes | Distributor; Accounts sets the limits | Credit limit and credit days with ageing alerts, and progress against volume slabs and quarterly schemes. |
| 067 | Pay online | Distributor, Direct clinic | Invoices are paid online by UPI, net banking or card through a payment partner. The receipt is matched to the invoice automatically. |
| 068 | Margin report | Distributor (owner and accounts) | Margin by clinic and product, for a distributor that records its own selling price in the portal. |
| 069 | Store: kits, consumables and marketing material | Distributor, Dentist | Starter kits, sample aligners, consumables, retainers and printed marketing material ordered like a shop, and billed on the next invoice. |
| 070 | Requests and support | Distributor, Dentist, Support agent | Refinement, replacement tray, complaint and general requests raised and tracked, each with an owner and a deadline. |
| 071 | Training and certification | Distributor staff, Dentists, Sales, BDE | Courses with videos and quizzes, and certificates for the people who finish them. |
| 072 | Announcements, company leads and territory alerts | Distributor | Company notices that need an acknowledgement, leads the company passes into the territory, and an alert when another channel touches the territory. |
| 073 | Quarterly business review | Distributor, Sales head | A one-page review of volume, growth, payments and service levels, prepared automatically each quarter and discussed with the Sales head. |
| 075 | Brand profile | White-label partner; Admin approves | A partner's own brand: name, logo, colours, app name, message sender, portal address and product names. Used everywhere its dentists and patients look. |
| 076 | Artwork approval | White-label partner, Marketing, Production | Packaging and marking artwork is uploaded, proofed, approved and versioned before anything is printed. |
| 077 | Packaging stock held for the partner | White-label partner, Production | The partner's printed packaging is held at the factory, tracked with reorder alerts and a minimum order. |
| 078 | Partner-branded dentist portal | Dentists of a white-label partner | The same portal in the partner's name, colours and product names, on the partner's own address. The dentist never sees the AVMAligners name. |
| 079 | My dentists' prices and invoices | White-label partner (owner and accounts) | The partner sets its own price list for its dentists and raises its own invoices from the portal, on its own letterhead. |
| 101 | 3D setup viewer | Dentist, Treatment planner | The setup opens in the browser: the 3D model by step, a movement table for every tooth, and the IPR and attachment chart. |
| 102 | Treatment simulation for the patient | Patient, shared by the dentist | A link the dentist sends to the patient: today and after treatment, with time and number of sets. It helps the patient decide. |
| 103 | Case suitability check | Dentist; Treatment planner answers | Before sending full records, the dentist sends a few photos and a question. A planner answers within a working day. |
| 104 | Scans inbox and scanner connections | Dentist, Clinic staff | Scans arrive directly from the intraoral scanner's cloud and are matched to a patient. A scanner visit or impression pick-up can be booked from the same screen. |
| 105 | Planner chat and case discussion | Dentist, Treatment planner | The dentist talks to the planner about a case by chat, or books a short call. The conversation stays on the plan. |
| 106 | My clinical preferences | Dentist | The dentist's standing instructions, applied to every new prescription so they are not typed each time. |
| 107 | Timers and tracking alerts | Dentist, Clinic staff | Each case against the promised turnaround, and an alert when photos or late changes suggest the teeth are not tracking. |
| 108 | Consent, estimate and finance options | Dentist, Clinic staff | The consent form is signed on screen, the clinic gives its own treatment estimate, and instalment plans from a finance partner can be offered. |
| 109 | Learning, provider level and marketing kit | Dentist | Courses and a case gallery, the provider level earned from volume and certification, the doctor locator listing and a marketing kit for the clinic. |
| 110 | Reorder, case transfer and my reports | Dentist, group owner | One-tap reorder of retainers and consumables, moving a patient to another doctor or clinic, a view across a group's clinics, and the practice's own numbers. |
| 115 | Allocation, deadlines and second review | Planning lead, Treatment planner | Cases shared by load and difficulty, timers against the 3-day promise, and a second review for complex cases before they go to the dentist. |
| 116 | Case library | Treatment planner, Dentist (read) | Finished cases, searchable by condition, with names removed. Used for teaching and to estimate a new case. |
| 117 | Quality checklists, defect trends and pack audit | Quality check | A checklist with photos for each set, a rising-defect alert by machine or material lot, and a sample re-check of packed boxes. |
| 133 | Station tracking | Production, Production head | Every model and tray carries a barcode and is scanned at each station, so the floor sees where every set is and where work is piling up. |
| 134 | Schedule board | Production head, Production | Batches suggested by needed-by date and machine capacity, laid out by machine through the day. A machine that goes down re-plans the rest. |
| 135 | File preparation and printer status | Production | Model files for ordered sets are staged and checked before printing, and each printer's job status is read automatically. |
| 136 | Traceability and recall | Production head, Quality check, Admin | Scan any tray to see its full history, and find every patient set made from a material lot, for a recall. |
| 137 | Machine effectiveness and maintenance calendar | Production head | Availability, speed and quality for each machine, with planned maintenance and calibration on one calendar. |
| 138 | Purchasing | Purchase officer, Production head | From a requisition to a purchase order, goods receipt and supplier rating. A low-stock item can raise its own requisition. |
| 139 | Cost per case | Production head, Accounts, Management | Material, machine time and labour for each case, and the average by product, so price and margin can be judged. |
| 140 | Non-conformance and corrective action | Quality check, Production head, Support | Each defect, complaint or audit finding is logged, investigated to its cause, corrected and closed, with proof. |
| 141 | Documents, work instructions and training records | Production head, Quality check, Admin | Controlled procedures with versions, shown at the station, and a record of who is trained on each. This is the evidence an auditor asks for. |
| 142 | Courier booking | Dispatch | For each box the portal checks which couriers serve the PIN code, compares days and rate, books the pick-up and prints the waybill label. |
| 143 | Scan to pack | Dispatch | Every tray is scanned into its box against the plan. A wrong or missing tray stops the box. A photo of the packed box is kept. |
| 144 | Delivery watch | Dispatch, Support | Every box in transit against the patient's run-out date, with proof of delivery, and failed deliveries handled. |
| 145 | Returns, replacements and claims | Dispatch, Support, Accounts | Returned boxes, replacement shipments linked to the original dispatch, and insurance claims for lost or damaged boxes. |
| 146 | Daily manifest | Dispatch | The hand-over sheet for each courier with counts, signed at pick-up. Export shipments and direct-to-patient boxes are listed separately. |
| 153 | E-invoices, e-way bills and accounting export | Accounts | GST e-invoices and e-way bills are generated from the portal, and invoices and receipts are exported to the accounting software. |
| 154 | Online payments and matching | Accounts | Payments made through the payment partner are matched to invoices automatically. Anything unmatched waits here. |
| 155 | Reminders and credit hold | Accounts; Admin can override | Timed payment reminders before and after the due date, and an automatic hold on new cases for an account over its limit. |
| 156 | Credit notes and refunds | Accounts | A credit note or refund is always linked to the original invoice and needs a reason and an approver. |
| 157 | Incentives and commission payouts | Accounts, Sales head | Incentives for BDE and sales, scheme credits for distributors and referral rewards, worked out from the rules and approved before payment. |
| 166 | Support desk | Support agent; all users raise tickets | One desk for tickets from dentists, distributors, patients and staff, each with an owner and a deadline. A complaint is linked to its case and to a corrective action. |
| 167 | Privacy console | Grievance Officer, Super Admin | The consent record, requests for a copy or deletion of data, and the breach register, each with its deadline. |
| 168 | Security: sign-in, single sign-on and partner keys | Super Admin | Two-step sign-in for staff, single sign-on with the company account, and keys for partner systems with a test environment. |
| 169 | Management dashboard | Management | Volume, revenue, turnaround, quality and receivables on one page, with what changed against last month. |
| 170 | Capacity and demand forecast | Management, Production head | Pending sets and the forecast of new cases set against print capacity, to show when a machine or a shift must be added. |
| 171 | Unit economics | Management, Accounts | Margin by product, channel and supply type, and what it costs to win and serve an account. |
| 172 | Scheduled reports | Management, every team head | Any report can be sent by email on a schedule, as Excel or PDF, to named people. |
| 181 | Patient app: care guides and questions | Patient | Short how-to guides and answers to common questions, so patients call the clinic less. |
| 182 | Patient app: appointments and clinic chat | Patient | Clinic visits linked to the treatment, a request for a new slot, and two-way chat with the clinic. |
| 183 | Patient app: lost or broken aligner | Patient | The patient reports a lost, broken or ill-fitting tray. The dentist decides: move on, go back, or order a replacement. |
| 184 | Patient app: smile progress and refer a friend | Patient | A before-and-now comparison built from tray-change photos, a photo timeline, and a referral to the clinic. |
| 188 | Patient app: photo fit check, rewards and rating | Patient | The app checks the tray-change photo for a poor fit, encourages on-time wear with streaks, and asks for a short rating. |
| 189 | Patient app: partner-branded (own brand) | Patient of a white-label partner with its own brand | Where a partner has a brand profile, the patient app carries the partner's name, logo and colours, and messages come from the partner. |
| 190 | Dentist phone: today, patients and patient detail | Dentist | The dentist's working day on a phone: what is waiting, the patient list and one patient. |
| 191 | Dentist phone: approve a setup and review a check-in | Dentist | The two decisions only the dentist can take, done from a phone between patients. |
| 192 | Dentist phone: boxes, quick add and alerts | Dentist, Clinic staff | Confirming a box at the front desk, starting a new patient from the chair, and the alert list. |
| 193 | Sales phone: my day, leads and one lead | Field sales, Direct sales | A field person's day on a phone: visits and follow-ups due, the lead list and one lead with its history. |
| 194 | Sales phone: call outcome, visit and new lead | Field sales, Direct sales | Recording what happened straight after a call or a visit, and adding a lead met in the field. |
| 195 | Sales phone: onboarding documents, accounts and follow-ups | Field sales, Direct sales | Collecting onboarding documents with the camera, checking an account, and the follow-up list. |
