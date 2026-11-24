# 11 — Decisions log

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

## 1. What changed on 24-11-2026

The meeting of 24-11-2026 replaced part of the design. These are settled.

| Change | What it affected | Decision |
|---|---|---|
| Dentist, clinic staff and patient logins | Three roles and the whole patient app | Removed. Dentist and patient are records. The partner holds the relationship. |
| Distributor and distributor staff | Two roles | Replaced by one Channel Partner role with one login, covering distributor, channel partner and OEM. |
| Marketing | A role inside the portal | Removed. Marketing passes leads in and works outside the portal. |
| Dentist approval of the plan | The dentist approved in the portal | Replaced. The in-house orthodontist gives the medicolegal approval. |
| Purchase officer | One role covering stock and buying | Split into Purchase and Inventory, with a defined order between them. |
| Dispatch | One role covering packing and courier | Split into Dispatch and Logistics. |
| BDE, field sales, direct sales | Three roles | Merged into Business Development (call centre) and Sales Team, head and member. |
| Patient messaging | Reminders, check-ins, chat and an app | Removed. The portal sends a patient nothing. |
| Traceability | Lot to set to box | Widened to software version, software changes, maintenance and user records, for certification. |
| Printer continuity | Not in the design | Added. Later sets print on the same printer as the earlier ones. |
| Partner API | Not in the design | Added. Case status on the partner's own website, with a one-time code. |


## 2. The settled decisions in one list

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


## 3. Open — business

Still to be decided by the business. None of these blocks step 0 or step 1.

| # | Question | What it blocks |
|---|---|---|
| O01 | Who signs the clinical record beside the orthodontist, if anyone, and is one orthodontist enough for the expected volume? | Planning |
| O02 | Does the partner, or we, hold the patient consent? Today the partner collects it and records it in the portal. | Legal |
| O03 | What must appear on a white-label label by law? | Regulatory consultant |
| O04 | Which certification are we going for, and by when? | Management |
| O05 | Payment terms and credit limits by partner type. | Accounts, Sales head |
| O06 | The credit-hold rule: days overdue, or over the limit, or both. | Accounts, Admin |
| O07 | Discount limits: Sales head up to what, Admin above it. | Management |
| O08 | Setup turnaround we promise a partner, and the penalty if we miss it. | Planning, Sales head |
| O09 | Whether Dispatch and Logistics are two people or one in the first year. | Production head |
| O10 | Whether Inventory is a person or a desk inside stores. | Production head |
| O11 | Which courier partners, and the rates by zone. | Logistics |
| O12 | Product names, set limits and prices for each list. | Management |
| O13 | Whether a partner may raise a case on a phone, and whether photographs may be taken in the app. | Sales head |
| O14 | Refinement policy: free within the product, or charged, and for how long. | Accounts, Management |
| O15 | Whether FlexiSmile keeps dentist logins while AVMAligners does not. | Management |
| O16 | Who is the approval authority for a proforma invoice, and up to what value. | Management |


## 4. Open — technical

| # | Decision | What it changes |
|---|---|---|
| D01 | Which certification are we going for — ISO 13485 alone, a CDSCO medical device licence, or CE marking for export? | It decides how much of phase 3 is compulsory and how early the test reports must start. |
| D02 | The e-invoicing provider and its annual quote. | The only line in the monthly cost that is still blank. |
| D03 | Courier aggregator or direct courier accounts? | An aggregator is one integration; direct accounts are one per courier. |
| D04 | Can the planning software report its own version through a file or an API? | If not, the planner types it on the case, which is weaker evidence but still evidence. |
| D05 | Who signs off a release before it is deployed? | Certification needs a named person. It cannot be the person who wrote the code. |
| D06 | Does the outside scan service keep files in India, and for how long? | Our retention rule is only as good as theirs. |
| D07 | Accounting package for the export of invoices, receipts and vendor payments. | Still open from the portal document. |


## 5. Where we have a recommendation

- **Certification target:** ISO 13485 first. It is the foundation for a CDSCO licence or CE marking, and most of its requirements are already in this design.
- **E-invoicing:** ClearTax, unless the quote is materially worse than Masters India. Having the e-way bill in the same place is worth something.
- **Courier:** an aggregator, not direct accounts. One integration instead of one per courier, and it survives a courier changing its API.
- **Who signs a release:** the Manufacturing Head or the Quality Check head. Not the developer, and not the person who asked for the change.
- **Database:** MongoDB Atlas, not Cosmos DB for MongoDB. Cosmos bills per request unit and this is a chatty application.
