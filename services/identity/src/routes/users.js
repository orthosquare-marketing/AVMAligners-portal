import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, authenticate, requirePermission, validate, paging, escapeRegex, forbidden, notFound, badRequest, conflict } from '@avm/common';
import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import { hashPassword, tempPassword, revokeAllTokens, writeAudit } from '../lib.js';

const r = Router();
r.use(authenticate);

// The level rule. A user may only create or change accounts whose role is LOWER than their own.
// So Admin (90) cannot touch Admin or Super Admin; Super Admin (100) can manage Admins.
async function assertCanManage(actor, roleKey) {
  const role = await Role.findOne({ key: roleKey });
  if (!role) throw badRequest('Unknown role');
  if (role.level >= actor.level) throw forbidden('You cannot manage users with this role');
  return role;
}

const createSchema = z.object({
  name: z.string().min(2), email: z.string().email(), phone: z.string().optional(),
  role: z.string(), distributorId: z.string().optional(), doctorId: z.string().optional(),
});

r.get('/', requirePermission('users:read'), asyncHandler(async (req, res) => {
  const { page, limit, skip } = paging(req);
  const q = {};
  if (req.query.role) q.role = String(req.query.role);
  if (req.query.status) q.status = String(req.query.status);
  if (req.query.q) { const rx = new RegExp(escapeRegex(req.query.q), 'i'); q.$or = [{ name: rx }, { email: rx }]; }
  const [items, total] = await Promise.all([User.find(q).sort({ createdAt: -1 }).skip(skip).limit(limit), User.countDocuments(q)]);
  res.json({ items: items.map((u) => u.toSafe()), total, page, limit });
}));

r.post('/', requirePermission('users:create'), validate(createSchema), asyncHandler(async (req, res) => {
  await assertCanManage(req.user, req.body.role);
  const email = req.body.email.toLowerCase();
  if (await User.findOne({ email })) throw conflict('A user with this email already exists');
  const password = tempPassword();
  const user = await User.create({ ...req.body, email, passwordHash: await hashPassword(password), mustChangePassword: true, createdBy: req.user.id });
  writeAudit(req, 'user.created', 'user', user._id, { role: user.role });
  // The temporary password is shown once, here. It is never stored in plain text.
  res.status(201).json({ user: user.toSafe(), temporaryPassword: password });
}));

async function loadManaged(req) {
  const user = await User.findById(req.params.id);
  if (!user) throw notFound('User not found');
  await assertCanManage(req.user, user.role);
  return user;
}

r.patch('/:id', requirePermission('users:update'), validate(createSchema.partial().omit({ email: true })), asyncHandler(async (req, res) => {
  const user = await loadManaged(req);
  if (req.body.role && req.body.role !== user.role) await assertCanManage(req.user, req.body.role);
  const before = { role: user.role };
  Object.assign(user, req.body);
  await user.save();
  if (before.role !== user.role) await revokeAllTokens(user._id); // permissions changed: force new sign-in
  writeAudit(req, 'user.updated', 'user', user._id, { changed: Object.keys(req.body), roleBefore: before.role, roleAfter: user.role });
  res.json({ user: user.toSafe() });
}));

for (const [path, status] of [['disable', 'disabled'], ['enable', 'active']]) {
  r.post(`/:id/${path}`, requirePermission('users:disable'), asyncHandler(async (req, res) => {
    const user = await loadManaged(req);
    user.status = status;
    await user.save();
    if (status === 'disabled') await revokeAllTokens(user._id);
    writeAudit(req, `user.${path}d`, 'user', user._id);
    res.json({ user: user.toSafe() });
  }));
}

r.post('/:id/reset-password', requirePermission('users:update'), asyncHandler(async (req, res) => {
  const user = await loadManaged(req);
  const password = tempPassword();
  user.passwordHash = await hashPassword(password);
  user.mustChangePassword = true; user.failedLogins = 0; user.lockedUntil = undefined;
  await user.save();
  await revokeAllTokens(user._id);
  writeAudit(req, 'password.reset', 'user', user._id);
  res.json({ user: user.toSafe(), temporaryPassword: password });
}));

export default r;
