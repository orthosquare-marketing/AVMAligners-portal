# 07 — Screens

_AVMAligners Portal · handover pack v2.0 · 24-11-2026. Replaces v1 of 22-11-2026._

171 screens across 18 logins. Each one is drawn in
`AVMAligners_Screen_Designs_v4.0_24-11-2026.pdf`, one page per screen. This document is the written list,
so a head can strike out what they do not want built.

For every screen: what it does, what that role can do on it, and what they cannot. **The "cannot"
line is where authority stops** — it is the part to argue about before anything is built.

## A. Super Admin

_8 screens._

### 001 · Home

**What it does.** The state of the whole portal in one page: who is signed in, what is running, what needs the owner.

**Can.** See and change everything, including who may be an Admin.

**Cannot.** Nothing is out of reach. Every action is recorded against his name.

### 002 · Roles and permissions

**What it does.** The master table: which role may see and do what, in every area of the portal.

**Can.** Change any permission. Create a new role.

**Cannot.** Nothing here can be changed by Admin; this screen is his alone.

### 003 · Admins

**What it does.** Who holds the Admin role. Only the Super Admin can add or remove one.

**Can.** Grant and remove the Admin role. Require a second Admin for named actions.

**Cannot.** Delegate this screen to anyone else.

### 004 · System settings

**What it does.** The settings that change how the whole portal behaves.

**Can.** Change working hours, targets, limits and the rules the portal enforces.

**Cannot.** Switch off the audit log, or make an approval optional.

### 005 · Integrations

**What it does.** What the portal talks to, and the keys that let it.

**Can.** Turn an integration on or off, and issue or revoke a key.

**Cannot.** See a key after it is issued; it is shown once.

### 006 · Audit log

**What it does.** Every create, change, approval and access change in the portal, by anyone.

**Can.** Read and export everything. Search by person, entity or date.

**Cannot.** Edit or delete an entry. The log is written once.

### 007 · Data and retention

**What it does.** What the portal keeps, for how long, and who may ask for it to go.

**Can.** Set the retention rules and confirm them yearly, with a second Admin.

**Cannot.** Delete a treatment or billing record the law requires us to keep.

### 008 · My access

**What it does.** What the owner of the system may and may not do. The limits are few, and deliberate.

**Can.** Read his own access and every action taken under his name.

**Cannot.** Remove the limits in the right-hand column.


## B. Admin

_14 screens._

### 009 · Home

**What it does.** The approvals that only Admin can give, and the health of the accounts and people behind them.

**Can.** See every partner, user, price and hold. Approve what is waiting.

**Cannot.** Approve a treatment plan, or pass a set. Those belong to Planning and Quality.

### 010 · Approvals

**What it does.** One list of every decision that is Admin's alone, with what it affects.

**Can.** Approve or reject each item, always with a reason.

**Cannot.** Hand any of these to someone else; they exist to be a second pair of eyes.

### 011 · Approving a partner

**What it does.** The last check before an outside business gets a login: documents, territory, terms and supply type.

**Can.** Approve and create the account and its single login. Or reject with a reason.

**Cannot.** Create a login for a dentist, a clinic or a patient. The portal has no such role.

### 012 · Partner accounts

**What it does.** Every partner, live or not, with its terms, supply type and standing.

**Can.** Change terms, limits and supply type. Disable an account.

**Cannot.** See a partner's own selling prices to their dentists.

### 013 · Brand profiles

**What it does.** White-label partners who sell under their own name, and the artwork that carries it.

**Can.** Approve a brand profile and its artwork, once the legal lines are present.

**Cannot.** Design the artwork. Marketing does that; Admin checks it.

### 014 · Users

**What it does.** Everyone who can sign in, with their role, level and last activity.

**Can.** Create, change and disable users. Hand over a temporary password.

**Cannot.** Grant the Admin role; that is the Super Admin's.

### 015 · Creating a user

**What it does.** The lowest role that does the job, and a password handed over once.

**Can.** Create the user and hand over the temporary password in person.

**Cannot.** See a password after it is created, or send it by the same channel as the login name.

### 016 · Access review

**What it does.** The quarterly check that everyone who can sign in should still be able to.

**Can.** Confirm or change every user's access, and sign the review off.

**Cannot.** Skip a quarter; the review is dated and visible to Management.

### 017 · Price lists

**What it does.** Which prices are in force, and the draft waiting to be made live.

**Can.** Make a list live from a date, and announce it.

**Cannot.** Edit a list that is in force, or back-date one.

### 018 · Credit holds

**What it does.** Accounts on hold, why, and the facts Accounts has prepared for a release.

**Can.** Release a hold with a reason, and set a lower limit or a review date.

**Cannot.** Apply a hold; the rule does that automatically.

### 019 · Recalls

**What it does.** A recall needs two people. The Production head starts it; Admin confirms before anyone outside is told.

**Can.** Confirm or refuse a recall, and decide what is reported to the authorities.

