# AVM Aligners Portal — working notes for Claude Code

Read `docs/ARCHITECTURE.md` first. It holds the design rules and the phase plan.

## Stack
MERN: MongoDB (Mongoose), Express, React (Vite), Node 20+. Plain JavaScript, ES modules. npm workspaces.

## Rules
- One service per module under `services/`, each with its own database. Never read another service's database; call its API (`internalCall` from `@avm/common`).
- Every route: `authenticate` → `requirePermission(...)` → ownership scope in the query. Out-of-scope records return 404.
- New permissions go in `packages/common/src/permissions.js`. Never grant `SUPER_ADMIN_ONLY` permissions to another role.
- Validate every request body with zod via `validate(schema)`.
- Write an audit event for every create, update, approval and access change (`audit(req, action, entity, id)`).
- No MongoDB transactions across services. Undo earlier steps on failure (see lead approval).
- Never log or store passwords, tokens or temporary passwords. Temporary passwords are returned once in the response.
- Sample data only. No real patient data in tests, seeds or fixtures.
- Dates shown to users are DD-MM-YYYY. Write the brand as "AVMSmiles".

## Verify before committing
Start the services and run `npm test` (the end-to-end checks in `scripts/e2e.mjs`). Add checks for anything new, including a "another user cannot see this" check for each new record type.
