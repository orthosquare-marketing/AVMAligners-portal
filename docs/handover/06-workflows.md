# 06 — Workflows

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

Forty-six workflows. Each one says what starts it, who owns it, the steps in order, what it writes
down, and what must never happen in it. The "never" line is the one a reviewer should read first.

## Leadership and administration

### WF-01 · Create or change a user

**Starts when:** A person joins, moves team or leaves  
**Owner:** Admin

1. Admin creates the user with the lowest role and level that does the job, and sets the territory or station.
2. The temporary password is handed over in person or by a separate channel. It is shown once and never stored.
3. The user sets their own password at first sign-in.
4. On a move, Admin changes the role or level; the portal signs the user out at once.
5. On leaving, Admin disables the user the same day. Nothing is deleted.
6. Every quarter, Admin reviews every user and level and signs the list off.

**Records:** User record, role history, audit events

**Never:** A person who has left still has an active login: the quarterly review and the leavers list both flag it. · Nobody but Super Admin can grant the Admin role.

### WF-02 · Approve a channel partner account

**Starts when:** Sales head has reviewed an onboarding  
**Owner:** Admin

1. Admin opens the onboarding and reads the documents: registration, trade licence, GST certificate, signed agreement, and the non-disclosure agreement where white label.
2. Admin checks the business against the public register and the GSTIN against the portal.
3. Admin sets the supply type default, the price list, the credit limit and the payment terms.
4. Admin approves. The portal creates the partner account and one login, and sends the welcome message.
5. Or Admin rejects with a reason; it goes back to the sales owner, not to the partner.
6. The sales owner calls the new partner within two working days and helps with the first case.

**Records:** Partner record, documents, approval event with name and time

**Never:** Nobody reviews or approves their own onboarding. · No account is created before approval, so no case can arrive from an unapproved partner.

### WF-03 · Release a credit hold

**Starts when:** Accounts has set out the facts and someone has asked for release  
**Owner:** Admin

1. Accounts applies the hold automatically when the rule is crossed and prepares the facts: outstanding, ageing, payment record, any promise in writing.
2. The sales owner or the Sales head asks for release, with the reason.
3. Admin reads the facts and decides.
4. On release, Admin writes the reason and may set a lower credit limit or a review date.
5. Waiting plans can then be approved. Cases already in production were never stopped.

**Records:** Hold record, release reason, audit event

**Never:** Accounts cannot release a hold, however small the balance. · A release with no reason is refused by the portal.

### WF-04 · Put a new price list in force

**Starts when:** Prices are to change  
**Owner:** Accounts drafts; Admin approves

1. Accounts drafts a new list for the customer type and supply type, with its in-force date.
2. Accounts sends it to Admin with the reason for the change.
3. Admin makes it live. The portal announces it to every partner on that list.
4. Partners acknowledge it in the portal; who has not is visible.
5. Plans approved on or after the in-force date are priced from the new list. Earlier plans keep the old one.

**Records:** Price list with dates, announcement, acknowledgements

**Never:** A list in force is never edited. A correction is another new list. · A partner who has not acknowledged is still billed on the new list; the acknowledgement is a record, not a consent.

### WF-05 · Recall a lot or a batch

**Starts when:** A material lot or a batch is found faulty  
**Owner:** Production head starts; Admin confirms

1. The Production head searches the lot in Traceability. The portal lists every set, box, partner and patient code made from it.
2. He holds everything still inside the unit at once.
3. He starts the recall with the reason and the scope, and names Admin as the second signature.
4. Admin confirms. Only then does the portal open a ticket to each affected partner.
5. Reprints are raised as urgent and the capacity plan is re-run.
6. The outcome of every set is recorded: returned, replaced, or already worn.
7. Reporting to the authorities is decided by Admin with the regulatory consultant.

**Records:** Recall record, tickets, reprints, outcome per set

**Never:** One person cannot both start and confirm a recall. · A mock recall once a year, completed within the target time, with the result recorded.

### WF-06 · Answer a data request

**Starts when:** A patient, guardian, dentist or partner asks for a copy or deletion  
**Owner:** Admin as Grievance Officer

