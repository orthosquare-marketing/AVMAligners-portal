import jwt from 'jsonwebtoken';
import { timingSafeEqual } from 'node:crypto';
import { unauthorized, forbidden } from './errors.js';
import { hasPermission } from './permissions.js';

const secret = () => {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 32) throw new Error('JWT_SECRET must be set and at least 32 characters');
  return s;
};

export function signAccessToken(claims, expiresIn = process.env.ACCESS_TOKEN_TTL || '15m') {
  return jwt.sign(claims, secret(), { expiresIn, issuer: 'avm-identity' });
}

// Every service verifies the token itself. No service trusts the gateway.
// A user on a temporary password can do nothing except change it.
export const authenticateWith = ({ allowPasswordChange = false } = {}) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next(unauthorized());
  let c;
  try { c = jwt.verify(token, secret(), { issuer: 'avm-identity' }); } catch { return next(unauthorized('Session expired. Please sign in again')); }
  if (c.pwd && !allowPasswordChange) return next(forbidden('Change your temporary password first'));
  req.user = { id: c.sub, email: c.email, name: c.name, role: c.role, level: c.level, permissions: c.permissions || [], scope: c.scope || {} };
  next();
};
export const authenticate = authenticateWith();

export const requirePermission = (...needed) => (req, res, next) => {
  if (!req.user) return next(unauthorized());
  const ok = needed.every((p) => hasPermission(req.user.permissions, p));
  return ok ? next() : next(forbidden());
};

// Service-to-service calls carry a shared key and are never routed by the gateway.
export function requireInternal(req, res, next) {
  const given = Buffer.from(String(req.headers['x-internal-key'] || ''));
  const expected = Buffer.from(String(process.env.INTERNAL_API_KEY || ''));
  if (expected.length < 16 || given.length !== expected.length || !timingSafeEqual(given, expected)) return next(forbidden());
  next();
}

export async function internalCall(baseUrl, path, { method = 'POST', body, actor } = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'x-internal-key': process.env.INTERNAL_API_KEY || '',
      ...(actor ? { 'x-actor': JSON.stringify({ id: actor.id, email: actor.email, role: actor.role }) } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
