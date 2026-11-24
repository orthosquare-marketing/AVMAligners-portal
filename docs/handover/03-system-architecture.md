# 03 — System architecture

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

Two rules govern every choice here: **pay for one of everything**, and **write down who, when and
which version, and never delete**. The first keeps the bill near ₹10,000 a month. The second is what
makes ISO 13485 straightforward instead of painful.

## 1. The fourteen design rules

| Rule | What it means | Serves |
|---|---|---|
| **A01 One app, many modules** | Every module keeps its own database and its own API, but they all run inside one Node process on one Azure plan. The boundaries stay; the server bill does not multiply. | Saves money |
| **A02 The front end rides along** | The built React app is served as static files by the same Express app. No second host, no CORS, one deployment, one domain. | Saves money |
| **A03 One database cluster** | All databases sit on one MongoDB Atlas cluster in Mumbai. Separate databases cost nothing extra on the same cluster. | Saves money |
| **A04 The worker lives in the app** | Timed jobs run inside the same app with Always On, and take their work from a queue. No separate function app to keep warm. | Saves money |
| **A05 Nothing is ever deleted** | Records change state. Delete is a state, not an operation. No record leaves the database except by the retention job, which writes down what it removed. | Helps certification |
| **A06 Every record says who and when** | Created by, created at, changed by, changed at, a version number, and the software release that wrote it. On every document, in every database, from the first line of code. | Helps certification |
| **A07 The audit log can only be added to** | A separate database user with insert-only rights writes the audit log. The application cannot change or remove an audit event even if someone wants it to. | Helps certification |
| **A08 An approval is a sealed record** | The orthodontist re-enters the password at the moment of approval. The record holds the name, registration number, plan version, scan reference, a fingerprint of exactly what was approved, the time and the address it came from. It is never edited. | Helps certification |
| **A09 Every case carries its software version** | The release of the portal, the version of the planning software and the scanner model are stamped on the case. An auditor asking "what made this tray" gets an answer. | Helps certification |
| **A10 One query walks the whole chain** | Material lot to set to box to consignment to partner, forwards and backwards. Built as a single query, not a report somebody assembles by hand. | Helps certification |
| **A11 Every release is a record in the database** | Version, date, what changed, who approved it, and a link to the test report. Written automatically when the release is deployed. | Helps certification |
| **A12 Access is checked in the API, not the menu** | The login token, the permission and the ownership of the record are checked on every request. A record outside a user’s scope returns "not found", so its existence is not revealed. | Both |
| **A13 No transactions across databases** | A step that fails undoes the steps before it, in code, and writes an audit event for the undo. This is already the rule in the codebase. | Both |
| **A14 Everything stays in India** | Azure Central India, Atlas Mumbai. Patient data does not leave the country. | Helps certification |


## 2. What runs where

| Resource | What runs on it | Why this and not something larger |
|---|---|---|
| App Service plan, Linux, Central India | The gateway, every service as a module in one Node process, the worker, and the built React app as static files. | One machine. Always On keeps the worker alive. A deployment slot gives staging at no extra cost. |
| MongoDB Atlas, Mumbai, M10 | All eleven databases. | A replica set, so transactions work inside a database. Backups and point-in-time restore included. Separate databases cost nothing extra on one cluster. |
| Blob Storage | Three containers: media, docs, exports. Lifecycle rules per container. | Retention becomes a storage rule instead of a job somebody has to remember. |
| Storage Queues | Five queues, one per job type. | A stuck courier API must not delay a payment reminder. |
| Key Vault | Connection strings, WATI, Razorpay, IRP credentials. | No secret in the repository, and every access logged. |
| Application Insights | Errors and slow requests, sampled, thirty days. | Enough to find a fault, not enough to become a line item. |
| GitHub Actions | Build, test, deploy to the slot, swap. | The test run is the evidence that a release was tested. |


## 3. How a request travels

1. The browser loads the React app from the App Service.
2. It calls `/api/<service>/...` on the same domain. No CORS, no second host.
3. The gateway checks the token, the permission and the rate limit, and refuses anything addressed to an internal route.
4. The service reads and writes **only its own database**, and calls another service through its API when it needs to.
5. Anything slow, external or scheduled goes on a queue for the worker.
6. Every create, update, approval and access change writes an audit event on the way out.

## 4. One process, many services

Each service keeps its own database, its own API and its own router. They run **inside one Node
process** on one Azure plan. `internalCall` becomes a direct call instead of a network hop: faster,
and one bill instead of five. If a service ever needs to scale alone it moves out to its own plan
with its routes and database unchanged — but not before then.

**There are still no transactions across services.** A step that fails undoes the steps before it,
in code, and writes an audit event for the undo.

