import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['avmsmiles', 'external'], default: 'external' },
  address: String,
  city: { type: String, required: true, trim: true },
  state: String,
  pincode: String,
  phone: String,
  labShortName: String, // the production team's short code for the clinic
  shipToAddress: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  distributorId: { type: String, index: true },
  ownerUserId: { type: String, index: true }, // sales executive or distributor user who onboarded it
  createdBy: String,
}, { timestamps: true });
clinicSchema.index({ name: 1, city: 1 });

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true, index: true },
  phone: String,
  licenseNo: String,
  userId: { type: String, index: true }, // identity user, once a login exists
  clinicIds: [{ type: String }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  distributorId: { type: String, index: true },
  ownerUserId: { type: String, index: true },
  createdBy: String,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  description: String,
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Clinic = mongoose.model('Clinic', clinicSchema);
export const Doctor = mongoose.model('Doctor', doctorSchema);
export const Product = mongoose.model('Product', productSchema);
