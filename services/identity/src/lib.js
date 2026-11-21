import bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'node:crypto';
import { signAccessToken, badRequest } from '@avm/common';
import { Role } from './models/Role.js';
import { RefreshToken } from './models/RefreshToken.js';
import { AuditLog } from './models/AuditLog.js';

export const hashPassword = (p) => bcrypt.hash(p, 12);
export const checkPassword = (p, h) => bcrypt.compare(p, h);
export const sha256 = (s) => createHash('sha256').update(s).digest('hex');

export function assertStrongPassword(p) {
  if (typeof p !== 'string' || p.length < 10 || !/[a-z]/.test(p) || !/[A-Z]/.test(p) || !/\d/.test(p)) {
    throw badRequest('Password must be at least 10 characters with an upper-case letter, a lower-case letter and a number');
  }
}

export function tempPassword() {
  // 14 chars, always contains upper, lower and digit
  return `Av${randomBytes(6).toString('hex')}9Z`;
}

export async function issueTokens(user) {
  const role = await Role.findOne({ key: user.role });
  const accessToken = signAccessToken({
    sub: String(user._id), email: user.email, name: user.name, role: user.role,
    level: role?.level ?? 0, permissions: role?.permissions ?? [],
    scope: { distributorId: user.distributorId, doctorId: user.doctorId },
    ...(user.mustChangePassword ? { pwd: true } : {}),
  });
  const refreshToken = randomBytes(48).toString('hex');
  const days = parseInt(process.env.REFRESH_TOKEN_DAYS || '7', 10);
  await RefreshToken.create({ userId: String(user._id), tokenHash: sha256(refreshToken), expiresAt: new Date(Date.now() + days * 864e5) });
  return { accessToken, refreshToken, permissions: role?.permissions ?? [], level: role?.level ?? 0 };
}

export async function revokeAllTokens(userId) {
  await RefreshToken.updateMany({ userId: String(userId), revokedAt: null }, { $set: { revokedAt: new Date() } });
}

export function writeAudit(req, action, entity, entityId, details, actor) {
  const a = actor || req.user || {};
  return AuditLog.create({
    service: 'identity', action, entity, entityId: entityId ? String(entityId) : undefined, details,
    actorId: a.id, actorEmail: a.email, actorRole: a.role,
    ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip,
  }).catch(() => {});
}
