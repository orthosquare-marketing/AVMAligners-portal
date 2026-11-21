import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, requireInternal, validate, conflict, badRequest } from '@avm/common';
import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import { AuditLog } from '../models/AuditLog.js';
import { hashPassword, tempPassword } from '../lib.js';

// Service-to-service only. The gateway does not route /internal.
const r = Router();
r.use(requireInternal);

r.post('/audit', asyncHandler(async (req, res) => {
  const { service, action, entity, entityId, details, actorId, actorEmail, actorRole, ip } = req.body || {};
  if (!action) throw badRequest('action is required');
  await AuditLog.create({ service, action, entity, entityId, details, actorId, actorEmail, actorRole, ip });
  res.status(201).json({ ok: true });
}));

// Only partner-facing roles may be created by other services. Staff and admins are created by people.
const ALLOWED = ['dentist', 'clinic_staff', 'distributor', 'patient'];
r.post('/users', validate(z.object({
  name: z.string().min(2), email: z.string().email(), phone: z.string().optional(),
  role: z.enum(ALLOWED), distributorId: z.string().optional(), doctorId: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const email = req.body.email.toLowerCase();
  if (await User.findOne({ email })) throw conflict('A user with this email already exists');
  if (!(await Role.findOne({ key: req.body.role }))) throw badRequest('Unknown role');
  let actor = {};
  try { actor = JSON.parse(req.headers['x-actor'] || '{}'); } catch { /* ignore */ }
  const password = tempPassword();
  const user = await User.create({ ...req.body, email, passwordHash: await hashPassword(password), mustChangePassword: true, createdBy: actor.id });
  await AuditLog.create({ service: 'identity', action: 'user.created', entity: 'user', entityId: String(user._id), details: { role: user.role, via: 'internal' }, actorId: actor.id, actorEmail: actor.email, actorRole: actor.role });
  res.status(201).json({ user: user.toSafe(), temporaryPassword: password });
}));

export default r;