**Cannot.** Start a recall alone, or confirm one he started himself.

### 020 · Data requests

**What it does.** Requests to see or delete personal data, with the clock the law puts on each.

**Can.** Answer every request inside its due date, as Grievance Officer.

**Cannot.** Delete the treatment or billing record the law requires us to keep.

### 021 · Audit log

**What it does.** The same log the Super Admin sees, filtered to what Admin may read.

**Can.** Search and export everything except changes to his own permissions.

**Cannot.** Edit or delete an entry.

### 022 · My access

**What it does.** What Admin decides, what she passes on, and what she does not see.

**Can.** Read her own access and every action under her name.

**Cannot.** Change her own access.


## C. Management

_8 screens._

### 023 · Home

**What it does.** The whole business on one page, read only, with nothing to click that changes anything.

**Can.** Read everything, in any detail.

**Cannot.** Act. There is no button here that changes a record.

### 024 · The business

**What it does.** The numbers leadership asks for, in the order they usually ask.

**Can.** Read and export. Compare months and partners.

**Cannot.** See a patient name, or any clinical detail.

### 025 · Sales

**What it does.** The commercial picture: leads in, partners signed, where volume comes from.

**Can.** Read every figure behind the sales numbers.

**Cannot.** Change a target or a territory.

### 026 · Production

**What it does.** Whether we can make what sales sells, and what it costs.

**Can.** Read capacity, output, downtime and cost.

**Cannot.** Change a schedule or a target.

### 027 · Quality

**What it does.** What is going wrong, what is being done about it, and what an auditor would find.

**Can.** Read every quality record, complaint and non-conformance.

**Cannot.** Close a non-conformance or overturn a reject.

### 028 · Money

**What it does.** Billing, collections and what is at risk.

**Can.** Read collections, ageing, holds and vendor payments.

**Cannot.** Release a hold, or approve a discount.

### 029 · Approvals and open decisions

**What it does.** The few things that need leadership, and the decisions the business is waiting on.

**Can.** Approve capital purchases and write-offs. Record a decision.

**Cannot.** Anything operational; those belong to the heads.

### 030 · My access

**What it does.** Leadership reads everything and changes nothing, except the two approvals that are theirs.

**Can.** Read every screen in the portal, and export.

**Cannot.** Take any operational action.


## D. Business Development

_7 screens._

### 031 · Home

**What it does.** A caller's day: who to call next, what is overdue, and how the day is going.

**Can.** See and work their own leads. Call, record the outcome, set the next follow-up.

**Cannot.** See another caller's leads, or any partner account.

### 032 · Call list

**What it does.** The list the caller works down, in the order the portal says.

**Can.** Call, record an outcome, set a follow-up, mark a lead lost with a reason.

**Cannot.** Change the lead's source or campaign; those come from marketing.

### 033 · A lead

**What it does.** Everything known about one lead, and the one thing to do next.

**Can.** Record the call, qualify it, or mark it lost. Ask for a call back.

**Cannot.** See a partner account, a case, or any price.

### 034 · Qualifying and handing over

**What it does.** The hand-over that turns a call into a sales visit. It carries a written summary, not a shrug.

**Can.** Hand a qualified lead to the sales member for that territory.

**Cannot.** Choose which sales person gets it; the rule decides.

### 035 · Follow-ups

**What it does.** Nothing is allowed to go quiet. This is every promise to call back.

**Can.** See and reschedule their own follow-ups.

**Cannot.** Delete a follow-up without an outcome.

### 036 · Lost leads

**What it does.** Why leads die. The reasons are counted and sent back to marketing.

**Can.** Mark a lead lost with a reason, and reopen one if they come back.

**Cannot.** Delete a lead.

### 037 · My access

**What it does.** A caller sees their own leads and nothing else. No partner, no case, no price.

**Can.** Read their own access and their own call history.

**Cannot.** Change their own access.


## E. Sales head

_14 screens._

### 038 · Home

**What it does.** Both lines of business side by side, the team's pace, and every decision waiting.

**Can.** See every lead, partner and case. Decide what is hers.

**Cannot.** Approve an account; that is Admin's. She reviews and passes it on.

### 039 · Approvals

**What it does.** Every decision that needs the Sales head, with the limit that applies to each.

**Can.** Review onboardings. Approve discounts within her limit. Re-assign leads. Set targets.

**Cannot.** Give the final account approval, or approve a discount above her limit.

### 040 · All leads

**What it does.** Every lead in sales, whoever owns it, and where each is stuck.

**Can.** See every lead. Re-assign. Mark lost. Listen to recordings.

**Cannot.** Edit the source or campaign of a lead.

### 041 · Pipeline

**What it does.** Partners in the making, stage by stage, for both lines of business.

**Can.** See every deal. Move one between owners.

**Cannot.** Change a stage herself; it moves when the owner records the step.

### 042 · Onboarding review