1. The request is logged in the portal with its due date.
2. Admin confirms who is asking, through the partner where the request came from a patient.
3. For a copy, Admin prepares the file and sends it to the confirmed contact.
4. For deletion, Admin deletes what can be deleted and keeps the treatment and billing record the law requires.
5. Admin tells the person plainly what was deleted and what was kept, and why.
6. Any breach goes in the breach register and is reported as the law requires.

**Records:** Data request record, consent record, breach register

**Never:** The patient has no login, so every request arrives through the partner or by email. · A request is never closed silently; the due date is tracked.

### WF-07 · Monthly management review

**Starts when:** First week of the month  
**Owner:** Management

1. The portal builds the pack: cases, revenue, collections, capacity, quality, delivery and open decisions.
2. Each head adds one line on what changed and what they will do.
3. Management approves capital purchases and write-offs in the same meeting.
4. Decisions are recorded against the items they concern, not in a separate minute.

**Records:** Management pack, decisions, approvals

**Never:** Management takes no operational action in the portal; every button they see is read-only.


## Commercial

### WF-08 · A lead arrives and is called

**Starts when:** Marketing hands in a lead, or one is entered by hand  
**Owner:** Business Development

1. Leads arrive as a file or a feed from marketing, with the campaign tag, or are entered by hand from a call, a referral or an event.
2. The portal merges a repeat enquiry into the existing lead and gives it an owner by the assignment rule.
3. The caller calls within the speed-to-lead target and reads any earlier summary first.
4. The outcome is recorded from a fixed list, with the next follow-up date.
5. Follow-ups repeat on schedule. After five failed attempts over ten days the lead is lost: not reachable.
6. A do-not-contact request is honoured at once and the lead is closed.

**Records:** Lead record, call outcomes, follow-ups, consent

**Never:** No lead sits without an owner for more than one working hour. · Every lost lead carries a reason.

### WF-09 · Qualify and hand to Sales

**Starts when:** A lead shows real interest  
**Owner:** Business Development to Sales

1. The caller scores the lead: territory, size of the dentist network, volume expected, supply type of interest.
2. A qualified lead becomes an MQL with a short written summary.
3. The portal assigns it to the sales member for that territory, or to the head for a key account.
4. The sales member accepts it, or sends it back with a reason within one working day.

**Records:** MQL record, summary, hand-over event

**Never:** A lead handed back twice goes to the Sales head to decide.

### WF-10 · Visit, propose and sign

**Starts when:** An MQL is accepted  
**Owner:** Sales member

1. The member books and records a visit or a video meeting.
2. They show the portal, the products and the supply types, and record what the partner wants.
3. They ask for a discount where needed, with the volume promised.
4. They send the partner agreement for signature on screen; a white-label prospect signs the non-disclosure agreement first.
5. They collect and upload the documents.
6. They submit the onboarding for review.

**Records:** Visit notes, agreement, documents, discount request

**Never:** The white-label price list is shared only after the non-disclosure agreement is signed. · No account exists until Admin approves, so nothing can be promised as live.

### WF-11 · Review an onboarding

**Starts when:** A sales member submits one  
**Owner:** Sales head

1. The head checks the documents are complete and the supply type and price list are right.
2. They check the territory does not clash with an existing partner.
3. They mark it reviewed and it goes to Admin, or they send it back with exactly what is missing.

**Records:** Review event with name and time, reason where sent back

**Never:** A head cannot review an onboarding from a lead they own; it goes to Admin directly with a note.

### WF-12 · Approve a discount

**Starts when:** A sales member asks for one  
**Owner:** Sales head, then Admin above the limit

1. The member asks with the percentage, the reason and the volume promised.
2. Within the head's limit, the head approves or rejects, with an end date.
3. Above the limit, it goes to Admin, with the head's note attached.
4. The approved discount applies to invoices raised while it is in force, and then lapses.
5. Accounts keeps the register and flags what is about to expire.

**Records:** Discount request, decision, end date, invoices it was used on

