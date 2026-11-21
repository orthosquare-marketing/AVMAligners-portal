import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  permissions: [{ type: String }],
}, { timestamps: true });

export const Role = mongoose.model('Role', schema);
