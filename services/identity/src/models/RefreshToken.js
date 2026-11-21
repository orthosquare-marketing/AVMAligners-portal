import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  revokedAt: { type: Date },
}, { timestamps: true });

export const RefreshToken = mongoose.model('RefreshToken', schema);
