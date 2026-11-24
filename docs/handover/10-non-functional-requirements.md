# 10 — Non-functional requirements

## 1. Privacy and the DPDP Act

The portal holds health data of identifiable patients, including children. This section sets the minimum. It is not legal advice; the company's legal adviser should review it before go-live. The Grievance Officer named in the AVMSmiles privacy policy is the contact for data requests.

| Requirement | How |
|---|---|
| Consent | The patient accepts a clear notice in the app at first use: what is held, why, for how long, who sees it. The version accepted and the time are stored |
| Children | A patient under 18 needs a parent or guardian. The guardian's mobile receives the invitation and the guardian gives consent. No tracking or advertising of any kind |
| Purpose limit | Data is used for treatment, production, dispatch and billing only. Patient data is never used for marketing without a separate consent |
| Least access | Each role sees only what its work needs (document 02). Production sees patient code and name only |
| Right to access | A patient can ask in the app for a copy of their data. The request goes to Admin and is logged |
| Right to correction and erasure | A patient can ask for correction or deletion. Deletion is done by Super Admin after checking legal retention duties, and is logged |
| Retention | STL scans: 180 days from upload. Other periods are **open** and must be set with the legal adviser: clinical records, photos, invoices |
| Breach | A suspected breach is reported to the Grievance Officer at once. The audit log and access logs must allow the affected records to be identified |
| Data location | Database, files and backups stay in India |
| Processors | WhatsApp, email and push providers receive only what the message needs. No clinical details in message text |
| Sales leads | A lead's contact details are personal data too. The lead is told who is calling and why; a request not to be contacted is recorded and respected on every channel. Calling and messaging must follow the telecom rules on commercial communication; the legal adviser should confirm what consent each lead source gives |
| Call recordings | Recorded only with notice to the person called. Recordings stay with the telephony provider or LumenAI; the portal holds a link |
| Partners | LumenAI, MCube, Exotel and the ad platforms receive lead data only, under a written agreement. Patient data is never sent to them |

Message wording rule: a notification never contains a diagnosis or clinical detail. "Your next aligner box has been dispatched" is fine.

## 2. Security

| Area | Requirement |
|---|---|
| Transport | HTTPS only. HSTS on |
| Passwords | bcrypt, minimum 10 characters with upper case, lower case and a number. Built |
| Lockout | Five wrong attempts, 15 minutes. Built |
| Sessions | 15-minute access token; single-use refresh token; all sessions end on password change, role change or disable. Built |
| One-time codes | Six digits, valid five minutes, five attempts, stored hashed, rate-limited per number |
| Authorisation | Checked in every service on every request. Scope in the query. Built for phase 1 |
| Input | Every body validated. File type and size checked before an upload link is given |
| Files | Private buckets. Short-lived signed links only. Links are never stored or logged |
| Secrets | In a secrets manager. Rotated on staff change |
| Internal calls | Shared key today; move to per-service credentials for production |
| Admin accounts | Second-factor sign-in for Super Admin and Admin before go-live. **Recommended** |
| Dependencies | Automated vulnerability alerts on the repository; patch within 14 days for high severity |
| Logs | No passwords, tokens, codes, signed links or patient contact details in logs |
| Testing | An independent security test before go-live |

## 3. Audit

- Append-only. No update or delete route. Built.
- Records who, when, from where, what, and before and after for access and price changes.
- Kept for at least three years (**assumed**).

## 4. Availability and recovery

| Item | Target (**assumed**, confirm) |
|---|---|
| Availability | 99.5% in business hours |
| Backups | Database: daily, kept 30 days, with point-in-time recovery. Media bucket: versioning on |
| Recovery point | At most 1 hour of data lost |
| Recovery time | Back within 4 hours |
| Restore test | Once a quarter |

The scan bucket is deliberately **not** backed up beyond its 180 days.

## 5. Performance and load

Planning figures (**assumed**, from the current portal's scale):

| Measure | Figure |
|---|---|
| New leads | Up to 20,000 a month |
| Dentists | Up to 2,000 |
| New patients | Up to 1,500 a month |
| Aligner sets created | Up to 60,000 a month |
| Patient app users active | Up to 20,000 |
| File uploads | Up to 20,000 a month; STL up to 150 MB each |

Targets: list and detail pages answer in under 1 second at these volumes; uploads resume after a dropped connection.

## 6. Usability

- Web app works on desktop and tablet, current Chrome, Edge and Safari.
- Patient app supports Android 9 and later, iOS 15 and later (**assumed**).
- Plain English. No codes shown to patients except their patient code.
- Every destructive action asks for confirmation and, where the workflow needs one, a reason.

## 7. Operations

- Three environments: local, staging, production. Production data is never copied to the others.
- Health endpoint on every service. Built.
- Central logs and alerts for: service down, failed event deliveries, failed messages, lifecycle job errors, low disk on the database.
- Deployments from the main branch after CI passes, with a rollback step.

## 8. Costs to plan for

No figures are given here; they depend on the provider chosen.

- Cloud hosting, database and storage in India.
- WhatsApp provider charges per conversation.
- Email provider.
- Google Play developer account (one-time fee) and Apple developer account (yearly fee).
- Security test.

<!--EXT2-->
## 9. Added in version 2.0

- **Payments.** Card and bank details are entered only on the payment partner's page. The portal stores a reference, never the details.
- **Two-step sign-in** is required for all staff and distributor owners, and available to dentists.
- **Partner keys** are limited to named endpoints, stored hashed, and can be revoked at once. A test environment is provided for partners.
- **White-label confidentiality.** A partner-branded case must not expose the company name to that partner's dentists or patients on any screen, message or document. The exception is any line the law requires on a label or insert.
- **Regulatory records.** The device history record, controlled documents, training records, calibration and recall records are kept for the period the medical device rules require. **Open:** the exact period and licence details, with the regulatory consultant.
- **AI use.** LumenAI answers only from approved articles, stops on the handover rules, and every AI message is kept for audit.
- **Consent before contact.** No campaign message, AI call or conversion event is sent without a consent record for that channel.
- **Agreements** signed on screen are stored with the signer, time and method.
- **Load.** The marketing forms and the courier and payment webhooks are public endpoints. They are rate-limited and verified by signature.
