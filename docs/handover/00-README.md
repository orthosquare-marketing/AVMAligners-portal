# AVMAligners Portal — handover documents

Prepared for the developer taking over the build. **Version 2.0, 24-11-2026.**

> **This replaces version 1 of 22-11-2026.** The differences are not cosmetic. Three roles and an
> entire patient app have gone, the partner model has been replaced, and the medicolegal approval
> has moved. Do not build from the earlier version.

## Read in this order

| # | Document | What it answers |
|---|---|---|
| 01 | [Product requirements](01-product-requirements.md) | What the portal must do, for whom, and what is out of scope |
| 02 | [Roles and permissions](02-roles-and-permissions.md) | The fifteen roles, eighteen logins, and who can do what |
| 03 | [System architecture](03-system-architecture.md) | Services, hosting, storage, the worker and security |
| 04 | [Data model](04-data-model.md) | Eleven databases, their collections and how they link |
| 05 | [API specification](05-api-specification.md) | Every endpoint, per service |
| 06 | [Workflows](06-workflows.md) | Forty-six workflows and sixteen entity lifecycles |
| 07 | [Screens](07-screens.md) | 171 screens by role, with what each can and cannot do |
| 08 | [Migration plan](08-migration-plan.md) | What moves from the old portal and the print register |
| 09 | [Build plan and acceptance tests](09-build-plan-and-acceptance-tests.md) | Phases, and the checks that prove each is done |
| 10 | [Non-functional requirements](10-non-functional-requirements.md) | Security, privacy, records, load, recovery and cost |
| 11 | [Decisions log](11-decisions-log.md) | What is settled, what changed on 24-11-2026, what is still open |
| 12 | [Services checklist](12-services-checklist.md) | Every service the portal can offer, by team |


## What changed on 24-11-2026

| Change | What it means |
|---|---|
| No dentist, clinic staff or patient logins | Three roles and the whole patient app are gone. The dentist and the patient are records inside a case, entered and held by the channel partner. |
| One channel partner role | Distributor, channel partner and OEM are one role with one login. Branded or white label is a setting on the account, changeable per case until approval. |
| Our orthodontist approves | The plan is built by a planner and approved by the in-house orthodontist. That approval is the medicolegal record. Nothing is made without it. |
| Planning Team included | The planner is a role in its own right, with its own screens, separate from the orthodontist who approves. |
| Marketing is outside | Leads arrive from the marketing team and land in the call centre. There are no campaign or budget screens in the portal. |
| The factory chain | Purchase, Inventory, Production, Quality Check, Dispatch and Logistics are six separate roles with six separate sets of screens. Inventory and Logistics are new. |
| Traceability extended | The software version and the change log now sit inside traceability, for ISO and medical device certification. |
| Partner status API | A partner's own website can show a case status, after a one-time code to the patient, under the partner's brand. |


## The product in five lines

1. Marketing hands leads to the call centre, and the sales team turns them into channel partners.
2. A channel partner — distributor, channel partner or OEM, one role — creates cases for its dentists and patients. Neither the dentist nor the patient has a login.
3. Our planner builds the treatment plan and our in-house orthodontist approves it. That approval is the medicolegal record, and nothing is made without it.
4. The factory runs the chain: purchase, inventory, production, quality check, dispatch, logistics.
5. Every set is traceable from the material lot it was made from to the partner it reached.

## The shape of it

| | |
|---|---|
| Roles | 15 |
| Logins | 18 |
| Dentist, clinic staff or patient logins | 0 |
| Modules | 25, across 4 phases |
| Databases | 11, on one cluster |
| Screens | 171 |
| Workflows | 46 |
| Services offered | 192 |

## How to read the markers

| Marker | Meaning |
|---|---|
| **Settled** | Decided by the business owner. Do not change without asking. |
| **Assumed** | A sensible default chosen while writing. Confirm before building on it. |
| **Open** | Not decided. Listed in [11](11-decisions-log.md) with what it blocks. |

## What already exists in this repository

`identity`, `masters` and `onboarding` are built, behind the gateway, with a React web app and 36
end-to-end checks. The machinery is right. The model is not: the code still carries dentist, clinic
staff and patient roles, and a distributor separate from a channel partner. [09](09-build-plan-and-acceptance-tests.md)
lists what must change, and in what order.

## Owner

Gaurav Kudalkar, AVMSmiles. All figures, partners, patient codes and dates in these documents are
sample data. No real patient or clinic data appears anywhere in them.