**What it does.** She checks the documents, the terms and the territory, then passes it to Admin or sends it back.

**Can.** Mark reviewed, or reject with a reason. Change the supply type before approval.

**Cannot.** Create the account or the login; that happens on Admin approval.

### 043 · Partner accounts

**What it does.** Every live partner, what they sell and how they are doing.

**Can.** See every partner, their cases and their standing. Set their targets.

**Cannot.** Change a credit limit or see invoice lines; she sees whether a balance is overdue.

### 044 · Partner health

**What it does.** Who is slowing down, who has never started, and what is being done about each.

**Can.** See the score behind every partner. Set the next action and its owner.

**Cannot.** See invoices; she sees only whether a balance is overdue.

### 045 · White-label go-live

**What it does.** Partners taking their own brand live, and which step each is stuck on.

**Can.** See every step and nudge the owner of a late one.

**Cannot.** Approve artwork or the brand profile; Marketing prepares and Admin approves.

### 046 · Team and territories

**What it does.** Who covers what, and how much each is carrying.

**Can.** Change territories, arrange leave cover, see every workload.

**Cannot.** Create or disable a user; that is Admin's.

### 047 · Targets

**What it does.** Targets by person and by line, and what each has earned so far.

**Can.** Set and change targets. See incentives as they build.

**Cannot.** Change the incentive rule or pay one out.

### 048 · Price approvals

**What it does.** Discount requests on both lists, with her limit shown on each.

**Can.** Approve or reject 3 to 7% below list, with an end date.

**Cannot.** Approve above 7%, or edit a price list.

### 049 · Lead plan with marketing

**What it does.** Marketing works outside this portal. This is the agreement on how many leads are needed and where.

**Can.** Set what sales needs by segment, and confirm next month's plan.

**Cannot.** See or change budgets, campaigns or creatives.

### 050 · Forecast

**What it does.** What the pipeline says will happen, for each line of business.

**Can.** See the forecast and set her own judgement figure.

**Cannot.** Change the win rates; they come from past results.

### 051 · My access

**What it does.** What the Sales head decides, passes on, and does not see.

**Can.** Read her own access and the trail of her own actions.

**Cannot.** Change her own access.


## F. Sales member

_9 screens._

### 052 · Home

**What it does.** One sales person's day: the leads to move, the visits booked, and the partners to keep warm.

**Can.** Work their own leads and partners.

**Cannot.** See another member's leads, or any partner that is not theirs.

### 053 · My leads

**What it does.** The leads this person owns, in the order they should be worked.

**Can.** Work, update and close their own leads.

**Cannot.** Re-assign a lead to someone else; the head does that.

### 054 · A visit

**What it does.** What was agreed at a meeting, written down before leaving the car park.

**Can.** Record a visit, what was said, and what happens next.

**Cannot.** Promise a price; a discount is asked for and approved separately.

### 055 · Proposal

**What it does.** What goes to the partner: products, prices, terms and what we promise.

**Can.** Build and send a proposal from the price list in force.

**Cannot.** Type a price that is not on the list, or promise a turnaround we do not offer.

### 056 · Onboarding

**What it does.** Collecting what Admin will need, so an account can be opened without a second round of questions.

**Can.** Upload documents, send the agreement, and submit for review.

**Cannot.** Tell the partner they are live before Admin has approved.

### 057 · My partners

**What it does.** The partners this person owns, and how each is doing.

**Can.** See their partners' cases, volume and standing, and act on what is slipping.

**Cannot.** See invoices, or another member's partners.

### 058 · First case help

**What it does.** A new partner who has not sent a case yet is the easiest partner to lose.

**Can.** Book a session, sit with them through a submission, and record what went wrong.

**Cannot.** Create the case for them; the partner must do it in their own login.

### 059 · My targets

**What it does.** Where this person stands, and what it is worth.

**Can.** See their own target, pace and incentive.

**Cannot.** Change a target, or see another person's.

### 060 · My access

**What it does.** A sales person works their own leads and partners, and nothing else.

**Can.** Read their own access and actions.

**Cannot.** Change their own access.


## G. Channel Partner

_17 screens._

### 061 · Home

**What it does.** What the partner sees first: cases moving, boxes coming, and anything that needs them.

**Can.** See and work everything in their own account.

**Cannot.** See another partner, our costs, or anything clinical beyond their own cases.

### 062 · My cases

**What it does.** Every case the partner has sent, and exactly where each one is.

**Can.** Open any of their own cases and act on it.

**Cannot.** See a case belonging to another partner. It does not appear, and its number returns nothing.

### 063 · New case: patient and dentist

**What it does.** The partner enters the patient and the dentist. Neither of them will ever sign in here.

**Can.** Create a case and enter the patient and the treating dentist.

**Cannot.** Give the patient or the dentist a login. The portal has no such role.

### 064 · New case: prescription

**What it does.** What the dentist wants done, in the dentist's own words, written down once.

