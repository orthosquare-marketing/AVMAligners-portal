# 09 — Build plan and acceptance tests

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

## 1. Changes needed to the existing code

Three services are built and the boundaries are right. The model is not.

| Area | How it stands now | What to change |
|---|---|---|
| Roles in the code are out of date | The architecture file still lists Dentist (30), Clinic Staff (20) and Patient (10), and a Distributor role separate from a channel partner. | Replace with the fifteen roles of 24-11-2026. Dentist and patient become records, not users. Distributor, channel partner and OEM become one role. |
| Three services exist | identity, masters and onboarding are built, each with its own database and port, behind a gateway. | Keep the boundaries and the databases. Run them as modules inside one process on one Azure plan instead of separate containers. |
| The gateway stays | It routes /api//..., rate limits, and blocks /internal routes from the outside. | No change. It becomes the single Express entry point that also serves the React build. |
| The rules in CLAUDE.md hold | Authenticate, then permission, then ownership scope in the query. Audit every create, update, approval and access change. Validate every body with zod. No cross-service transactions. | No change. These are the rules certification will look for, already written down. |
| masters needs widening | It owns clinics, doctors and products. | Clinics and doctors move under the partner. Products, price lists and material items belong with the new partner and stock databases. |
| Nothing is stamped yet | There is no version number, no release field and no soft-state convention in the shared code. | Add the stamp and the soft state to packages/common before the next service is written. This cannot be backfilled honestly. |


**The order matters.** The stamp, the soft state and the insert-only audit user go into
`packages/common` **before the next service is written**. Everything built after that inherits them
for free. Everything built before has to be rewritten, and the records it already wrote cannot be
repaired honestly.

## 2. The build order

| Step | What it covers | Scope | Outcome |
|---|---|---|---|
| Step 0 | Before any new screen | The stamp, the soft state, the insert-only audit user, the release log and the scope helper, all in packages/common. The role list replaced. | A week. Everything after this inherits it. |
| Step 1 | Phase 1, make a case and get it out | M01 identity, M02 partners, M03 leads, M04 sales, M05 case intake, M06 planning, M07 approval, M08 production planning, M09 shop floor, M13 dispatch, M15 billing, M17 price lists, M21 notifications. | A partner can be onboarded, send a case, see it approved, made, dispatched and billed. |
| Step 2 | Phase 2, control the factory and the money | M10 quality, M11 inventory, M12 purchase, M14 logistics, M16 payables, M18 traceability, M22 reports, M24 audit and retention. | This is the step that makes certification possible. Do not let it slip. |
| Step 3 | Phase 3, prove it and open it up | M19 documents and training, M20 support and facility, M23 partner API, M25 management console. | The quality system an auditor reads, and the partner’s own branded status page. |
| Step 4 | Phase 4, the rest of the group | FlexiSmile on the same portal, then Orthosquare and AVMSmiles clinics as partners on it. | No new build, only new accounts. |


## 3. The phases

| Phase | Goal | Modules | Done when |
|---|---|---|---|
| Phase 1 | Make a case and get it out of the door | M01, M02, M03, M04, M05, M06, M07, M08, M09, M13, M15, M17, M21 | A partner can be onboarded, send a case, see it approved, made and dispatched, and be billed for it. |
| Phase 2 | Control the factory and the money | M10, M11, M12, M14, M16, M18, M22, M24 | Inventory, purchase, logistics, quality records, traceability, vendor payments and the reports. |
| Phase 3 | Prove it and open it up | M19, M20, M23, M25 | The quality system an auditor will read, support and facility, the partner API, and the management console. |
| Phase 4 | The rest of the group | — | FlexiSmile on the same portal, then Orthosquare and AVMSmiles clinics as partners on it. |


## 4. Acceptance tests

Written as checks a developer can run. They extend `scripts/e2e.mjs`, which already holds 36.
**Every new record type needs its own "another user cannot see this" check** — that is the rule in
`CLAUDE.md` and it is not optional.

### Step 0 — the foundation

- [ ] A new record in any service carries created by, created at, version and release, written by shared code and not by the service.
- [ ] An attempt to delete any record through any route fails.
- [ ] The application cannot update or remove an audit event, even as Super Admin.
- [ ] The fifteen roles exist; dentist, clinic staff and patient do not.
- [ ] A deployment writes a release record automatically.

### Phase 1 — make a case and get it out

- [ ] A sales head can approve a partner, and the partner gets exactly one login.
- [ ] A partner can create a case, upload nine photos and two x-rays, and enter a scan link and version.
- [ ] A planner can submit a plan and cannot edit it afterwards.
- [ ] The orthodontist must re-enter the password to approve; the approval records the registration number, plan version, scan reference and fingerprint.
- [ ] No print order can be created for a case without an approval.
- [ ] A second partner cannot see the first partner’s case, by id or by list. It returns 404.
- [ ] A print order for a case already made on printer 2 is scheduled on printer 2 unless overridden with a reason.
- [ ] A box cannot be closed with a set that has not been scanned into it.
- [ ] An invoice is raised on approval, at the price list in force on that date, and the e-invoice number is stored.
- [ ] Every one of the above writes an audit event.

### Phase 2 — control the factory and the money

- [ ] A batch cannot start without a resin lot and a sheet lot.
- [ ] Issuing a lot to a batch writes that lot onto every set the batch produces.
- [ ] One query returns, for any material lot, every case, box, consignment and partner it reached.
- [ ] The same query run backwards from a partner returns every lot that reached them.
- [ ] A set on hold cannot be packed. Only quality can release it.
- [ ] A non-conformance cannot be closed without evidence of effectiveness.
- [ ] A requisition above the limit cannot become a purchase order without the higher approval.
- [ ] A goods receipt without a lot number is refused.
- [ ] The retention job deletes scans past 180 days and writes down what it deleted.
- [ ] A mock recall can be run from one screen and produces the partner list in under a minute.

### Phase 3 — prove it and open it up

- [ ] A controlled document has versions, an approval and a review date, and training records against each version.
- [ ] A superseded version cannot be issued to the floor.
- [ ] The partner status API returns the case state under the partner’s brand, after a one-time code, with no file and no mention of us.
- [ ] A wrong or expired code returns the same answer as a code for a case that does not exist.
- [ ] The management console has no button that changes anything.

## 5. Why phase 2 must not slip

Traceability, inventory lots, quality records and the audit and retention module are what
certification actually inspects. A portal that takes cases and bills for them, with no lot records
behind it, is a working business and an unpassable audit. If the calendar has to give, give it from
phase 3.
