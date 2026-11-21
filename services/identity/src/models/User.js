import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true, index: true },
  status: { type: String, enum: ['active', 'disabled'], default: 'active' },
  mustChangePassword: { type: Boolean, default: false },
  // Ownership scope. Set for partner and dentist logins; used by other services to filter data.
  distributorId: { type: String },
  doctorId: { type: String },
  failedLogins: { type: Number, default: 0 },
  lockedUntil: { type: Date },
  lastLoginAt: { type: Date },
  createdBy: { type: String },
}, { timestamps: true });

schema.methods.toSafe = function toSafe() {
  const { _id, name, email, phone, role, status, mustChangePassword, distributorId, doctorId, lastLoginAt, createdAt } = this;
  return { id: String(_id), name, email, phone, role, status, mustChangePassword, distributorId, doctorId, lastLoginAt, createdAt };
};

export const User = mongoose.model('User', schema);
