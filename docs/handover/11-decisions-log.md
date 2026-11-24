# 11 — Decisions log

## Settled

Decided by the business owner. Change only with his agreement.

| # | Decision | Date |
|---|---|---|
| S1 | The Flexismile portal becomes the single system. Orthosquare PMS and VSoft are out of scope | 21-11-2026 |
| S2 | The lab print register moves into the portal | 21-11-2026 |
| S3 | STL scans are uploaded in the portal, kept on low-cost storage and deleted after six months | 21-11-2026 |
| S4 | The six months start on the upload date | 21-11-2026 |
| S5 | The Flexismile manufacturing team raises every print order | 21-11-2026 |
| S6 | Two aligner counts on the prescription: upper and lower | 21-11-2026 |
| S7 | Dispatch runs on the tray schedule, in the manner of TrayMinder, My Invisalign, Smilo and myAngelSmile | 21-11-2026 |
| S8 | Modular, API-based system. Not monolithic. Access restricted by user | 21-11-2026 |
| S9 | Super Admin has complete access; Admin is one level lower | 21-11-2026 |
| S10 | MERN stack | 21-11-2026 |
| S11 | Development runs on a local machine with no paid cloud; sample data only | 21-11-2026 |
| S12 | Distributors buy and resell. The company invoices the distributor; the distributor's price to its dentists stays outside the portal | 22-11-2026 |
| S13 | Payments are recorded now; online and offline collection can be added later | 22-11-2026 |
| S14 | Patients use Android and iPhone apps | 22-11-2026 |
| S15 | The new portal takes new cases only; old cases finish in the current portal | 22-11-2026 |
| S16 | Inventory covers raw materials, finished aligners and machines | 22-11-2026 |
| S17 | Notification channels: WhatsApp, email, app notifications | 22-11-2026 |
| S18 | Product name: AVMAligners, written as one word | 22-11-2026 |
| S19 | New dentists and clinics are approved by the Sales head, then Admin | 22-11-2026 |
| S20 | A patient's app login is created automatically when the patient is added | 22-11-2026 |
| S21 | Only direct dentists see prices and payment details | 22-11-2026 |
| S22 | Live hosting on a paid cloud in India | 22-11-2026 |
| S23 | Marketing generates leads through Meta, Google, Bing, TikTok, re-engagement and other channels; these enter the portal | 22-11-2026 |
| S24 | Leads are dentists, clinics and distributors | 22-11-2026 |
| S25 | The BDE team calls and engages leads; field sales and direct sales accounts are part of the system | 22-11-2026 |
| S26 | LumenAI is integrated for AI calling and follow-up, WhatsApp conversations and lead qualification | 22-11-2026 |
| S27 | MCube, Exotel and WhatsApp Business are integrated, on the portal's side or on LumenAI's side | 22-11-2026 |
| S28 | Field sales visits are logged with outcome, without a location stamp | 22-11-2026 |
| S29 | Aligners are sold under the AVMAligners brand or as white label. White label is plain: no brand on trays, packaging or label | 22-11-2026 |
| S30 | Supply type has a default on the clinic or distributor and can be changed on each case | 22-11-2026 |
| S31 | White label has its own price list | 22-11-2026 |
| S32 | On a white-label case the patient app and patient messages carry no brand: neutral theme, app name "My Aligners", messages signed by the clinic | 22-11-2026 |
| S33 | All 268 services of the services checklist are in scope. The design is extended with 15 modules, 6 roles and 5 phases | 22-11-2026 |

## Assumed

Chosen while writing so the documents are complete. Each should be confirmed before the phase that uses it.