**Never:** Nobody approves their own discount. · A discount cannot be applied to an invoice already raised; that is a credit note.

### WF-13 · Keep a partner working

**Starts when:** A partner slows down, or has never sent a case  
**Owner:** Sales head and the owner

1. The portal scores every partner on case trend, days since last case, payment record and open complaints.
2. A new partner with no case after fourteen days appears on the first-case list.
3. The owner calls, visits, or sits with them for a submission.
4. The reason is recorded, and anything we must fix goes to the team that owns it.
5. Where volume has fallen, the head decides whether to change the terms or the territory.

**Records:** Partner score, actions, reasons

**Never:** A partner on credit hold is not chased for volume until the hold is dealt with.

### WF-14 · Take a white-label brand live

**Starts when:** A partner wants its own brand  
**Owner:** Sales head, Marketing, Admin

1. The non-disclosure agreement is signed and the white-label price list is shared.
2. The partner fills its brand profile and uploads artwork.
3. Marketing prepares proofs; both sides approve each version.
4. Admin checks the lines the law requires and approves the profile.
5. Packaging is printed and received into the partner's packaging stock.
6. One test case runs end to end and is checked: box, label, portal, messages.
7. The brand goes live from a dated switch; cases before it stay plain.

**Records:** Brand profile, artwork versions, approvals, test case

**Never:** No AVMAligners mark on any touchpoint of the test case. · What must appear on a white-label label by law is still open with the regulatory consultant.


## Channel partner

### WF-15 · Create a case and send the records

**Starts when:** The partner's dentist has a patient who wants aligners  
**Owner:** Channel Partner

1. The partner creates the case: patient name and age, guardian where under 18, the dentist and the clinic.
2. The partner records the consent the dentist collected from the patient.
3. The partner chooses product and supply type; the account default is offered.
4. The partner fills the prescription the dentist gave: concern, arches, extractions, IPR allowed, teeth not to move, anything to avoid.
5. The partner uploads the nine photos, the x-rays and the upper, lower and bite scans.
6. The portal shows what is still missing and refuses submission until it is there, unless the partner ticks "records to follow" with a reason.
7. The partner submits. The case enters the planning queue with a promised date.

**Records:** Case, patient and dentist records, prescription, files with upload dates

**Never:** No case can be created by anyone but the partner. · Scans older than 30 days are flagged and need the partner to confirm them.

### WF-16 · See the plan and get the dentist's view

**Starts when:** The orthodontist has approved the plan  
**Owner:** Channel Partner

1. The partner is told the plan is approved, and sees the 3D setup, the IPR chart and the set counts.
2. The partner downloads the plan pack and shares it with their dentist.
3. If the dentist wants a change, the partner asks for it in the portal, with the reason, before production has gone far.
4. A change means a new version, planned and approved again.
5. If the dentist wants to speak to our orthodontist, the partner asks for a consultation call.

**Records:** Plan pack download, change request, consultation request

**Never:** The dentist never signs anything in our portal; the approval on record is our orthodontist's. · A change asked for after sets are printed is a reprint, and may be charged.

### WF-17 · Receive a box and start treatment

**Starts when:** A box is delivered  
**Owner:** Channel Partner

1. The partner checks the box against its label: patient code, arch and set numbers.
2. The partner confirms receipt in the portal the same day, or reports a wrong or damaged box from the same screen.
3. The partner enters the date the patient started set 1, from the dentist.
4. The portal plans the next box from that date, so it arrives before the patient runs out.

**Records:** Receipt confirmation, start date, next order date

**Never:** Without a start date the next box cannot be planned; the portal chases it at seven days.

### WF-18 · A tray is lost or broken

**Starts when:** The dentist tells the partner  
**Owner:** Channel Partner, then Planning and Production

1. The partner reports it in the portal: case, arch, set number and what happened.
2. The portal answers at once with the standing instruction: the patient wears the previous tray.
3. Our orthodontist decides within one working day: continue, go back a set, or replace.
4. A replacement is raised as one urgent print order, made, checked and sent, linked to the original box.
5. The schedule moves by the days lost and the partner sees the new dates.
6. Any charge goes to the partner by the price list.