**Can.** Fill the prescription the dentist gave, and the product and supply type.

**Cannot.** Decide the clinical plan; our planners and orthodontist do that.

### 065 · New case: records

**What it does.** Photos, x-rays and scans. The portal refuses to submit until it has what planning needs.

**Can.** Upload every record and submit the case.

**Cannot.** Submit with records missing, unless they say which and why.

### 066 · A case

**What it does.** One case from submission to the last tray, with every date the partner needs to answer their dentist.

**Can.** See every step, ask for a change, report a problem, download the plan.

**Cannot.** See the planner's workings, our costs, or anything about another case.

### 067 · The approved plan

**What it does.** What the partner shares with their dentist: the setup, the IPR chart and the counts, approved by our orthodontist.

**Can.** View and download the plan pack, and ask for a change before production goes far.

**Cannot.** Approve or reject the plan. The medicolegal approval is our orthodontist's.

### 068 · Asking for a change

**What it does.** The dentist wants something different. The request carries the reason and goes back to planning.

**Can.** Ask for a change with the dentist's reason, before or soon after approval.

**Cannot.** Change the plan themselves, or have production stop without telling us.

### 069 · Boxes

**What it does.** Every box on its way or delivered, with the courier and the date it is needed by.

**Can.** Track every box and chase one that is late.

**Cannot.** See another partner's shipments or our courier rates.

### 070 · Confirm receipt and start date

**What it does.** Two small entries that decide when the next box is made.

**Can.** Confirm the box arrived, report a problem, and enter the date the patient started.

**Cannot.** Change the counts or the plan.

### 071 · A lost or broken tray

**What it does.** The commonest problem in aligner treatment, handled in a day.

**Can.** Report it, see the decision, and track the replacement.

**Cannot.** Decide what the patient should do; our orthodontist decides.

### 072 · Ask for a refinement

**What it does.** Treatment ended short, or the teeth stopped tracking. A new plan on new scans.

**Can.** Raise a refinement or a rescan and upload new scans.

**Cannot.** Decide whether it is free; Accounts decides by the product and the policy.

### 073 · Invoices

**What it does.** What the partner owes us, and the link to pay it.

**Can.** See and pay every invoice, and download it.

**Cannot.** See our cost, another partner's prices, or any patient's money.

### 074 · Brand and packaging

**What it does.** For a white-label partner: what the patient sees, and how much of it is in stock.

**Can.** See their brand profile, approve artwork proofs, and see packaging stock.

**Cannot.** Change the artwork themselves, or go live before Admin approves.

### 075 · Status on my own website

**What it does.** A large partner wants their patients to check progress on their own site, under their own brand.

**Can.** Use the status API with a one-time code, and see what it returns.

**Cannot.** Read anything through the API that they cannot already see in the portal.

### 076 · Tickets

**What it does.** Anything wrong, or any question, with a record of what we said.

**Can.** Raise and follow a ticket, and see what was done.

**Cannot.** See tickets from another partner.

### 077 · My access

**What it does.** What a partner can do here, and the firm edges of it.

**Can.** Read their own access, and see every action taken under their login.

**Cannot.** Create another login for their staff; there is one login per partner.


## H. Orthodontist

_10 screens._

### 078 · Home

**What it does.** The queue of plans waiting for the approval that lets anything be made at all.

**Can.** See every plan, every planner and every clinical rule.

**Cannot.** Build a setup and then approve it. A plan she made is approved by another orthodontist.

### 079 · Waiting for approval

**What it does.** Every plan waiting on the orthodontist, oldest first, with what the case is and who built it.

**Can.** Open, approve or send back any plan.

**Cannot.** Approve in bulk. Each plan is opened and read.

### 080 · Approving a plan

**What it does.** The screen where treatment is authorised. Everything the orthodontist needs is on it.

**Can.** Approve, with her name and registration number on the record. Or send it back with a reason.

**Cannot.** Approve a plan she built, or approve without opening the records.

### 081 · The approval record

**What it does.** What is written at the moment of approval. This is the record that answers a question years later.

**Can.** Approve, and see exactly what is recorded.

**Cannot.** Approve without her registration number, or back-date an approval.

### 082 · Sending a plan back

**What it does.** A plan that is not right goes back with a clinical reason, not a shrug.

**Can.** Send back with a reason from the list and a note, and set when the new version is due.

**Cannot.** Send back without a reason.

### 083 · Approval log

**What it does.** Every approval and rejection, with who, when and which version. This is what an auditor reads.

**Can.** Search and export her own approvals and the team's.

**Cannot.** Change or remove an entry.

### 084 · Allocation

**What it does.** Grading each case and giving it to a planner, with an eye on who is carrying how much.

**Can.** Grade a case, allocate it, and move work when someone is away.

**Cannot.** Change the promised date; it is three working days from complete records.

### 085 · Clinical rules