## 5. The worker

| Queue | Work on it | Runs | Why it is separate |
|---|---|---|---|
| q-notify | Reminders to partners, case state changes, invoice due reminders, statement mails. | Every five minutes | A stuck WhatsApp template must not hold up anything else. |
| q-einvoice | Filing an invoice with the IRP and storing the number. Retries on failure with the reason kept. | On invoice creation, then retry | The IRP goes down. The invoice must not. |
| q-courier | Booking a consignment, pulling tracking events, watching delivery against the run-out date. | Every thirty minutes | Polling is slow and chatty; keep it away from the rest. |
| q-docs | Building invoice PDFs, labels, manifests, statements and report exports. | On demand | The only queue that produces files. |
| q-house | Due-to-order checks, scan retention and deletion, overdue ticket escalation, daily and weekly reports, stock reorder alerts. | Nightly and hourly | Each run writes what it did, including what it deleted and under which rule. |


## 6. Files

| Kind | Where | Retention |
|---|---|---|
| Photos and x-rays | Blob, `media` container, resized on upload | Case retention period, a system setting |
| Scan files and the 3D setup | **Outside the portal**, in the existing service | The portal stores a link and a version only |
| Invoices, labels, manifests | Blob, `docs` container, soft delete and versioning on | Statutory period |
| Report exports | Blob, `exports` container | 30 days, then deleted by lifecycle rule |

Uploads go **direct to storage** with a short-lived signed URL. The API never carries the file body.

## 7. Security

- Access token 15 minutes; refresh token 7 days, single use, stored hashed.
- Passwords hashed with bcrypt; five wrong attempts lock the account for 15 minutes.
- Authenticate → permission → ownership scope in the query. Out of scope returns 404.
- Internal routes blocked at the gateway.
- Secrets in Key Vault, never in the repository.

## 8. What we are deliberately not buying

| Not this | Why not | Instead |
|---|---|---|
| Azure Cosmos DB for MongoDB | Billed per request unit. A chatty application with a lot of small reads costs several times an Atlas cluster of the same size. | MongoDB Atlas on one cluster. |
| Cloudinary on a paid plan | At nine photos and two x-rays a case, a thousand cases a month passes the free tier within weeks, and the paid plan is more than the whole rest of the bill. | Azure Blob Storage, with the app resizing the photo on upload. |
| Vercel for the API | Serverless requests time out. Scan handovers, PDF building and the worker all fight the limit. | Express on App Service, with the React build served by the same app. |
| One App Service per module | Five services means five plans and five idle machines. The module boundary is a code decision, not a hosting decision. | One plan, modules inside one process. |
| Azure Functions on the Premium plan | Premium exists to keep functions warm. A worker already running in the app is warm by definition. | The worker inside the app, with Always On. |
| Keeping scan files in the portal | Forty megabytes a case, downloaded repeatedly, is mostly an egress bill. | Scans stay in the outside service. The portal stores the link and the version. |
| A staging environment running all month | A second plan doubles the compute bill for something used an hour a week. | A deployment slot on the same plan. Free. |


## 9. What it costs

| Item | What it does | Indicative cost |
|---|---|---|
| Azure App Service, Linux, one plan | Runs the API, the worker and the React app. Start on B1 while the factory is small; move to B2 or P1v3 when case volume grows. | ₹1,200 a month |
| MongoDB Atlas, Mumbai region | All eleven databases on one M10 cluster. Backups, point-in-time restore and a replica set are included. | ₹5,100 a month |
| Azure Blob Storage | Photos, x-rays, invoice PDFs, labels, manifests, pack photos. Lifecycle rules move old files to cool storage and delete on schedule. | ₹400 a month |
| Azure Storage Queue | One queue per job type. Failed work waits and is retried instead of vanishing. | ₹50 a month |
| Application Insights | Errors and slow requests. Sampling on, thirty days of retention. | ₹300 a month |
| GST e-invoicing provider | One call per invoice to get the IRN, and the e-way bill for dispatches above the value limit. | [[quote to confirm]] |
| Courier aggregator | Booking, waybill, label and tracking across couriers through one API. | Per shipment, no monthly fee |
| WATI | Already paid for. Partner notifications and the one-time code for the status API. | Already running |
| Razorpay | Already decided. Pay links on invoices and statements. | About 2% per transaction |
| Transactional email | Logins, password resets, statements. Brevo or Zoho free tier is enough at this volume. | ₹0 to start |
| Domain and certificate | App Service managed certificate is free and renews itself. | ₹100 a month |


About **₹10,000 a month** in phase 1, rising to about **₹25,000** at two thousand cases a month.
Figures are indicative for Central India and Mumbai as at 24-11-2026 and must be confirmed before purchase.