**Records:** Request, decision, print order, replacement shipment, charge

**Never:** The patient is never told anything by us, and never sees a price.

### WF-19 · Ask for a refinement or a rescan

**Starts when:** Treatment ends short, or teeth stop tracking  
**Owner:** Channel Partner

1. The partner raises a refinement or a rescan on the case and says why.
2. New scans are uploaded; the old plan stays visible beside them.
3. Planning builds a new plan; the orthodontist approves it.
4. On approval the old plan is superseded and its unprinted sets are closed. Numbering starts again at 1.
5. Accounts decides whether it is free within the product or charged.

**Records:** New plan linked to the case, superseded plan, invoice or zero-value note

**Never:** No set from the superseded plan is printed after the new one is approved.

### WF-20 · Pay

**Starts when:** An invoice is raised or a statement arrives  
**Owner:** Channel Partner

1. The partner sees every invoice, its due date and the pay link.
2. Online payment matches itself; a bank transfer is matched by Accounts.
3. The portal sends reminders before and after the due date.
4. Crossing the rule puts the account on hold: new approvals stop, production does not.
5. The partner pays, and Accounts prepares the release for Admin.

**Records:** Invoice, payment, receipt, hold and release

**Never:** The partner never sees our cost, and never sees another partner's prices.

### WF-21 · Raise a ticket

**Starts when:** Anything is wrong, or a question needs an answer  
**Owner:** Channel Partner and Support

1. The partner raises a ticket with a type and links it to a case or a box.
2. Support acknowledges within the response target.
3. Support gives it to the team that owns it, with a deadline.
4. A product complaint also opens a non-conformance record.
5. Support tells the partner what was found and what was done, and closes it when they agree.

**Records:** Ticket with messages and links, satisfaction score

**Never:** A complaint is never closed by the team that caused it.


## Treatment planning

### WF-22 · Check the records

**Starts when:** A case reaches the planning queue  
**Owner:** Planner

1. The planner opens the case and checks every record is present, readable and recent.
2. The portal has already checked the file types, the scan age and the arches against the prescription.
3. The planner accepts and starts, or returns the case with exactly what is missing.
4. A return stops the promised-date clock; it restarts when the records arrive.

**Records:** Records checklist, acceptance or return with reason

**Never:** A difficult case is not returned as a records problem; that is a suitability concern.

### WF-23 · Build the setup

**Starts when:** Records accepted  
**Owner:** Planner

1. The planner reads the prescription and the partner's saved preferences, and asks about anything that conflicts.
2. The planner moves the teeth to the finish position within the clinical rules.
3. The planner sets the IPR per contact and the set it happens at, inside the limit the prescription allows.
4. The planner places attachments and sets when they go on and come off.
5. The planner stages the movement, fixes the set count per arch and splits it into boxes.
6. The planner writes a note saying what was done and why, and sends it for approval.

**Records:** Setup versions, IPR chart, attachment list, staging, counts, planner note

**Never:** The portal warns when a plan breaks a clinical rule, and records the override. · A complex case goes to second review before approval.

### WF-24 · Second review

**Starts when:** A case is graded complex  
**Owner:** Another planner

1. A second planner opens the setup and works through the checklist: movement per set, rotation, space closure, IPR, attachments, counts and retainer.
2. They pass it to the orthodontist, or send it back with notes.
3. A planner never second-reviews their own case.

**Records:** Review record with name, time and notes

**Never:** A complex case cannot reach the orthodontist without a second review.

### WF-25 · Orthodontic approval

**Starts when:** A plan is sent for approval  
**Owner:** In-house orthodontist

1. The orthodontist opens the full setup, the prescription, the records and the planner's note.
2. They check the plan against the clinical rules and against what the records show.
3. They approve. The record carries their name, registration number, the plan version and the time. This is the medicolegal approval.
4. The counts, the supply type and the price are fixed at that moment; the invoice is raised and print orders become due.
5. The partner is told the plan is approved and can download it for their dentist.

**Records:** Approval record, locked counts, invoice, print orders