**What it does.** The limits every setup must obey. The orthodontist owns them, and the workspace enforces them.

**Can.** Change a limit, with the evidence and a version number.

**Cannot.** Allow a plan to break a rule silently; an override is always recorded.

### 086 · Suitability concerns

**What it does.** Cases the team believes aligners cannot treat well, and what was advised.

**Can.** Review a concern, decide the advice, and record the partner's answer.

**Cannot.** Refuse a case outright; we advise, and record what was advised.

### 087 · My access

**What it does.** The orthodontist holds the one approval nothing can go round.

**Can.** Read her own access and every approval under her name.

**Cannot.** Change her own access.


## I. Planner

_10 screens._

### 088 · Home

**What it does.** A planner's desk: cases to build, cases coming back, and what the orthodontist has said.

**Can.** Work their own cases and the shared queue.

**Cannot.** Approve a plan, or take a case allocated to another planner.

### 089 · Planning queue

**What it does.** Every case waiting to be planned, with the date it is promised back to the partner.

**Can.** Pick up an unallocated case and see the whole queue.

**Cannot.** Change a promised date.

### 090 · Records check

**What it does.** The first job: is everything here, readable and recent enough to plan on.

**Can.** Accept and start, or return the case with exactly what is missing.

**Cannot.** Start on scans older than 30 days without the partner confirming them.

### 091 · Setup workspace

**What it does.** Where the teeth are moved from where they are to where they should finish.

**Can.** Build the setup, compare start with finish, and save versions as they work.

**Cannot.** Send a plan on before the counts and the IPR chart are filled in.

### 092 · IPR and staging

**What it does.** Where enamel is reduced, where attachments go, and how the movement is spread across trays.

**Can.** Set IPR and attachments per set, and fix the counts and boxes.

**Cannot.** Exceed the IPR the prescription allows without asking the partner.

### 093 · Send for approval

**What it does.** The planner writes what they did and why, and sends it to the orthodontist.

**Can.** Send the plan with a note, and flag it for second review if complex.

**Cannot.** Approve their own plan. Approval belongs to the orthodontist.

### 094 · Changes asked for

**What it does.** Plans sent back, by the orthodontist or by the partner's dentist, and when each new version is due.

**Can.** Make a new version and send it again. See every earlier version.

**Cannot.** Close a request for changes without a new version.

### 095 · Second review

**What it does.** Complex cases are read by another planner before the orthodontist sees them.

**Can.** Review another planner's complex case, pass it or send it back.

**Cannot.** Review their own case.

### 096 · Refinements and scans expiring

**What it does.** Cases coming back for more, and the scan files that are about to be deleted.

**Can.** Plan a refinement against the old plan, and ask Admin to hold a scan.

**Cannot.** Delete a scan, or hold one without a reason.

### 097 · My access

**What it does.** A planner builds the plan and proposes it. Somebody else authorises the treatment.

**Can.** Read their own access and actions.

**Cannot.** Change their own access, or give themselves approval rights.


## J. Purchase

_8 screens._

### 098 · Home

**What it does.** What has to be bought, what is on its way, and what is waiting for money.

**Can.** See every requirement, order and vendor. Raise and chase.

**Cannot.** Approve his own proforma, or pay a vendor. Accounts pays.

### 099 · Requirements

**What it does.** What Inventory says is needed, with how long the stock will last.

**Can.** Take a requirement, find a vendor and raise a proforma.

**Cannot.** Decide what production needs; Inventory raises the requirement.

### 100 · Vendors

**What it does.** Who we buy from, what they are good at, and how they have behaved.

**Can.** Keep the vendor list and their ratings. Block a vendor lot that failed quality.

**Cannot.** Agree a price above his limit without approval.

### 101 · Quotations

**What it does.** What each vendor says this will cost and when they can deliver.

**Can.** Record quotations and choose one, with the reason.

**Cannot.** Choose a vendor whose lot has been refused for this item.

### 102 · Proforma invoice

**What it does.** The document that goes for approval before any money moves.

**Can.** Raise a proforma and send it to the approval authority.

**Cannot.** Approve it himself, or pay it.

### 103 · Purchase orders

**What it does.** Everything ordered, what is due and what is late.

**Can.** Raise an order once the proforma is approved, and chase the vendor.

**Cannot.** Raise an order without an approved proforma.

### 104 · Goods receipt

**What it does.** What actually arrived, counted and recorded with its lot number.

**Can.** Record the receipt, the lot and the expiry, and hand it to Inventory.

**Cannot.** Take stock into the system without a lot number.

### 105 · My access

**What it does.** Purchase buys. It does not decide what is needed, and it does not pay.

**Can.** Read his own access and actions.

**Cannot.** Change his own access.


## K. Inventory

_8 screens._

### 106 · Home

**What it does.** What is on the shelf, what is running out, and what the floor needs today.

**Can.** See and move every item and lot in stores.

