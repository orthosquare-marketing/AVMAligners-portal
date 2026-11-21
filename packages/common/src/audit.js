import { internalCall } from './auth.js';

// Fire-and-forget audit event to the identity service. Never blocks or fails the request.
export function audit(req, action, entity, entityId, details) {
  const service = process.env.SERVICE_NAME || 'unknown';
  const event = {
    service, action, entity, entityId: entityId ? String(entityId) : undefined, details,
    actorId: req.user?.id, actorEmail: req.user?.email, actorRole: req.user?.role,
    ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip,
  };
  const url = process.env.IDENTITY_URL;
  if (!url) return;
  internalCall(url, '/internal/audit', { body: event }).catch(() => {});
}
