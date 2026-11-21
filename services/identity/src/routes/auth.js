import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { asyncHandler, authenticateWith, validate, unauthorized, badRequest } from '@avm/common';
import { User } from '../models/User.js';
import { RefreshToken } from '../models/RefreshToken.js';
import { checkPassword, hashPassword, issueTokens, revokeAllTokens, sha256, assertStrongPassword, writeAudit } from '../lib.js';

const r = Router();
const authenticate = authenticateWith({ allowPasswordChange: true });
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: parseInt(process.env.LOGIN_RATE_LIMIT || '30', 10), standardHeaders: true, legacyHeaders: false, message: { error: 'Too many attempts. Try again later' } });

const MAX_FAILS = 5;
const LOCK_MINUTES = 15;

r.post('/login', limiter, validate(z.object({ email: z.string().email(), password: z.string().min(1) })), asyncHandler(async (req, res) => {
  const email = req.body.email.toLowerCase();
  const user = await User.findOne({ email });
  const fail = () => unauthorized('Email or password is incorrect');
  if (!user || user.status !== 'active') throw fail();
  if (user.lockedUntil && user.lockedUntil > new Date()) throw unauthorized('Account is locked after too many attempts. Try again in 15 minutes');
  if (!(await checkPassword(req.body.password, user.passwordHash))) {
    user.failedLogins += 1;
    if (user.failedLogins >= MAX_FAILS) { user.lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60000); user.failedLogins = 0; }
    await user.save();
    writeAudit(req, 'login.failed', 'user', user._id, undefined, { id: String(user._id), email, role: user.role });
    throw fail();
  }
  user.failedLogins = 0; user.lockedUntil = undefined; user.lastLoginAt = new Date();
  await user.save();
  const tokens = await issueTokens(user);
  writeAudit(req, 'login', 'user', user._id, undefined, { id: String(user._id), email, role: user.role });
  res.json({ ...tokens, user: user.toSafe() });
}));

r.post('/refresh', validate(z.object({ refreshToken: z.string().min(20) })), asyncHandler(async (req, res) => {
  const row = await RefreshToken.findOne({ tokenHash: sha256(req.body.refreshToken) });
  if (!row || row.revokedAt || row.expiresAt < new Date()) throw unauthorized('Session expired. Please sign in again');
  const user = await User.findById(row.userId);
  if (!user || user.status !== 'active') throw unauthorized('Session expired. Please sign in again');
  row.revokedAt = new Date();
  await row.save(); // rotation: each refresh token works once
  res.json({ ...(await issueTokens(user)), user: user.toSafe() });
}));

r.post('/logout', validate(z.object({ refreshToken: z.string().min(20) })), asyncHandler(async (req, res) => {
  await RefreshToken.updateOne({ tokenHash: sha256(req.body.refreshToken) }, { $set: { revokedAt: new Date() } });
  res.json({ ok: true });
}));

r.get('/me', authenticate, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user || user.status !== 'active') throw unauthorized();
  res.json({ user: user.toSafe(), permissions: req.user.permissions, level: req.user.level });
}));

r.post('/change-password', authenticate, validate(z.object({ currentPassword: z.string().min(1), newPassword: z.string() })), asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw unauthorized();
  if (!(await checkPassword(req.body.currentPassword, user.passwordHash))) throw badRequest('Current password is incorrect');
  assertStrongPassword(req.body.newPassword);
  user.passwordHash = await hashPassword(req.body.newPassword);
  user.mustChangePassword = false;
  await user.save();
  await revokeAllTokens(user._id);
  writeAudit(req, 'password.changed', 'user', user._id);
  res.json({ ...(await issueTokens(user)), user: user.toSafe() });
}));

export default r;
