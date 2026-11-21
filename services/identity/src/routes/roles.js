import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, authenticate, requirePermission, validate, PERMISSIONS, SUPER_ADMIN_ONLY, badRequest, notFound, forbidden } from '@avm/common';
import { Role } from '../models/Role.js';
import { AuditLog } from '../models/AuditLog.js';
import { paging } from '@avm/common';
import { writeAudit } from '../lib.js';

export const roles = Router();
roles.use(authenticate);

roles.get('/', requirePermission('roles:read'), asyncHandler(async (req, res) => {
  const items = await Role.find().sort({ level: -1, name: 1 });
  res.json({ items: items.map((x) => ({ key: x.key, name: x.name, level: x.level, permissions: x.permissions })), allPermissions: PERMISSIONS, superAdminOnly: SUPER_ADMIN_ONLY });
}));

// Super Admin only (roles:update is reserved).
roles.put('/:key/permissions', requirePermission('roles:update'), validate(z.object({ permissions: z.array(z.string()) })), asyncHandler(async (req, res) => {
  const role = await Role.findOne({ key: req.params.key });
  if (!role) throw notFound('Role not found');
  if (role.key === 'super_admin') throw forbidden('Super Admin permissions cannot be changed');
  const unknown = req.body.permissions.filter((p) => !PERMISSIONS.includes(p));
  if (unknown.length) throw badRequest(`Unknown permissions: ${unknown.join(', ')}`);
  const reserved = req.body.permissions.filter((p) => SUPER_ADMIN_ONLY.includes(p));
  if (reserved.length) throw badRequest(`Reserved for Super Admin: ${reserved.join(', ')}`);
  const before = role.permissions;
  role.permissions = [...new Set(req.body.permissions)];
  await role.save();
  writeAudit(req, 'role.permissions.updated', 'role', role.key, { before, after: role.permissions });
  res.json({ key: role.key, permissions: role.permissions, note: 'Users with this role get the new permissions at their next sign-in or token refresh' });
}));

export const auditRoutes = Router();
auditRoutes.use(authenticate);
auditRoutes.get('/', requirePermission('audit:read'), asyncHandler(async (req, res) => {
  const { page, limit, skip } = paging(req);
  const q = {};
  for (const k of ['action', 'entity', 'entityId', 'actorId', 'service']) if (req.query[k]) q[k] = String(req.query[k]);
  const [items, total] = await Promise.all([AuditLog.find(q).sort({ at: -1 }).skip(skip).limit(limit).lean(), AuditLog.countDocuments(q)]);
  res.json({ items, total, page, limit });
}));
