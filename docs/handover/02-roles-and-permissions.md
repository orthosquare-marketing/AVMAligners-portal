# 02 — Roles and permissions

Access has three layers. All three are checked in the API on every request. Hiding a menu item in the web app is a convenience, not the security.

1. **Permission** — what a role may do (for example `orders:create`).
2. **Level** — whom a user may manage.
3. **Scope** — on which records.

## 1. Roles and levels

| Role | Key | Level | Built |
|---|---|---|---|
| Super Admin | `super_admin` | 100 | Yes |
| Admin | `admin` | 90 | Yes |
| Sales head | `sales_head` | 60 | **To add** |
| Marketing | `marketing` | 50 | **To add** |
| Accounts | `accounts` | 50 | Yes |
| Treatment planner | `treatment_planner` | 50 | Yes |
| Production | `production` | 50 | Yes |
| Quality check | `quality_check` | 50 | Yes |
| Dispatch | `dispatch` | 50 | Yes |
| BDE (calling team) | `bde` | 40 | **To add** |
| Field sales | `field_sales` | 40 | Built as `sales_executive`; rename |
| Direct sales | `direct_sales` | 40 | **To add** |
| Distributor | `distributor` | 40 | Yes |
| Dentist | `dentist` | 30 | Yes |
| Clinic staff | `clinic_staff` | 20 | Yes |
| Patient | `patient` | 10 | Yes |

### The level rule

A user can create, change, disable or reset only users whose role level is **lower** than their own.

- Super Admin (100) manages everyone, including Admins.
- Admin (90) manages everyone below Admin. Admin cannot create or change an Admin or a Super Admin.
- Nobody else has the user-management permissions, so the rule matters only for those two today.

### Reserved for Super Admin

These three permissions cannot be granted to any other role, even by a Super Admin:

| Permission | Why |
|---|---|
| `roles:update` | Changing what a role can do |
| `settings:update` | Lead time, retention days, notification switches, tax settings |
| `records:delete` | Permanent deletion of any record |

This is what "Admin is one level below Super Admin" means in practice: Admin runs the business day to day but cannot change the rules of the system, cannot destroy records, and cannot touch other Admins.

## 2. Permission matrix

Columns: SA Super Admin, AD Admin, SH Sales head, AC Accounts, TP Treatment planner, PR Production, QC Quality check, DI Dispatch, FS Field sales, DS Distributor, DE Dentist, CS Clinic staff, PA Patient.

`●` has it. `○` has it, limited by scope (section 3). Blank does not have it.

Direct sales has the same permissions as Field sales in the tables below. Marketing and BDE hold only `products:read` there; their work is in the lead management table that follows.

### Lead management and integrations

Columns: SA Super Admin, AD Admin, SH Sales head, MK Marketing, BD BDE, FS Field sales, KA Direct sales (key accounts), DS Distributor.

| Permission | SA | AD | SH | MK | BD | FS | KA | DS |
|---|---|---|---|---|---|---|---|---|
| `leads:read` | ● | ● | ● | ● | ○ | ○ | ○ | ○ |
| `leads:create` | ● | ● | ● | ● | ● | ● | ● | ● |
| `leads:update` | ● | ● | ● | | ○ | ○ | ○ | ○ |
| `leads:assign` | ● | ● | ● | | | | | |
| `leads:import` | ● | ● | ● | ● | | | | |
| `leads:export` | ● | ● | ● | ● | | | | |
| `activities:create` | ● | ● | ● | | ○ | ○ | ○ | ○ |
| `visits:create` | ● | ● | ● | | | ○ | ○ | |
| `accounts:read` | ● | ● | ● | ● | | | ○ | |
| `accounts:manage` | ● | ● | ● | | | | ○ | |
| `campaigns:read` | ● | ● | ● | ● | | | | |
| `campaigns:manage` | ● | ● | | ● | | | | |
| `spend:manage` | ● | ● | | ● | | | | |
| `leads:review` | ● | ● | ● | | | | | |
| `leads:approve` | ● | ● | | | | | | |
| `integrations:read` | ● | ● | | ● | | | | |
| `integrations:manage` | ● | ● | | | | | | |