**Cannot.** Buy anything. Inventory asks Purchase.

### 107 · Stock on hand

**What it does.** Every item, how much there is, and how long it will last at the current rate.

**Can.** See and adjust stock, and raise a requirement when it is low.

**Cannot.** Place an order, or set a price.

### 108 · Lots

**What it does.** Every batch of material we hold, where it came from and what has been made from it.

**Can.** Put a lot on hold, release it, and see what used it.

**Cannot.** Release a lot that Quality has held.

### 109 · Issue to production

**What it does.** Material leaves the shelf against a batch, never against a person.

**Can.** Issue from the oldest suitable lot and record it against the batch.

**Cannot.** Issue a lot that is on hold, or issue without a batch number.

### 110 · Returns and wastage

**What it does.** What came back unused, and what was spoiled. Recorded on the day, not at month end.

**Can.** Take material back and record wastage with a reason.

**Cannot.** Write off stock above the agreed value without the Production head.

### 111 · Stock count

**What it does.** The monthly count, and the difference between the shelf and the screen.

**Can.** Count, record adjustments with a note, and send the variance report.

**Cannot.** Adjust above the agreed value without the Production head approving.

### 112 · Expiry and partner packaging

**What it does.** Material with a shelf life, and the packaging that belongs to someone else's brand.

**Can.** Watch expiry, use the oldest first, and tell Sales when a partner's packaging is low.

**Cannot.** Use one partner's packaging for another partner's case.

### 113 · My access

**What it does.** Inventory holds the material and moves it. It does not buy, and it does not make.

**Can.** Read her own access and actions.

**Cannot.** Change her own access.


## L. Production head

_12 screens._

### 114 · Home

**What it does.** Output against plan, what is late or at risk, and every decision waiting on the head.

**Can.** See every order, batch, machine and lot. Decide what is his.

**Cannot.** See patient names, prices or invoices. Cases carry a code.

### 115 · Capacity

**What it does.** What the coming weeks need against what the floor can make.

**Can.** Change shifts and planned downtime to see the effect, and tell Sales when a week is full.

**Cannot.** Change needed-by dates; they come from the patients' schedules.

### 116 · Schedule board

**What it does.** Every machine through the day, and the rule that keeps a patient on one printer.

**Can.** Move a batch, put an urgent order first, and override printer continuity with a reason.

**Cannot.** Start a batch on a machine that is down or overdue for service.

### 117 · Re-planning after a machine stops

**What it does.** The portal proposes where each waiting order can go, and shows what continuity it breaks.

**Can.** Accept, or move each order by hand, and see what becomes late.

**Cannot.** Push an order past its needed-by date without Dispatch and Support being told.

### 118 · Print orders

**What it does.** Every order with its stage, its needed-by date and its supply type.

**Can.** Raise, mark urgent, hold or cancel an order with a reason.

**Cannot.** Change the number of sets; that comes from the approved plan.

### 119 · Due to order

**What it does.** Plans that need their next box ordered, sorted by when the patient runs out.

**Can.** Raise the orders, or give the list to an operator.

**Cannot.** Order for a plan on hold or superseded.

### 120 · Floor live

**What it does.** The floor as it is now: what sits where, who is on it, and where the queue builds.

**Can.** See every station and move a person between them.

**Cannot.** Scan sets through a station unless trained and signed off on it.

### 121 · Batches

**What it does.** Every run, with its machine, operator, materials and result. The record behind each tray.

**Can.** Open, hold or release any batch, and order reprints.

**Cannot.** Pass a rejected set, or edit a closed batch record.

### 122 · Machines and maintenance

**What it does.** Every machine, its state, and when it is next due for service or calibration.

**Can.** Mark a machine down or up, plan service, and record calibration.

**Cannot.** Run a machine past an overdue service; the portal blocks new batches.

### 123 · Defect trends and non-conformance

**What it does.** What is going wrong, and what is being done about it with evidence.

**Can.** Open a record, set the cause, action and owner, and close it with proof.

**Cannot.** Close a record without a cause, an action and proof.

### 124 · Traceability and recall

**What it does.** Search a lot, a batch or a machine and see every set made from it and where each one is now.

**Can.** Hold everything still here, and start a recall for Admin to confirm.

**Cannot.** Send the recall notice to partners alone, or see patient names.

### 125 · My access

**What it does.** The head runs the floor. Quality decides each set, and two people start a recall.

**Can.** Read his own access and actions.

**Cannot.** Change his own access.


## M. Production operator

_5 screens._

### 126 · My station

**What it does.** One screen, one station, one job. Everything an operator needs and nothing else.

**Can.** See their own station queue and the work instruction in force.

**Cannot.** See other stations, cases, partners or anything commercial.

### 127 · Run a batch

**What it does.** Starting a batch: the machine, the material and the lot, recorded before anything prints.

**Can.** Start a batch and record the machine, materials and lot.

**Cannot.** Start on a machine marked down, or close a batch without its lot.