**Never:** Nothing is made before this step, in any circumstance. · The orthodontist cannot approve a plan they built themselves.

### WF-26 · Rejection and a new version

**Starts when:** The orthodontist or the partner asks for a change  
**Owner:** Orthodontist and Planner

1. The reason is recorded against the version.
2. The planner makes a new version within the agreed time.
3. The new version goes through the same approval, and second review again if complex.
4. Every version stays readable, with who asked for what.

**Records:** Version history with reasons and names

**Never:** An approved plan is never edited; a change is always a new version.

### WF-27 · Raise a suitability concern

**Starts when:** The team believes aligners cannot treat this case well  
**Owner:** Planner, Orthodontist, Partner

1. The planner raises the concern with the clinical reason, and planning pauses.
2. The orthodontist reviews it and decides what to advise.
3. The advice goes to the partner, who takes it to their dentist.
4. The dentist's answer is recorded: change the plan, refer the patient, or proceed as advised.
5. If the case proceeds against our advice, that is recorded too, with the words used.

**Records:** Concern, advice, the dentist's answer through the partner

**Never:** We do not refuse a case outright; we advise, and we record what was advised.

### WF-28 · Orthodontic consultation call

**Starts when:** A partner's dentist wants to speak to the planner  
**Owner:** Orthodontist

1. The partner asks for a call on the case.
2. The portal offers a slot; the call is held with the partner present or informed.
3. What was discussed and agreed is recorded on the case.
4. No direct numbers are exchanged between the dentist and our team.

**Records:** Consultation record on the case

**Never:** A consultation never becomes a direct relationship with the dentist; the partner stays in the middle.


## Production and quality

### WF-29 · Raise print orders

**Starts when:** Daily, at the start of the shift  
**Owner:** Production head

1. Open Due to order, sorted by the date each patient runs out. Raise an order for every plan at or past its order-by date.
2. Open New plans: set the box size and raise the first order.
3. Check the supply type and the needed-by date on each order, and mark urgent where the margin is under two days.
4. Do not raise an order for a plan that is on hold or superseded.

**Records:** Print orders with case, arch, set range and needed-by date

**Never:** No plan is past its order-by date at the end of the shift without an order or a reason. · Only the production team raises print orders.

### WF-30 · Schedule a batch

**Starts when:** Orders are waiting and machines are free  
**Owner:** Production head

1. Fill the plate from the schedule board, urgent first.
2. The portal shows which printer made this patient's earlier sets; the later sets go to the same printer.
3. Where that printer is down or full, the head overrides with a reason, which is recorded on the case.
4. No batch starts on a machine marked down or with an overdue service.

**Records:** Schedule, batch assignment, override reasons

**Never:** Printer continuity is enforced by the portal, not left to the operator.

### WF-31 · Run a batch

**Starts when:** A batch is scheduled  
**Owner:** Production operator

1. The operator opens the current approved work instruction at the station.
2. Files are checked in file preparation; a file with an error is returned before printing.
3. The operator starts the batch and records machine, operator, models, resin lot and sheet lot.
4. Each model is scanned at wash and cure, forming, trimming and marking.
5. Trays are marked by supply type: AVMAligners, code only, or the partner mark where a brand profile is live.
6. A stop is recorded with its reason at once.

**Records:** Batch record, station scans, material usage, downtime

**Never:** A batch cannot close without its material lot. · An operator who is not signed off on the current instruction cannot scan at that station.

### WF-32 · Check the quality of every set

**Starts when:** A batch reaches quality check  
**Owner:** Quality Check

1. Check each set against the checklist: fit on the model, trim line, clarity, edges, marking and thickness.
2. Pass it, or reject it with a reason from the fixed list and a photo.
3. A rejected set returns to ordered and is reprinted.
4. Audit one packed box in ten, and check that a white-label box carries no AVMAligners mark.
5. Tell the Production head when a reason, a machine or a shift shows a rising reject rate.

**Records:** Quality result per set, reject reasons and photos, pack audit

**Never:** Only Quality Check passes or rejects. The Production head cannot overturn a reject.