### Identity

| Permission | SA | AD | SH | AC | TP | PR | QC | DI | FS | DS | DE | CS | PA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `users:read` | ● | ● | | | | | | | | | | | |
| `users:create` | ● | ● | | | | | | | | | | | |
| `users:update` | ● | ● | | | | | | | | | | | |
| `users:disable` | ● | ● | | | | | | | | | | | |
| `roles:read` | ● | ● | | | | | | | | | | | |
| `roles:update` | ● | | | | | | | | | | | | |
| `audit:read` | ● | ● | | | | | | | | | | | |
| `settings:update` | ● | | | | | | | | | | | | |
| `records:delete` | ● | | | | | | | | | | | | |

### Onboarding and masters

| Permission | SA | AD | SH | AC | TP | PR | QC | DI | FS | DS | DE | CS | PA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `distributors:read` | ● | ● | ● | ● | | | | | | | | | |
| `distributors:manage` | ● | ● | | | | | | | | | | | |
| `leads:read` | ● | ● | ● | | | | | | ○ | ○ | | | |
| `leads:create` | ● | ● | ● | | | | | | ● | ● | | | |
| `leads:update` | ● | ● | ● | | | | | | ○ | ○ | | | |
| `leads:review` | ● | ● | ● | | | | | | | | | | |
| `leads:approve` | ● | ● | | | | | | | | | | | |
| `clinics:read` | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ○ | ○ | ○ | |
| `clinics:create` | ● | ● | | | | | | | | | | | |
| `clinics:update` | ● | ● | | | | | | | | | | | |
| `doctors:read` | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ○ | ○ | | |
| `doctors:create` | ● | ● | | | | | | | | | | | |
| `doctors:update` | ● | ● | | | | | | | | | | | |
| `products:read` | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | |
| `products:manage` | ● | ● | | | | | | | | | | | |
| `pricelists:read` | ● | ● | | ● | | | | | | ○ | ○ | | |
| `pricelists:manage` | ● | ● | | ● | | | | | | | | | |

### Cases, files and planning

| Permission | SA | AD | SH | AC | TP | PR | QC | DI | FS | DS | DE | CS | PA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `patients:read` | ● | ● | | | ● | ● | ● | ● | | | ○ | ○ | |
| `patients:create` | ● | ● | | | | | | | | | ● | ● | |
| `patients:update` | ● | ● | | | | | | | | | ○ | ○ | |
| `plans:read` | ● | ● | | ● | ● | ● | ● | ● | | | ○ | ○ | ○ |
| `plans:create` | ● | ● | | | | | | | | | ○ | ○ | |
| `files:read` | ● | ● | | | ● | ● | | | | | ○ | ○ | |
| `files:upload` | ● | ● | | | ● | | | | | | ○ | ○ | |
| `scans:hold` | ● | ● | | | | | | | | | | | |
| `setups:upload` | ● | ● | | | ● | | | | | | | | |
| `setups:approve` | | | | | | | | | | | ○ | | |

Notes:

- A distributor does **not** see patients or clinical records. It sees its dentists, clinics, case counts and its own invoices.
- `setups:approve` belongs to the treating dentist only. Admin cannot approve a clinical plan on a dentist's behalf.

### Production, inventory and dispatch

