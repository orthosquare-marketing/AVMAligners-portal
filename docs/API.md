# API reference (phase 1)

All calls go through the gateway: `http://localhost:4000/api/<module>/...`
Send the access token as `Authorization: Bearer <token>`. Errors come back as `{ "error": "message" }`.
Lists accept `page`, `limit` (max 100) and `q` (search) and return `{ items, total, page, limit }`.

## Identity — `/api/identity`

| Method | Path | Permission | Purpose |
|---|---|---|---|
| POST | `/auth/login` | none | `{ email, password }` → access token, refresh token, user, permissions |
| POST | `/auth/refresh` | none | `{ refreshToken }` → new pair. Each refresh token works once |
| POST | `/auth/logout` | none | `{ refreshToken }` |
| GET | `/auth/me` | signed in | Current user and permissions |
| POST | `/auth/change-password` | signed in | `{ currentPassword, newPassword }` |
| GET | `/users` | `users:read` | Filter by `role`, `status`, `q` |
| POST | `/users` | `users:create` | `{ name, email, phone?, role }`. Role must be below your own level. Returns a temporary password once |
| PATCH | `/users/:id` | `users:update` | Change name, phone, role |
| POST | `/users/:id/disable` · `/enable` | `users:disable` | |
| POST | `/users/:id/reset-password` | `users:update` | Returns a temporary password once |
| GET | `/roles` | `roles:read` | Roles, their permissions, the full permission list |
| PUT | `/roles/:key/permissions` | `roles:update` (Super Admin) | `{ permissions: [] }` |
| GET | `/audit` | `audit:read` | Filter by `action`, `entity`, `entityId`, `actorId`, `service` |

## Masters — `/api/masters`

| Method | Path | Permission |
|---|---|---|
| GET | `/clinics`, `/clinics/:id` | `clinics:read` (scoped) |
| POST | `/clinics` | `clinics:create` |
| PATCH | `/clinics/:id` | `clinics:update` |
| GET | `/doctors`, `/doctors/:id` | `doctors:read` (scoped) |
| POST | `/doctors` | `doctors:create` |
| PATCH | `/doctors/:id` | `doctors:update` |
| GET | `/products`, `/products/:id` | `products:read` |
| POST | `/products`, PATCH `/products/:id` | `products:manage` |

## Onboarding — `/api/onboarding`

| Method | Path | Permission | Purpose |
|---|---|---|---|
| GET | `/distributors` | `distributors:read` | |
| POST | `/distributors`, PATCH `/distributors/:id` | `distributors:manage` | |
| POST | `/distributors/:id/users` | `distributors:manage` | Create a login tied to this distributor |
| GET | `/leads`, `/leads/:id` | `leads:read` (scoped) | |
| POST | `/leads` | `leads:create` | A distributor's lead is always filed under its own account |
| PATCH | `/leads/:id` | `leads:update` | Not allowed once approved or rejected |
| POST | `/leads/:id/notes` | `leads:update` | `{ text }` |
| POST | `/leads/:id/submit` | `leads:update` | Send for approval |
| POST | `/leads/:id/approve` | `leads:approve` | Creates clinic, doctor and dentist login |
| POST | `/leads/:id/reject` | `leads:approve` | `{ reason }` |

## Internal routes

Paths under `/internal` on each service are for service-to-service calls only. They need the `x-internal-key` header and are blocked at the gateway.