### WF-33 · Non-conformance and corrective action

**Starts when:** A trend, an audit finding or a product complaint  
**Owner:** Production head

1. Open the record: what happened, where it was found, what is affected.
2. Contain it: hold the affected sets, batches or lots.
3. Find the cause, not the symptom.
4. Set the corrective action, an owner and a due date.
5. After the action, check it worked over an agreed period.
6. Close the record with the evidence.

**Records:** Non-conformance record from opening to closure

**Never:** No record is closed without a cause, an action and proof. · Overdue records are shown to Admin and Management.

### WF-34 · A machine goes down

**Starts when:** A machine stops, or maintenance falls due  
**Owner:** Production head

1. Record the downtime with the start time and the reason; the machine can take no batches.
2. The portal proposes where each waiting order can go; the head accepts or changes it.
3. Anything that will now be late is flagged to Dispatch, Logistics and Support with the patient's run-out date.
4. Planned maintenance and calibration are done on the calendar date and recorded with the certificate.
5. The downtime record is closed when the machine runs again.

**Records:** Downtime, re-plan, maintenance and calibration records

**Never:** A machine with an overdue service is refused new batches by the portal.


## Stock and buying

### WF-35 · Issue material to production

**Starts when:** A batch needs sheet, resin or packaging  
**Owner:** Inventory

1. Production asks Inventory. Production never buys.
2. Inventory issues from the oldest suitable lot and records the quantity against the batch.
3. Unused material comes back and wastage is recorded the same day.
4. A lot on hold cannot be issued.

**Records:** Stock movement against the batch, wastage note

**Never:** Every batch carries the lot it consumed, which is what traceability rests on.

### WF-36 · Stock runs low

**Starts when:** An item reaches its reorder level  
**Owner:** Inventory to Purchase

1. The portal raises the requirement with the quantity suggested from the last fortnight's use.
2. The Production head approves the need.
3. It goes to Purchase as a requirement, with the date it is needed by.

**Records:** Requisition with quantity, reason and approval

**Never:** No item should reach zero; days of stock left is shown on every line.

### WF-37 · Buy, approve and pay

**Starts when:** Purchase has a requirement  
**Owner:** Purchase, approver, Accounts, Inventory

1. Purchase finds the vendor, asks for quotations and records them.
2. Purchase raises a proforma invoice and sends it to the approval authority.
3. The approver approves within their limit; above it, Management approves.
4. Accounts pays against the approved proforma and records the payment on the vendor ledger.
5. The vendor delivers; Purchase records the goods receipt with quantity, lot number, expiry and any test certificate.
6. Purchase hands the stock to Inventory, which takes it in by lot.

**Records:** Quotations, proforma, approval, payment, goods receipt, vendor ledger

**Never:** No payment without an approved proforma. · No stock in the system without a goods receipt and a lot number. · A vendor lot that failed quality can be named and avoided on the next order.

### WF-38 · Count the stock

**Starts when:** Monthly, and after any surprise  
**Owner:** Inventory

1. Count every item and lot.
2. Record the adjustment with a note for every difference.
3. The Production head approves adjustments over the agreed value.
4. The variance is reported with the monthly stock report.

**Records:** Count sheet, adjustments with notes and approvals

**Never:** A count variance above the limit opens a non-conformance.


## Delivery

### WF-39 · Pack a box

**Starts when:** Quality-passed sets make a full box  
**Owner:** Dispatch

1. Pick the most urgent full box from Ready to dispatch.
2. Scan every tray into the box; the portal refuses a tray that does not belong.
3. Use the packaging the supply type demands: AVMAligners, plain, or the partner's own.
4. Add the retainer to the last box where the plan includes one.
5. Photograph the packed box and close it.
6. Print the label: patient code, partner and case. Never a patient phone number.

**Records:** Pack scans, photo, closed box, label

**Never:** A box cannot close with a tray missing or a tray that belongs elsewhere. · A white-label box in AVMAligners packaging is refused at the station.

### WF-40 · Hand over and book

**Starts when:** A box is closed  
**Owner:** Dispatch to Logistics