| Permission | SA | AD | SH | AC | TP | PR | QC | DI | FS | DS | DE | CS | PA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `sets:read` | ● | ● | | | ● | ● | ● | ● | | | ○ | ○ | ○ |
| `orders:read` | ● | ● | | | | ● | ● | ● | | | | | |
| `orders:create` | ● | ● | | | | ● | | | | | | | |
| `batches:create` | ● | ● | | | | ● | | | | | | | |
| `qc:decide` | ● | ● | | | | | ● | | | | | | |
| `stock:read` | ● | ● | | ● | | ● | ● | ● | | | | | |
| `stock:manage` | ● | ● | | | | ● | | | | | | | |
| `machines:read` | ● | ● | | | | ● | ● | | | | | | |
| `machines:manage` | ● | ● | | | | ● | | | | | | | |
| `dispatch:read` | ● | ● | | | | ● | ● | ● | | | ○ | ○ | ○ |
| `dispatch:create` | ● | ● | | | | | | ● | | | | | |
| `dispatch:receive` | ● | ● | | | | | | | | | ○ | ○ | |
| `schedule:update` | ● | ● | | | | ● | | | | | ○ | ○ | |

### Tracker, billing, notifications and reports

| Permission | SA | AD | SH | AC | TP | PR | QC | DI | FS | DS | DE | CS | PA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `checkins:read` | ● | ● | | | ● | | | | | | ○ | ○ | ○ |
| `checkins:create` | | | | | | | | | | | | | ○ |
| `checkins:decide` | | | | | | | | | | | ○ | | |
| `invoices:read` | ● | ● | | ● | | | | | | ○ | ○ | | |
| `invoices:manage` | ● | ● | | ● | | | | | | | | | |
| `payments:record` | ● | ● | | ● | | | | | | | | | |
| `notifications:manage` | ● | ● | | | | | | | | | | | |
| `reports:operations` | ● | ● | | | ● | ● | ● | ● | | | | | |
| `reports:sales` | ● | ● | ● | | | | | | ○ | ○ | | | |
| `reports:finance` | ● | ● | | ● | | | | | | ○ | | | |

A dentist's `invoices:read` and `pricelists:read` apply only when the dentist's clinic is **direct**. For a clinic that belongs to a distributor, the API returns no price or invoice data to the dentist. **Settled.**

## 3. Scope

Scope is applied inside the database query. A record outside a user's scope is returned as "not found" (404), never "forbidden" (403), so its existence is not revealed.

| Role | Scope |
|---|---|
| Super Admin, Admin | Everything |
| Sales head | All leads, accounts and distributors |
| Accounts | All invoices, payments, price lists |
| Treatment planner, Production, Quality check, Dispatch | All cases and sets, clinical and production fields only. No prices |
| Marketing | All leads, campaigns and spend, read-only on leads |
| BDE | Leads assigned to them |
| Field sales | Leads they own; clinics and doctors they onboarded |
| Direct sales | Their own accounts, and the leads, clinics and doctors under them |
| Distributor | Leads, clinics, doctors and invoices of its own distributor account. No patients |
| Dentist | Own doctor record, own clinics, own patients and everything under them |
| Clinic staff | The patients of the dentist they are linked to |
| Patient | Own patient record, own plans, sets, dispatches and check-ins |

The scope values travel in the sign-in token: `distributorId`, `doctorId`, `patientId`. Services filter on them and never trust an id sent by the client for scope.

## 4. Field-level rules

Some fields are hidden even when the record is visible.

| Field group | Hidden from |
|---|---|
| Prices, invoice amounts, payment status | Treatment planner, Production, Quality check, Dispatch, Sales head, Field sales, Clinic staff, Patient, and dentists of distributor clinics |
| Patient mobile and date of birth | Production, Quality check, Dispatch (they see name and patient code only) |
| Clinical photos, x-rays, scans | Distributor, Sales, Accounts, Dispatch |
| Other dentists' patients | Every dentist |

## 5. Rules for changing access

- Only Super Admin changes role permissions. The change takes effect at the user's next sign-in or token refresh.
- Changing a user's role signs that user out everywhere.
- Disabling a user signs them out everywhere and blocks sign-in.
- All of these are written to the audit log with before and after values.

