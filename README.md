# AVM Aligners Portal

Modular, API-based web application for aligner cases, production, dispatch and patient tracking.

## What is built (phase 1)

| Module | Service | What it does |
|---|---|---|
| Identity and access | `services/identity` | Sign-in, roles, permissions, user management, audit log |
| Masters | `services/masters` | Clinics, doctors, products |
| Onboarding | `services/onboarding` | Distributors, dentist and clinic leads, approval |
| Gateway | `gateway` | The single public entry point; routes `/api/<module>/...` |
| Web app | `apps/web` | React front end for the above |

Each service has its own API and its own database. Services talk to each other only through their APIs.

## Run it on a Windows PC

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and start it.
2. Download or clone this repository.
3. Double-click `start.bat`. The first time, it asks for the Super Admin email and shows a temporary password once. Write it down.
4. Open http://localhost:8080 and sign in. You will be asked to set your own password.

To stop: double-click `stop.bat`. Data is kept between runs.

## Run it for development

Needs Node.js 20+ and a MongoDB on `localhost:27017`.

```
npm install
cp .env.example .env        # fill in the four values
# in separate terminals, each with the .env values exported:
npm run dev:identity
npm run dev:masters
npm run dev:onboarding
npm run dev:gateway
npm run dev:web             # http://localhost:5173
```

## Test

With all services running:

```
SUPER_ADMIN_EMAIL=... SUPER_ADMIN_PASSWORD=... npm test
```

This runs 36 end-to-end checks through the gateway, including the access rules
(Admin cannot manage Admins, a distributor cannot see another distributor's leads,
a dentist sees only their own clinic).

## Important

- Use sample data only on a local PC. Do not load real patient records until the portal is on a secured host with backups.
- Never commit `.env`.

See `docs/ARCHITECTURE.md` for the design and `docs/API.md` for the endpoints.
