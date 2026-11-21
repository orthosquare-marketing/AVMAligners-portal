import mongoose from 'mongoose';

const distributorSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  contactName: String,
  email: { type: String, lowercase: true, trim: true },
  phone: String,
  states: [String],
  cities: [String],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdBy: String,
}, { timestamps: true });

export const LEAD_STATUSES = ['new', 'contacted', 'documents_pending', 'submitted', 'approved', 'rejected'];

const leadSchema = new mongoose.Schema({
  dentistName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  licenseNo: String,
  clinicName: { type: String, required: true, trim: true },
  clinicAddress: String,
  city: { type: String, required: true },
  state: String,
  pincode: String,
  clinicType: { type: String, enum: ['avmsmiles', 'external'], default: 'external' },
  source: { type: String, enum: ['distributor', 'sales'], required: true },
  distributorId: { type: String, index: true },
  ownerUserId: { type: String, required: true, index: true },
  ownerName: String,
  status: { type: String, enum: LEAD_STATUSES, default: 'new', index: true },
  notes: [{ by: String, byName: String, at: { type: Date, default: Date.now }, text: String }],
  decision: { by: String, byName: String, at: Date, reason: String },
  result: { clinicId: String, doctorId: String, userId: String },
}, { timestamps: true });

export const Distributor = mongoose.model('Distributor', distributorSchema);
export const Lead = mongoose.model('Lead', leadSchema);