### 128 · Scanning through a station

**What it does.** Each set is scanned at every station. This is how traceability is built, one scan at a time.

**Can.** Scan a set in and out of their own station.

**Cannot.** Scan at a station they are not signed off on; the portal refuses.

### 129 · Work instruction

**What it does.** The current approved instruction for this station, and nothing older.

**Can.** Read the instruction in force and confirm their training.

**Cannot.** See or follow a superseded version.

### 130 · Report a problem

**What it does.** Anything wrong goes to the head at once, from the station, without leaving it.

**Can.** Report a machine stop, a bad file, a material problem or a set that will not scan.

**Cannot.** Decide what to do about it; the head decides.


## N. Quality Check

_7 screens._

### 131 · Home

**What it does.** What is waiting to be checked, what has been rejected, and what the numbers are saying.

**Can.** Check every set, and open a non-conformance when a trend crosses the limit.

**Cannot.** Be overruled on a set by anyone, including the Production head.

### 132 · Checking a set

**What it does.** One set at a time, against a fixed checklist. A doubt is a reject.

**Can.** Pass or reject each set, with a reason from the list and a photo.

**Cannot.** Pass a set they are unsure about, or change a result afterwards.

### 133 · Rejects

**What it does.** Every rejected set, with its reason and photo, and what happened to it.

**Can.** See every reject and send it for reprint.

**Cannot.** Pass a set that was rejected.

### 134 · Pack audit

**What it does.** One packed box in ten is opened and checked before it leaves.

**Can.** Audit a box, and stop it going if anything is wrong.

**Cannot.** Let a white-label box go in AVMAligners packaging.

### 135 · Trends

**What it does.** Where the rejects are coming from, so a cause can be found before a partner complains.

**Can.** See every cut of the data, and open a non-conformance from it.

**Cannot.** Change a recorded result to improve a trend.

### 136 · Holds

**What it does.** Batches and lots stopped by quality, and what each is waiting for.

**Can.** Hold a batch or a lot, and release it when it is cleared.

**Cannot.** Release a lot that is in a recall; Admin and the head decide that.

### 137 · My access

**What it does.** Quality decides each set. Nobody can overturn it.

**Can.** Read their own access and every result under their name.

**Cannot.** Change their own access.


## O. Dispatch

_7 screens._

### 138 · Home

**What it does.** What can be packed now, what is waiting on the floor, and what goes out today.

**Can.** See and pack every box, and hand over to logistics.

**Cannot.** Book a courier or change an address; that is logistics.

### 139 · To pack

**What it does.** Every box that can be built now, in the order it should be done.

**Can.** Pick a box and pack it.

**Cannot.** Pack a box whose sets have not all passed quality.

### 140 · Packing a box

**What it does.** Every tray is scanned into the box. The portal refuses anything that does not belong.

**Can.** Scan trays in, add the retainer, photograph the box and close it.

**Cannot.** Close a box with a tray missing, or use the wrong packaging.

### 141 · Packaging and labels

**What it does.** Which packaging each case takes, and what goes on the label.

**Can.** See the rule for every supply type and brand, and print labels.

**Cannot.** Put a patient phone number on a label, or our brand on a white-label box.

### 142 · Hand-over

**What it does.** Closed boxes handed to logistics, with a manifest signed at the gate.

**Can.** Hand over boxes and print the manifest.

**Cannot.** Book the courier; logistics does that.

### 143 · Returns

**What it does.** Boxes that came back, and the replacement that went out instead.

**Can.** Re-pack a returned box and link the replacement to the original.

**Cannot.** Decide whether the partner is charged; Accounts decides.

### 144 · My access

**What it does.** Dispatch builds the box. Logistics takes it from there.

**Can.** Read their own access and actions.

**Cannot.** Change their own access.


## P. Logistics

_8 screens._

### 145 · Home

**What it does.** Everything in transit, and anything that may miss the date a patient runs out of trays.

**Can.** Book, track, chase and claim on every consignment.

**Cannot.** Pack a box or change what is in it.

### 146 · Delivery watch

**What it does.** Every box measured against the date its patient runs out of trays.

**Can.** See what is at risk and act: call, escalate, or ask production to reprint.

**Cannot.** Change the run-out date; it comes from the patient's schedule.

### 147 · Book a courier

**What it does.** A closed box becomes a consignment with a waybill and a promise.

**Can.** Choose the courier and service, book it, and tell the partner.

**Cannot.** Send a box that dispatch has not closed.

### 148 · Consignments

**What it does.** Everything sent, with its tracking events and proof of delivery.

**Can.** Track any consignment and see its full event history.

**Cannot.** Edit a tracking event; they come from the courier.

### 149 · Failed deliveries

**What it does.** What did not arrive, why, and what was done about it the same day.

**Can.** Arrange a second attempt, correct an address with the partner, or return and re-send.

