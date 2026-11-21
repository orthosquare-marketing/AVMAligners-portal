// Creates .env with random secrets and a one-time Super Admin password.
// Usage: node scripts/setup-env.mjs you@example.com
import { randomBytes } from 'node:crypto';
import { existsSync, writeFileSync } from 'node:fs';

const email = process.argv[2];
if (!email || !/^\S+@\S+\.\S+$/.test(email)) { console.error('Give the Super Admin email, e.g. node scripts/setup-env.mjs you@example.com'); process.exit(1); }
if (existsSync('.env')) { console.error('.env already exists. Delete it first if you want a new one.'); process.exit(1); }
const password = `Av${randomBytes(7).toString('hex')}9Z`;
writeFileSync('.env', [
  `JWT_SECRET=${randomBytes(48).toString('hex')}`,
  `INTERNAL_API_KEY=${randomBytes(24).toString('hex')}`,
  `SUPER_ADMIN_EMAIL=${email.toLowerCase()}`,
  `SUPER_ADMIN_PASSWORD=${password}`,
  '',
].join('\n'));
console.log('\n.env created.');
console.log(`Super Admin email:              ${email.toLowerCase()}`);
console.log(`Super Admin temporary password: ${password}`);
console.log('Write the password down now. You will be asked to change it at first sign-in.\n');
