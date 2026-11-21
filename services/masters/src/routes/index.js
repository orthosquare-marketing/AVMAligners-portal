import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, authenticate, requirePermission, requireInternal, validate, paging, escapeRegex, notFound, audit } from '@avm/common';
import { Clinic, Doctor, Product } from '../models/index.js';
import { clinicScope, doctorScope } from '../scope.js';

const out = (d) => { const o = d.toObject ? d.toObject() : d; o.id = String(o._id); delete o._id; delete o.__v; return o; };

const clinicBody = z.object({
  name: z.string().min(2), type: z.enum(['avmsmiles', 'external']).optional(), address: z.string().optional(),
  city: z.string().min(2), state: z.string().optional(), pincode: z.string().optional(), phone: z.string().optional(),
  labShortName: z.string().optional(), shipToAddress: z.string().optional(), status: z.enum(['active', 'inactive']).optional(),
  distributorId: z.string().optional(), ownerUserId: z.string().optional(),
});
const doctorBody = z.object({
  name: z.string().min(2), email: z.string().email().optional(), phone: z.string().optional(), licenseNo: z.string().optional(),
  clinicIds: z.array(z.string()).optional(), status: z.enum(['active', 'inactive']).optional(),
  distributorId: z.string().optional(), ownerUserId: z.string().optional(), userId: z.string().optional(),
});
const productBody = z.object({ code: z.string().min(1), name: z.string().min(2), description: z.string().optional(), active: z.boolean().optional() });

function crud(Model, name, readPerm, createPerm, updatePerm, body, scopeFn, searchFields) {
  const r = Router();
  r.use(authenticate);
  r.get('/', requirePermission(readPerm), asyncHandler(async (req, res) => {
    const { page, limit, skip } = paging(req);
    const q = { ...(scopeFn ? await scopeFn(req.user) : {}) };
    if (req.query.status) q.status = String(req.query.status);
    if (req.query.q) { const rx = new RegExp(escapeRegex(req.query.q), 'i'); q.$or = searchFields.map((f) => ({ [f]: rx })); }
    const [items, total] = await Promise.all([Model.find(q).sort({ name: 1 }).skip(skip).limit(limit), Model.countDocuments(q)]);
    res.json({ items: items.map(out), total, page, limit });
  }));
  r.get('/:id', requirePermission(readPerm), asyncHandler(async (req, res) => {
    const scope = scopeFn ? await scopeFn(req.user) : {};
    // Scope is applied in the query, so another user's record is "not found", never "forbidden".
    const doc = await Model.findOne({ $and: [{ _id: req.params.id }, scope] });
    if (!doc) throw notFound(`${name} not found`);
    res.json(out(doc));
  }));
  r.post('/', requirePermission(createPerm), validate(body), asyncHandler(async (req, res) => {
    const doc = await Model.create({ ...req.body, createdBy: req.user.id });
    audit(req, `${name}.created`, name, doc._id);
    res.status(201).json(out(doc));
  }));
  r.patch('/:id', requirePermission(updatePerm), validate(body.partial()), asyncHandler(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) throw notFound(`${name} not found`);
    Object.assign(doc, req.body);
    await doc.save();
    audit(req, `${name}.updated`, name, doc._id, { changed: Object.keys(req.body) });
    res.json(out(doc));
  }));
  return r;
}

export const clinics = crud(Clinic, 'clinic', 'clinics:read', 'clinics:create', 'clinics:update', clinicBody, clinicScope, ['name', 'city', 'labShortName']);
export const doctors = crud(Doctor, 'doctor', 'doctors:read', 'doctors:create', 'doctors:update', doctorBody, doctorScope, ['name', 'email']);
export const products = crud(Product, 'product', 'products:read', 'products:manage', 'products:manage', productBody, null, ['name', 'code']);

// Service-to-service only.
export const internal = Router();
internal.use(requireInternal);
internal.post('/clinics', validate(clinicBody.extend({ createdBy: z.string().optional() })), asyncHandler(async (req, res) => res.status(201).json(out(await Clinic.create(req.body)))));
internal.post('/doctors', validate(doctorBody.extend({ createdBy: z.string().optional() })), asyncHandler(async (req, res) => res.status(201).json(out(await Doctor.create(req.body)))));
internal.patch('/doctors/:id', validate(doctorBody.partial()), asyncHandler(async (req, res) => {
  const doc = await Doctor.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  if (!doc) throw notFound('doctor not found');
  res.json(out(doc));
}));
internal.delete('/clinics/:id', asyncHandler(async (req, res) => { await Clinic.deleteOne({ _id: req.params.id }); res.json({ ok: true }); }));
internal.delete('/doctors/:id', asyncHandler(async (req, res) => { await Doctor.deleteOne({ _id: req.params.id }); res.json({ ok: true }); }));