<!--EXT2-->
## 6. Roles and permissions added in version 2.0

Six roles are added, making 22. The level rule is unchanged: a user manages only roles below their own level.

| Role | Level | What it is for |
|---|---|---|
| Production head | 55 | Schedules, releases and recalls; approves documents and non-conformance closure |
| Planning lead | 55 | Allocates cases and does second review |
| Support agent | 50 | Works the support desk for all users |
| Purchase officer | 50 | Requisitions, purchase orders and goods receipts |
| Management | 50 | Read-only dashboards, forecasts and unit economics |
| Distributor staff | 35 | Sales, accounts or support inside one distributor, created by its owner |

A distributor owner manages its own Distributor staff and nobody else. Distributor staff can never see another distributor, any price list but their own, or clinical records.

New permissions, by module. Each is added to `permissions.js` and granted to the roles shown.

| Module | Permissions | Granted to |
|---|---|---|
| Partner management | `partner:prices`, `partner:read`, `partner:review`, `partner:staff`, `schemes:manage` | Distributor, Distributor staff (by staff role), Sales head, Admin |
| White-label branding | `brand:approve`, `brand:edit`, `brand:read`, `partnerbilling:manage` | Distributor (white label), Marketing, Admin |
| Store and asset library | `assets:manage`, `assets:read`, `kits:manage`, `store:order`, `store:read` | Distributor, Dentist, Field and direct sales, Marketing, Admin |
| Support desk and complaints | `tickets:create`, `tickets:manage`, `tickets:read`, `tickets:reply` | Everyone creates; Support agent, team owners, Admin manage |
| Finance extensions | `accounts:export`, `credit:manage`, `credit:release`, `creditnotes:manage`, `einvoice:manage`, `invoices:pay`, `payouts:approve`, `payouts:read` | Accounts, Admin; customers pay their own invoices |
| Marketing automation | `audiences:manage`, `consent:manage`, `events:manage`, `journeys:manage`, `marketing:read`, `referrals:create` | Marketing, Sales head, Admin |
| Calling workspace and AI playbooks | `ai:audit`, `ai:manage`, `calls:score`, `leads:call` | BDE, Sales head, Admin |
| Sales performance | `accounts:read`, `agreements:send`, `expenses:claim`, `prices:approve`, `proposals:create`, `sales:forecast`, `sales:plan`, `targets:manage` | Field sales, Direct sales, Sales head, Admin |
| Clinical extensions | `files:upload`, `library:read`, `patients:create`, `patients:transfer`, `planning:allocate`, `plans:create`, `plans:read`, `scans:connect`, `setups:approve`, `suitability:answer`, `suitability:ask` | Dentist, Clinic staff, Treatment planner, Planning lead |
| Patient engagement | `checkins:decide` | Patient (own data), Dentist, Clinic staff |
| Logistics | `dispatch:create`, `dispatch:pack`, `dispatch:read`, `dispatch:returns`, `scans:connect` | Dispatch, Support agent, Production head |
| Manufacturing execution and quality system | `documents:manage`, `floor:read`, `floor:scan`, `machines:read`, `qc:check`, `quality:manage`, `schedule:manage`, `trace:read`, `trace:recall` | Production, Quality check, Production head, Admin |
| Purchasing and costing | `costs:read`, `purchase:order`, `purchase:read`, `purchase:receive`, `purchase:request` | Purchase officer, Production head, Accounts |
| Learning and knowledge | `knowledge:approve`, `knowledge:read`, `learning:manage`, `learning:read` | Everyone reads by audience; Marketing and Planning lead manage |
| Platform, privacy and management insight | `apikeys:manage`, `insight:read`, `privacy:manage`, `reports:schedule` | Super Admin; Management reads insight |

`trace:recall`, `apikeys:manage`, `privacy:manage` and `credit:release` are sensitive: only the roles named can hold them, and every use is in the audit log.