**Cannot.** Change the delivery address without the partner confirming it.

### 150 · Claims

**What it does.** Boxes lost or damaged by a courier, and the money claimed back.

**Can.** File and follow a claim, and record the outcome against the courier.

**Cannot.** Hold back a replacement until the claim is settled.

### 151 · Courier performance

**What it does.** Which courier earns the next consignment.

**Can.** See performance by courier, route and month, and change the default.

**Cannot.** Agree rates; Purchase and Accounts do that.

### 152 · My access

**What it does.** Logistics moves the box. It does not decide what is in it.

**Can.** Read their own access and actions.

**Cannot.** Change their own access.


## Q. Accounts

_12 screens._

### 153 · Home

**What it does.** What has been billed, what has come in, what is overdue, and what is waiting to be paid out.

**Can.** See every invoice, payment, balance, price and vendor bill.

**Cannot.** See patient names, scans or plans. Cases carry a code.

### 154 · Invoices

**What it does.** Every invoice the portal has raised on approval of a plan.

**Can.** Check, cancel and re-raise, re-file and re-send.

**Cannot.** Edit an invoice. A wrong one is cancelled and raised again.

### 155 · E-invoice errors

**What it does.** Invoices the GST portal would not accept, with the reason and the fix.

**Can.** Fix and re-file, or cancel and re-raise.

**Cannot.** Change the value to make it file; a wrong value is a cancellation.

### 156 · Credit notes

**What it does.** Money credited back, each against an invoice, each with a reason that is counted.

**Can.** Raise up to her limit; above it Admin approves first.

**Cannot.** Raise one with no invoice behind it, or no reason.

### 157 · Payments

**What it does.** Every rupee received and which invoice it was set against.

**Can.** Record offline payments, match, and issue receipts.

**Cannot.** Change a bank entry; it comes from the statement feed.

### 158 · Unmatched payments

**What it does.** Money in the bank that is not yet against an invoice.

**Can.** Match, split across invoices, or query with the partner.

**Cannot.** Leave one unmatched beyond two working days without a note.

### 159 · Credit holds

**What it does.** Accounts where new approvals are blocked, and the facts prepared for Admin.

**Can.** Apply the hold by the rule and prepare the facts for a release.

**Cannot.** Release a hold, however small the balance.

### 160 · Balances

**What it does.** Every partner, what they owe, how they pay, and how much room is left.

**Can.** See every account, change the billing contact and the terms within policy.

**Cannot.** Change a credit limit; Admin does that.

### 161 · Statement

**What it does.** One partner's month: every invoice, payment and credit note, and the balance after each.

**Can.** Produce, send and export the statement, and prepare the monthly settlement.

**Cannot.** Change a figure on it; a correction is a credit note or a new invoice.

### 162 · Vendor payments

**What it does.** The money going out: approved proformas, vendor bills and the ledger.

**Can.** Pay against an approved proforma, record it and keep the vendor ledger.

**Cannot.** Pay a proforma that has not been approved.

### 163 · Collections

**What it does.** Invoiced against received, and how old the outstanding money is.

**Can.** See collections and ageing every way, and send the list to Sales.

**Cannot.** Write off a balance; Admin and Management approve.

### 164 · My access

**What it does.** Accounts bills and collects. Releasing money or changing a price needs someone else.

**Can.** Read her own access and actions.

**Cannot.** Change her own access.


## R. Support and Facility

_7 screens._

### 165 · Home

**What it does.** Everything anyone has asked for help with, from a partner complaint to a broken air conditioner.

**Can.** See and work every ticket, from partners and from staff.

**Cannot.** Decide a clinical question, or close a complaint the owning team has not answered.

### 166 · Tickets

**What it does.** Every ticket, who owns it, and when it must be answered.

**Can.** Open, assign, reply and close tickets of every kind.

**Cannot.** Close a product complaint without the owning team answering.

### 167 · A complaint

**What it does.** A product complaint is answered and also sent to quality, because one tray is never just one tray.

**Can.** Acknowledge, link it to the case and batch, and open a non-conformance.

**Cannot.** Decide the clinical cause; the Production head and Quality do that.

### 168 · Facility and IT

**What it does.** The requests that keep the building and the computers working.

**Can.** Take and close facility and IT requests, and call a contractor.

**Cannot.** Change anything in the portal itself; that is Admin.

### 169 · Asset register

**What it does.** What we own, where it is, and when it was last serviced.

**Can.** Keep the register and log maintenance of the building and equipment.

**Cannot.** Record production machine maintenance; the Production head owns that.

### 170 · Ticket report

**What it does.** What people keep asking for, which is usually a list of what to fix.

**Can.** See tickets by type, age, partner and team, and export.

**Cannot.** Change a satisfaction score or close a breached ticket quietly.

### 171 · My access

**What it does.** Support answers. The team that owns the problem fixes it.

**Can.** Read their own access and actions.

**Cannot.** Change their own access.
