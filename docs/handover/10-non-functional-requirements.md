# 10 — Non-functional requirements

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

## Security

- Access token 15 minutes, refresh token 7 days and single use, stored hashed.
- Passwords hashed with bcrypt. Five wrong attempts lock the account for 15 minutes.
- Authenticate, then permission, then ownership scope inside the database query. A record outside scope returns 404, never 403.
- SUPER_ADMIN_ONLY permissions cannot be granted to any other role, by anyone.
- A user may create or change only users whose role level is below their own.
- Secrets in Azure Key Vault. None in the repository, none in an environment file on a laptop.
- Uploads go direct to storage with a short-lived signed URL, scanned for type and size before the record is accepted.
- Rate limit at the gateway. Internal routes refused from outside.

## Privacy and the DPDP Act

- All data in India: Azure Central India, MongoDB Atlas Mumbai.
- Consent recorded on the patient record, with who recorded it and when. A guardian is recorded where the patient is under 18.
- Scan files are kept for 180 days from delivery and then deleted by the retention job, which writes down what it removed and under which rule.
- Photos and x-rays follow the case retention period, set as a system setting, not hard-coded.
- A data request is a record in avm_identity with the response and the date, so the Grievance Officer can answer within the statutory period.
- No patient messaging from the portal. The partner talks to the patient.

## Keeping records

- Nothing is deleted. State changes only, with who, when and why.
- Every document carries created by, created at, changed by, changed at, a version and the software release that wrote it.
- The audit log is written by a database user with insert-only rights on that collection.
- Approvals are sealed records with a payload fingerprint and are never editable, by any role.
- Every deployment writes a release record: version, date, what changed, who approved, link to the test report.

## Performance and load

- Planning figures: 2,000 cases a month, 40,000 sets a month, 80 concurrent users, 18 logins by role.
- A list page answers in under one second at the ninety-fifth percentile on the planning figures.
- Anything slower than two seconds goes on a queue and tells the user it is being prepared.
- The shop floor must work on a tablet over clinic wifi. Station scans retry and never lose a scan.

## Availability and recovery

- Target 99.5 per cent in working hours. The factory is not a 24-hour operation and does not need 99.9.
- Atlas point-in-time restore. A restore is practised once a quarter and the practice is recorded.
- Blob storage with soft delete and versioning on the docs container.
- A failed external service (IRP, courier, WhatsApp) never blocks the portal. The work waits on its queue and shows the reason.

## How it looks and reads

- Dates shown to users are DD-MM-YYYY. The API uses ISO 8601.
- Money in whole rupees with Indian digit grouping.
- The brand is written AVMSmiles; the product is AVMAligners.
- Works on the current versions of Chrome and Edge on Windows, and Safari on an iPad. No support for Internet Explorer.
- English only in phase 1.

## Running cost

- The whole system is budgeted at about ₹10,000 a month in phase 1 and about ₹25,000 at 2,000 cases a month.
- Any design choice that doubles the hosting bill needs the Head of Marketing’s agreement before it is built.


## What certification needs from the software

| Requirement | What it asks for | What satisfies it here | Ready by |
|---|---|---|---|
| ISO 13485 clause 4.1.6 | Software used in the quality system has to be validated before use, and again after it changes. | Automated test suite in the repository, a test report per release, and the release log in the database that links the two (A11). | Phase 1 |
| ISO 13485 clause 4.2.4 and 4.2.5 | Documents and records must be controlled: versions, approvals, review dates, and records that cannot be quietly altered. | The document module (M19) with versions and approvals; the no-delete rule and the stamp on every record (A05, A06). | Shape in phase 1, screens in phase 3 |
| ISO 13485 clause 7.5.9 | Traceability: for a given device, which materials, which process, which customer. | The whole-chain query (A10) and the trace keys carried at every step. | Phase 2 |
| ISO 13485 clause 7.5.6 | Process validation where the result cannot be fully verified by inspection. | Machine records with calibration and service dates, operator skills, and the batch record holding resin and sheet lots. | Phase 2 |
| ISO 13485 clause 8.2.1 and 8.5.2 | Complaints and corrective action with cause, action, owner and proof of closure. | The non-conformance record in avm_quality and the product-complaint ticket type in M20. | Phase 2 |
| IEC 62304 | A software lifecycle: requirements, design, testing, problem resolution and change control, written down. | The three documents already built are the requirements half. The release log, the issue tracker and the test reports are the other half. | Running from phase 1 |
| Medicolegal approval | Who, with what qualification, approved this treatment, and exactly what they approved. | The sealed approval record (A08) with the registration number, the plan version, the scan reference and a fingerprint of the approved payload. | Phase 1 |
| DPDP Act 2023 | Patient data held in India, minimum retention, a named Grievance Officer, and a way to answer a data request. | Indian region only (A14), the retention job in q-house, the data_requests collection, and consent recorded on the patient record. | Phase 1 |


Which standard applies is still open — ISO 13485 alone, a CDSCO medical device licence, or CE
marking for export are three different amounts of work. This table is built for the strictest of the
three, because everything in it is cheap now and expensive to retrofit.