| # | Assumption | Used in | Confirm before |
|---|---|---|---|
| A1 | The invoice is raised when the dentist approves the treatment plan | 01, 06 | Phase 5 |
| A2 | Pricing is per case, by product | 04 | Phase 1b |
| A3 | Patients sign in with a one-time code sent by WhatsApp, email as fallback, since SMS is not a channel | 03 | Phase 4 |
| A4 | The patient app is built in React Native | 03 | Phase 4 |
| A5 | WhatsApp goes through the company's existing WhatsApp Business provider | 03 | Phase 4 |
| A6 | A plan can be submitted with "records to follow" | 06 | Phase 2 |
| A7 | File size limits: photo 15 MB, x-ray 25 MB, video 200 MB, STL 150 MB | 05 | Phase 2 |
| A8 | Reminder thresholds: start date missing after 7 days; tray change missed after 3 days | 06 | Phase 4 |
| A9 | Clinics and doctors active in the last 12 months are carried over | 08 | Cut-over |
| A10 | A crossing-over patient is entered as a new patient with a reference to the old code | 08 | Cut-over |
| A11 | English only | 01 | Phase 2 |
| A12 | Availability, backup and load figures | 10 | Phase 5 |
| A13 | Events are delivered through an outbox and worker, without a message broker | 03 | Phase 1b |
| A14 | Product records carry HSN code and tax rate | 04 | Phase 1b |
| A15 | Production does not wait for payment | 06 | Phase 3 |
| A16 | Lead stages: New, Qualified, Contacted, With sales, Won, In review, Approved, Onboarded, Lost | 01, 06 | Sales track |
| A17 | A repeat enquiry on the same mobile or email is merged into the existing lead | 01 | Sales track |
| A18 | Field sales replaces the earlier Sales executive role | 02 | Sales track |
| A19 | Open leads held in other tools are imported once by file | 08 | Cut-over |
| A20 | Supply type can be changed until the plan is approved, then it is fixed | 01, 06 | Phase 2 |

## Open

Not decided. Each blocks something.

| # | Question | Blocks | Who decides |
|---|---|---|---|
| O1 | Which cloud provider | Phase 5 hosting; the exact low-cost storage class for scans | Business owner with developer |
| O2 | Is a refinement charged or free | Phase 5 billing of refinements | Business owner |
| O3 | Tax treatment on invoices: rates, HSN codes, invoice numbering format | Phase 5 | Accounts |
| O4 | Retention periods for clinical records, photos and invoices | Go-live | Legal adviser |
| O5 | Who creates the Google Play and Apple developer accounts | Phase 4 release | Business owner |
| O6 | Default days per set, and the lead time split (print, courier, buffer) | Phase 3 | Manufacturing team |
| O7 | Default sets per box | Phase 3 | Manufacturing team |
| O8 | The list of raw material items and machines | Phase 3 data entry | Manufacturing team |
| O9 | Export of the current portal's database before it is archived | Archiving the old portal | Current portal's developer |
| O10 | End date for the current portal | Cut-over plan | Business owner |
| O11 | Credit terms and due dates on invoices | Phase 5 | Accounts |
| O12 | Whether a dentist can belong to more than one distributor | Billing and scope rules | Business owner |
| O13 | Telephony (MCube, Exotel) and WhatsApp Business: on the portal's side or on LumenAI's side | Sales track integrations | Business owner with LumenAI |
| O14 | How new leads are assigned: by territory, in rotation or by hand | Sales track | Sales head |
| O15 | Ad spend pulled automatically from each platform or entered monthly | Sales track reports | Marketing |
| O16 | What LumenAI, MCube and Exotel can send and receive, and in what form | Sales track integrations | Developer with each partner |
| O18 | Whether dentist and sales phone screens are the web app made to fit a phone, or separate apps | Phase 4 | Business owner with developer |
| O20 | Payment partner | Phase 6 | Accounts with developer |
| O21 | E-invoice and e-way bill provider | Phase 6 | Accounts |
| O22 | Courier partner or aggregator | Phase 8 | Dispatch head |
| O23 | Which scanner clouds to connect first | Phase 8 | Planning lead |
| O24 | E-sign provider | Phase 7 | Admin |
| O25 | Patient finance partner | Phase 6 | Business owner |
| O26 | Accounting software for export | Phase 6 | Accounts |
| O27 | Incentive rules, scheme slabs and provider levels | Phases 6 and 7 | Sales head and business owner |
| O28 | Credit limits and the hold rule | Phase 6 | Accounts |
| O29 | Regulatory lines required on partner-branded packaging; record retention period | Phases 6 and 9 | Regulatory consultant |
| O30 | Charge for a replacement tray | Phase 8 | Business owner |
| O31 | Who answers clinic chat and in what time | Phase 8 | Each clinic |
| O32 | Order of the new phases and what goes in the first release | All new phases | Business owner |

## How to use this log

- When an open item is decided, move it to Settled with the date.
- When an assumption is confirmed, move it to Settled. When it is changed, update the documents it is used in.
- New questions from the developer go to Open, with what they block.
