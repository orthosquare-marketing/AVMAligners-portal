import mongoose from 'mongoose';

// Append-only. There is no update or delete route for this collection.
const schema = new mongoose.Schema({
  at: { type: Date, default: Date.now, index: true },
  service: String,
  action: { type: String, index: true },
  entity: String,
  entityId: String,
  actorId: { type: String, index: true },
  actorEmail: String,
  actorRole: String,
  ip: String,
  details: mongoose.Schema.Types.Mixed,
});

export const AuditLog = mongoose.model('AuditLog', schema);
