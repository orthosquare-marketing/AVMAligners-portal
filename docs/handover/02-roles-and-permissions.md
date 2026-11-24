# 02 — Roles and permissions

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

## 1. The fifteen roles

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


**Level** decides who may manage whom. A user can create or change only users whose level is below
their own. Admin cannot touch another Admin. Only Super Admin can manage Admins.

## 2. Who can reach what

| Role | Access | Partners | Leads | Sales | Cases | Approval | Production | Quality | Stock | Dispatch | Money | Support |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 Super Admin | Full | Full | Full | Full | Full | Full | Full | Full | Full | Full | Full | Full |
| 02 Admin | Full | Full | Read | Read | Read | Read | Read | Read | Read | Read | Full | Full |
| 03 Management | Read | Read | Read | Read | Read | Read | Read | Read | Read | Read | Read | Read |
| 04 Business Development | — | Read | Full | Write | — | — | — | — | — | — | — | — |
| 05 Sales Team | — | Full | Full | Full | Read | — | Read | — | — | Read | Read | Read |
| 06 Sales Team | — | Write | Write | Full | Read | — | — | — | — | — | Read | — |
| 07 Channel Partner | — | Read | — | — | Full | Read | Read | — | — | Read | Read | Write |
| 08 Planning Team | — | — | — | — | Read | Full | — | — | — | — | — | — |
| 09 Planning Team | — | — | — | — | Write | Read | — | — | — | — | — | — |
| 10 Purchase | — | — | — | — | — | — | Read | — | Full | — | Read | — |
| 11 Inventory | — | — | — | — | — | — | Read | — | Full | Read | — | — |
| 12 Production | — | — | — | — | Read | Read | Full | Read | Read | Read | Read | Read |
| 13 Production | — | — | — | — | — | — | Write | — | Read | — | — | — |
| 14 Quality Check | — | — | — | — | — | — | Read | Full | Read | Read | — | Read |
| 15 Dispatch | — | — | — | — | — | — | Read | Read | Read | Full | — | — |
| 16 Logistics | — | — | — | — | — | — | Read | — | — | Full | Read | Read |
| 17 Accounts | — | Read | — | — | Read | — | — | — | — | Read | Full | Read |
| 18 Support / Facility | — | Read | — | — | Read | — | — | — | — | — | Read | Full |


**Full** — create, change and approve. **Write** — create and change, not approve. **Read** — see only. **—** — no access.

## 3. Ownership scope

Permissions say what a role may do. Scope says on which records. Scope is applied **inside the
database query**, never in the user interface. A record outside a user's scope returns 404, so its
existence is not revealed.

| Role | Sees |
|---|---|
| Channel Partner | Only its own partner account: its dentists, patients, cases, boxes, invoices and tickets. Never another partner, never our costs, never the factory. |
| Sales head | Every partner and every lead in the territories they own. |
| Sales member | Only the leads and partners they own. |
| Business Development | Only enquiries, until one is qualified and handed to sales. |
| Planner | Cases assigned to them, plus any case in a planning state. |
| Orthodontist | Every plan waiting for approval, and every plan they have approved. |
| Production, Quality, Dispatch, Logistics, Inventory, Purchase | Every record in their own stage. No partner money, no partner commercials. |
| Accounts | Every invoice, payment and statement. No clinical content beyond the case reference. |
| Support and Facility | Every ticket and asset. Case details only where the ticket links to one. |
| Management | Everything, read-only. No operational buttons anywhere. |
| Admin | Everything operational. Cannot change roles, system settings or Admins. |
| Super Admin | Everything, including roles and settings. Every action recorded against the name. |


## 4. The three rules that cannot be worked around

1. **Reserved permissions.** `roles:update`, `settings:update` and `records:delete` belong to Super Admin alone and cannot be granted to any other role, even by a Super Admin.
2. **The level rule.** Nobody manages a user at or above their own level.
3. **Approval is personal.** An approval needs the password re-entered at that moment. It records the name, the registration number where there is one, and a fingerprint of exactly what was approved. It is never editable afterwards, by anyone.

## 5. What no role can do

- Delete a record. Delete is a state, not an operation.
- Change or remove an audit event.
- Edit an approval after it is sealed.
- See another channel partner's cases, prices or money.
- Make a set for a case with no approval.
- Issue a superseded version of a controlled document to the floor.
