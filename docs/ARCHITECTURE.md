# Architecture

## Principles

1. **Modular, not monolithic.** Each module is a separate service with its own API and its own database. No service reads another service's database.
2. **API first.** Front ends and other services use the same documented HTTP APIs.
3. **Access is enforced in the API.** Every service checks the login token, the permission and the ownership of the record on every request. The menu in the web app only hides what a user cannot use; it is not the security.
4. **Everything important is logged.** Sign-ins, user changes, role changes and approvals go to an append-only audit log.

## Services

| Service | Port | Database | Owns |
|---|---|---|---|
| gateway | 4000 | none | Routing `/api/<module>/...`, rate limit. Blocks `/internal` routes |
| identity | 4001 | `avm_identity` | Users, roles, sessions, audit log |
| masters | 4002 | `avm_masters` | Clinics, doctors, products |
| onboarding | 4003 | `avm_onboarding` | Distributors, leads |
| web | 8080 | none | React app |

Shared code lives in `packages/common`: token check, permission check, error format, audit helper, and the permission list.

## Sign-in and tokens

- Sign-in returns a short-lived access token (15 minutes) and a refresh token (7 days, single use, stored hashed).
- The access token carries the user's role, level, permissions and ownership scope. Each service verifies it with the shared secret.
- Passwords are hashed with bcrypt. Five wrong attempts lock the account for 15 minutes.
- A user on a temporary password can do nothing except change it.

## Roles

| Role | Level | Summary |
|---|---|---|
| Super Admin | 100 | Everything |
| Admin | 90 | All day-to-day control. Cannot change roles, system settings, delete records permanently, or manage Admins |
| Accounts, Treatment Planner, Production, Quality Check, Dispatch | 50 | Internal staff. Read masters; their own modules come in later phases |
| Sales Executive, Distributor | 40 | Onboard dentists and clinics. See only their own leads and accounts |
| Dentist | 30 | Own clinics and, later, own patients and cases |
| Clinic Staff | 20 | Works under a dentist |
| Patient | 10 | Own treatment only (phase 4) |

### Two rules that make "Admin is one level below Super Admin" true

1. **Reserved permissions.** `roles:update`, `settings:update` and `records:delete` belong to Super Admin only and cannot be granted to any other role, even by a Super Admin.
2. **The level rule.** A user can create or change only users whose role level is lower than their own. Admin (90) cannot touch Admins or the Super Admin. Super Admin (100) can manage Admins.

### Ownership scope

Permissions say what a role may do. Scope says on which records.

| Role | Sees |
|---|---|
| Distributor | Leads, clinics and doctors of its own distributor account |
| Sales Executive | Leads, clinics and doctors they own |
| Dentist, Clinic Staff | Their own doctor record and its clinics |
| Internal staff, Admin, Super Admin | All |

Scope is applied inside the database query. A record outside a user's scope returns "not found", never "forbidden", so its existence is not revealed.

## Onboarding flow

1. A distributor or sales executive adds a lead (dentist + clinic).
2. They work it and submit it.
3. An Admin approves. The onboarding service then calls the masters API to create the clinic and the doctor, and the identity API to create the dentist's login. If a step fails, the earlier ones are undone.
4. The dentist's temporary password is shown once to the approver.

## Phases

| Phase | Modules | Status |
|---|---|---|
| 1 | Identity, masters, onboarding | Built |
| 2 | Cases, files (photos, x-rays, STL with 180-day deletion), treatment planning | Next |
| 3 | Production, inventory, dispatch | |
| 4 | Patient tracker, notifications | |
| 5 | Billing, reports, migration of old data | |

## Adding a module

1. Create `services/<name>` with its own `package.json`, models and routes. Use `createApp` and `start` from `@avm/common`.
2. Add its permissions to `packages/common/src/permissions.js` and to the default roles.
3. Add its URL to `gateway/src/server.js` and `docker-compose.yml`.
4. Apply ownership scope in every list and read query.
5. Add checks to `scripts/e2e.mjs`, including at least one "another user cannot see this" check.
