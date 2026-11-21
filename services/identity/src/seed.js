import { DEFAULT_ROLES } from '@avm/common';
import { Role } from './models/Role.js';
import { User } from './models/User.js';
import { hashPassword, assertStrongPassword } from './lib.js';

// Roles are created once. Existing roles are left alone so Super Admin edits survive a restart.
export async function seed() {
  for (const r of DEFAULT_ROLES) {
    const exists = await Role.findOne({ key: r.key });
    if (!exists) await Role.create(r);
  }
  const email = (process.env.SUPER_ADMIN_EMAIL || '').toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD;
  if (!email || !password) return;
  if (await User.findOne({ role: 'super_admin' })) return;
  assertStrongPassword(password);
  await User.create({ name: 'Super Admin', email, passwordHash: await hashPassword(password), role: 'super_admin', mustChangePassword: true });
  console.log(`[identity] Super Admin created: ${email}`);
}