1. Dispatch hands the box to Logistics with the manifest.
2. Logistics books the courier by zone and service, and records the waybill.
3. The partner is told the box is on its way, with the waybill and a tracking link.
4. The signed manifest is kept against the day.

**Records:** Manifest, consignment, waybill, notification

**Never:** A box handed over but not booked by the end of the day is flagged.

### WF-41 · Watch it to the door

**Starts when:** Twice daily  
**Owner:** Logistics

1. Open Delivery watch: every consignment against the patient's run-out date.
2. Call the courier for anything at risk.
3. On a failed delivery, call the partner and arrange a re-attempt.
4. Remind a partner who has not confirmed receipt after three days.
5. Record proof of delivery.

**Records:** Tracking events, calls, proof of delivery

**Never:** A consignment at risk against the run-out date is raised to Production and Support, not only chased.

### WF-42 · Return, replace or claim

**Starts when:** A box is wrong, damaged or lost  
**Owner:** Logistics with Dispatch

1. Book the return and record the reason.
2. Dispatch re-packs or Production reprints, linked to the original box.
3. For a lost box, file a claim with the courier and reprint at once; the patient waits for nobody's paperwork.
4. Record the outcome and the cost against the courier's record.

**Records:** Return, replacement, claim, courier performance

**Never:** A replacement is never held back pending a claim.


## Money and support

### WF-43 · Invoice and collect

**Starts when:** A plan is approved; a payment arrives; an invoice falls due  
**Owner:** Accounts

1. The portal raises the invoice on approval, to the partner, on the price list in force that day, with any approved discount.
2. Accounts files the e-invoice and fixes what the portal rejects.
3. Online payments match themselves; bank transfers and cheques are matched by hand within two working days.
4. Short payments are queried; a difference under the agreed limit is written off with a note.
5. Reminders go out on the schedule.
6. When the rule is crossed the account goes on hold and Accounts prepares the facts for Admin.

**Records:** Invoice, e-invoice number, payment, receipt, reminders, hold

**Never:** A wrong invoice is cancelled and re-raised, never edited. · A hold never stops a case already in production.

### WF-44 · Raise a credit note

**Starts when:** Something was billed wrongly, or is owed back  
**Owner:** Accounts, Admin above the limit

1. Choose the invoice and a reason from the fixed list.
2. Within the limit, Accounts raises it; above it, Admin approves first.
3. Settle it on the next invoice, or refund it where the agreement says so.
4. The reason is counted, so a pattern shows up in the monthly report.

**Records:** Credit note against an invoice, reason, settlement

**Never:** No credit note without an invoice behind it.

### WF-45 · Statement and settlement

**Starts when:** Monthly  
**Owner:** Accounts

1. The portal builds each partner's statement: opening, invoices, payments, credit notes, closing.
2. Accounts prepares the settlement, with any open dispute marked.
3. It goes to the partner to agree.
4. Disputes are tracked as tickets and never hold up the rest of the settlement.

**Records:** Statement, settlement, dispute tickets

**Never:** A disputed line is shown, not hidden, and the rest is settled.

### WF-46 · Handle a ticket

**Starts when:** Anyone raises one  
**Owner:** Support and Facility

1. Log the ticket with a type and link it to a case, box, batch or asset.
2. Acknowledge within the response target.
3. Give it to the owning team with a deadline.
4. A product complaint opens a non-conformance; an IT or building request goes to facility.
5. Tell the person what was found and what was done, and close it when they agree.
6. Ask for a satisfaction score.

**Records:** Ticket, links, resolution, score

**Never:** No complaint is open beyond the agreed days without a stated reason.


## Entity lifecycles

