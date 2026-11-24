# 08 — Migration plan

## 1. What was decided

The new portal takes **new cases only**. Cases already running in the current portal finish there. **Settled.**

So this is a small migration: reference data moves, patient and case history does not.

| Data | Moves? | Notes |
|---|---|---|
| Clinics | Yes | From the cleaned clinic list |
| Doctors | Yes, as invitations | Each active doctor is re-onboarded with a new login |
| Distributors | Entered fresh | Not held in the old portal |
| Open sales leads held in sheets, ad platforms and calling tools | Imported once by file | Open leads only. **Assumed** |
| Products | Entered fresh | A short list |
| Old patients and cases | No | Stay in the current portal |
| Old print register | No | Stays in the workbook for old cases until they finish |
| Raw material stock | Opening balances entered once | On the day production starts using the portal |
| Machines | Entered fresh | |

## 2. Why the masters need cleaning first

The current portal stores the doctor's name, the clinic and the case number as free text typed on every patient. An earlier reconciliation of that data found:

- about 1,228 different clinic spellings for about 990 real clinics, a mix of AVMSmiles clinics and external practices;
- 731 doctor logins for about 581 real people;
- some internal doctors registered as a "practice" under their own name.

The cleaned lists from that work are the input here. They are held by the business owner as Excel workbooks and are **not** in this repository, because they contain names and contact details.

## 3. Steps

### Step 1 — Clinics

1. Take the cleaned clinic list. Keep only clinics that sent a case in the last 12 months (**assumed** cut-off), plus all AVMSmiles clinics.
2. For each: name, city, state, type, lab short name, ship-to address, and whether direct or under a distributor.
3. Business owner reviews and signs off the list.
4. Load through the masters API with a one-time script. Do not write to the database directly.

### Step 2 — Distributors

Admin enters each distributor with territory and billing details, then creates its logins.

### Step 3 — Doctors

1. From the cleaned doctor list, keep doctors active in the last 12 months.
2. Load each as a doctor record linked to its clinics, without a login.
3. Send each an invitation that creates their login. Their first sign-in sets their own password.
4. Doctors who do not respond are followed up by the sales team; no login exists until they accept.

### Step 4 — Products and price lists

Accounts enters products with tax details and the price lists: direct, distributor default, and any distributor-specific list.

### Step 5 — Stock and machines

Production enters items with opening stock (one receipt per item, reference "Opening balance") and the machine register.

### Step 6 — Cut-over

| When | What |
|---|---|
| Cut-over date agreed | Announced to dentists and distributors two weeks ahead |
| From cut-over date | All new patients are added in the new portal. The current portal stops accepting new patients |
| After cut-over | Current portal stays open for existing cases: viewing, and the manufacturing team continues the workbook for those cases only |
| Each month | Count of cases still open in the current portal is reported |
| When that count is zero, or after an agreed end date | Current portal is made read-only, then archived |

## 4. Patients who cross over

A patient who started in the current portal and needs a refinement or rescan after cut-over is added to the new portal as a new patient, with the old patient code in `legacyRef`. The new plan is type `refinement` or `rescan`. Their earlier sets are not copied. **Assumed.**

## 5. Checks

| Check | Pass when |
|---|---|
| Clinic count | Loaded count equals the signed-off list |
| No duplicate clinics | No two active clinics share name and city |
| Every doctor has a clinic | No doctor record with an empty clinic list |
| Distributor links | Every non-direct clinic points to an existing distributor |
| Access | A sample dentist signs in and sees only their own clinics |
| Opening stock | Sum of opening receipts equals the physical count sheet |

## 6. Risks

| Risk | Handling |
|---|---|
| Two systems run side by side for months | Monthly report of open old cases; an agreed end date |
| Pending counts are split across the workbook and the portal | Reports state clearly that they cover new-portal cases only until old cases close |
| Doctors do not accept invitations | Sales team follow-up list from the portal |
| Old data is wanted later | The current portal's database should be exported and stored securely before it is archived. **Open: the current portal's developer must supply this** |
