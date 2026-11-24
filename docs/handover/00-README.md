# AVMAligners Portal — handover documents

Prepared for the developer taking over the build. Version 1, 22-11-2026.

## Read in this order

| # | Document | What it answers |
|---|---|---|
| 01 | [Product requirements](01-product-requirements.md) | What the portal must do, for whom, and what is out of scope |
| 02 | [Roles and permissions](02-roles-and-permissions.md) | Who can see and do what |
| 03 | [System architecture](03-system-architecture.md) | Services, how they talk, hosting, storage, security |
| 04 | [Data model](04-data-model.md) | Every collection and field, and how they link |
| 05 | [API specification](05-api-specification.md) | Every endpoint per module |
| 06 | [Workflows](06-workflows.md) | Step-by-step flows with diagrams |
| 07 | [Screens](07-screens.md) | Every screen per role, its fields and actions |
| 08 | [Migration plan](08-migration-plan.md) | What moves from the old portal and the print register |
| 09 | [Build plan and acceptance tests](09-build-plan-and-acceptance-tests.md) | Phases and the checks that prove each is done |
| 10 | [Non-functional requirements](10-non-functional-requirements.md) | Security, privacy, backups, load |
| 11 | [Decisions log](11-decisions-log.md) | What is settled, what is assumed, what is still open |
| 12 | [Services checklist](12-services-checklist.md) | Every service the portal can offer, by team, ticked for review |

## What already exists

Phase 1 is built and merged on `main`: identity, masters, onboarding, gateway and a React web app, with 36 end-to-end checks. See the repository `README.md`, `docs/ARCHITECTURE.md` and `docs/API.md`.

These handover documents describe the whole product. Where they differ from the phase 1 code, the documents are the target and the code must change. The differences are listed in [09](09-build-plan-and-acceptance-tests.md#changes-needed-to-phase-1-code).

## The product in five lines

1. Distributors and the sales team onboard dentists and clinics.
2. Dentists add patients, send scans and prescriptions, approve treatment plans and follow their cases.
3. The Flexismile manufacturing team plans, prints, checks and dispatches aligners, and manages stock and machines.
4. Patients follow their treatment in an Android or iPhone app.
5. Every aligner set is tracked from "planned" to "received", so pending work and print capacity are always known.

## How to read the markers

| Marker | Meaning |
|---|---|
| **Settled** | Decided by the business owner. Do not change without asking. |
| **Assumed** | A sensible default chosen while writing. Confirm before building on it. |
| **Open** | Not decided. Listed in the decisions log with what it blocks. |

## Owner

Gaurav Kudalkar, AVMSmiles. All questions on scope and business rules go to him.