| Entity | Starts as | States | Owner | Note |
|---|---|---|---|---|
| Lead | Marketing import, or entered by Business Development | New → Contacted → Qualified (MQL) → With sales → Won → Lost | Business Development, then the sales owner | Won becomes an onboarding; lost carries a reason and can be revived by a new enquiry. |
| Channel Partner | Created by Admin on approval of an onboarding | In onboarding → Live → On hold → Dormant → Closed | Sales for commercial facts, Admin for limits and status, Accounts for the hold | Closed keeps every case, invoice and record; the login is disabled. |
| Dentist | Entered by the partner on a case | Active → Inactive | The partner | Never has a login. Exists so a case has a treating dentist on record. |
| Patient | Entered by the partner on a case | Active → In treatment → Complete → Deleted on request | The partner; Admin on a data request | Never has a login or a message. Treatment and billing records are kept as the law requires. |
| Case | Created by the partner | Created → Records complete → In planning → Approved → In production → Dispatched → In treatment → Closed | Partner, Planning, Production, Dispatch | A refinement opens a new plan under the same case. |
| Plan | Created by a planner | Draft → Second review → Waiting approval → Approved → Superseded | Planner builds, orthodontist approves | Approved locks the counts and raises the invoice. Superseded closes unprinted sets. |
| Print order | Raised by Production from an approved plan | Raised → Scheduled → Printing → Quality → Ready to pack → Packed → Cancelled | Production head and operators | Cancelled only with a reason, and never after the sets are made. |
| Batch | Opened by an operator on a machine | Open → Printing → Through stations → Checked → Closed → Held | Operator, Quality Check, Production head | Closed with its machine, operator, materials, lots and results. Never edited after. |
| Material lot | Created at goods receipt | Received → In use → Low → Exhausted → On hold → Scrapped | Inventory, Production head, Quality | A hold or a scrap carries a reason. The lot stays searchable forever for traceability. |
| Box | Opened by Dispatch when sets are ready | Building → Closed → Handed over → In transit → Delivered → Returned | Dispatch and Logistics | Delivered waits for the partner to confirm receipt. |
| Invoice | Raised by the portal when a plan is approved | Raised → Filed → Sent → Part paid → Paid → Overdue → Cancelled | Accounts | Cancelled invoices stay visible with their replacement named. |
| Payment | Recorded by the portal or by Accounts | Received → Unmatched → Matched → Receipted → Refunded | Accounts | Nothing is deleted; a wrong match is reversed with a note. |
| Ticket | Raised by a partner or by staff | Open → Acknowledged → With the owner → Resolved → Closed → Reopened | Support, with the owning team | Reopens within seven days of closing if the person is not satisfied. |
| Non-conformance | Opened by Quality or the Production head | Open → Contained → Cause found → Action set → Checked → Closed | Production head | Closed only with evidence that the action worked. |
| User | Created by Admin | Invited → Active → Role changed → Disabled | Admin, Super Admin for Admin roles | Never deleted. The audit trail keeps every action under that name. |
| Scan file | Uploaded by the partner | Uploaded → In low-cost storage at 30 days → Flagged at 166 days → Held → Deleted at 180 days | The portal, with Admin approving holds | The treatment record stays after the file goes. |


## Hand-offs between teams

| From | To | What passes | How |
|---|---|---|---|
| Marketing | Business Development | Leads, with campaign tags | File or feed, daily |
| Business Development | Sales member | A qualified lead with a written summary | In the portal, with acceptance |
| Sales member | Sales head | A completed onboarding with documents | For review |
| Sales head | Admin | A reviewed onboarding | For approval and account creation |
| Admin | Channel Partner | A live account and one login | Welcome message |
| Channel Partner | Planning | A case with records and a prescription | Submission into the queue |
| Planner | Orthodontist | A finished setup with a note | For medicolegal approval |
| Orthodontist | Production and Accounts | An approved plan with locked counts | Print orders become due; the invoice is raised |
| Inventory | Production | Material issued against a batch | By lot, recorded |
| Purchase | Inventory | Received stock with lot numbers | Goods receipt |
| Production | Quality Check | Made sets | Batch reaches the station |
| Quality Check | Dispatch | Passed sets | Ready to pack |
| Dispatch | Logistics | A closed box and a manifest | Hand-over |
| Logistics | Channel Partner | A delivered box with proof | Tracking and notification |
| Channel Partner | Accounts | Payment against invoices | Link, transfer or cheque |
| Anyone | Support | A ticket | Portal, email or WhatsApp |
