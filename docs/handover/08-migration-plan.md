# 08 — Migration plan

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

## 1. What moves, and what does not

| What | From where | How it lands |
|---|---|---|
| Channel partners | The distributor and OEM lists from the old Flexismile portal and the sales sheets. | One record per partner, de-duplicated on GSTIN. Branded or white label set per account. One login created per partner; everyone else loses theirs. |
| Dentists | Dentist and clinic records in the old portal. | Become records under the partner that serves them. Their logins are not carried over. A dentist served by two partners becomes two records, one under each. |
| Price lists | The current rate sheets. | Loaded as one list per customer type and supply type, in force from the cut-over date. History is not reconstructed. |
| Cases in flight | Cases with sets still to be made or delivered. | Carried in at their current state, with the plan version and the approval evidence attached as a document. A case whose approval evidence cannot be produced is carried in on hold. |
| Closed cases | Everything already delivered. | Not carried in. Kept read-only in the old system for its retention period, then deleted under the same rule. |
| Print register | The spreadsheet the factory runs on today. | Becomes the opening set of print orders and the pending queue. Rows without a traceable case are listed for the Manufacturing Head to resolve before cut-over, not imported. |
| Stock | The physical count on cut-over day. | Entered as opening lots. Lots already in use keep their supplier lot numbers; lots with no number are entered as "pre-system" and cannot be used for a new batch. |
| Machines | The printer, former, trimmer and cure list. | Entered with current hours, last service and last calibration. Anything undated is scheduled for calibration in week one. |
| Open invoices and receipts | The accounts ledger. | Opening balances per partner, not line by line. Old invoices stay in the accounting package. |
| Users | Staff logins in the old portal. | Created fresh against the fifteen roles. No password is migrated. Everyone starts on a temporary password. |


## 2. The order of it

| When | What happens |
|---|---|
| Four weeks before | Freeze new role creation in the old portal. Publish the partner and dentist de-duplication list for the sales head to correct. |
| Two weeks before | Dry run the import into a staging database. Reconcile counts: partners, dentists, cases in flight, sets pending. Every difference is explained in writing or the date moves. |
| One week before | Train each head on their own screens using the staging data. Print the work instructions that reference the new screens. |
| Cut-over day | Old portal goes read-only at close of business. Physical stock count. Final import. Both systems reconciled before anyone goes home. |
| First week | Both systems open: new portal for everything new, old portal read-only for lookups. Daily reconciliation of sets made and dispatched. |
| Week four | Old portal access reduced to the Manufacturing Head and Accounts. Retention clock starts. |


## 3. The rules of the cut-over

- **Nothing is imported that cannot be traced.** A print-register row with no case, a lot with no number, a case with no approval evidence — each is listed and resolved by a named person, or it is left behind.
- **No password is migrated.** Everyone starts on a temporary password, shown once.
- **No dentist, clinic staff or patient login is created.** Those roles do not exist in this portal.
- **A case carried in on hold stays on hold** until the approval evidence is attached. It cannot be printed.
- **Counts are reconciled in writing before go-live.** Partners, dentists, cases in flight, sets pending, stock lots. Any difference is explained or the date moves.

## 4. What stays behind

The old portal goes read-only on cut-over day and stays reachable for lookups for four weeks, then
for the Manufacturing Head and Accounts only. Its retention clock starts on cut-over day and it is
deleted under the same rule as everything else.

## 5. The risk nobody should underestimate

The print register is a spreadsheet that the factory has been running on. The people who keep it
have conventions that are not written down anywhere. Two weeks before cut-over, sit with them and
write those conventions down. Every migration of this kind that goes wrong, goes wrong there.
