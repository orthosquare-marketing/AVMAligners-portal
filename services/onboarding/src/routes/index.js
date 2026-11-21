import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, authenticate, requirePermission, validate, paging, escapeRegex, notFound, badRequest, forbidden, conflict, HttpError, audit, internalCall } from '@avm/common';
import { Distributor, Lead, LEAD_STATUSES } from '../models/index.js';

const out = (d) => { const o = d.toObject(); o.id = String(o._id); delete o._id; delete o.__v; return o; };
const IDENTITY = () => process.env.IDENTITY_URL;
const MASTERS = () => process.env.MASTERS_URL;

// ---------------- Distributors ----------------
export const distributors = Router();
distributors.use(authenticate);
const distBody = z.object({
  code: z.string().min(2), name: z.string().min(2), contactName: z.string().optional(), email: z.string().email().optional(),
  phone: z.string().optional(), states: z.array(z.string()).optional(), cities: z.array(z.string()).optional(), status: z.enum(['active', 'inactive']).optional(),
});

distributors.get('/', requirePermission('distributors:read'), asyncHandler(async (req, res) => {
  const { page, limit, skip } = paging(req);
  const q = {};
  if (req.query.q) { const rx = new RegExp(escapeRegex(req.query.q), 'i'); q.$or = [{ name: rx }, { code: rx }]; }
  const [items, total] = await Promise.all([Distributor.find(q).sort({ name: 1 }).skip(skip).limit(limit), Distributor.countDocuments(q)]);
  res.json({ items: items.map(out), total, page, limit });
}));
distributors.post('/', requirePermission('distributors:manage'), validate(distBody), asyncHandler(async (req, res) => {
  const d = await Distributor.create({ ...req.body, createdBy: req.user.id });
  audit(req, 'distributor.created', 'distributor', d._id);
  res.status(201).json(out(d));
}));
distributors.patch('/:id', requirePermission('distributors:manage'), validate(distBody.partial()), asyncHandler(async (req, res) => {
  const d = await Distributor.findById(req.params.id);
  if (!d) throw notFound('Distributor not found');
  Object.assign(d, req.body);
  await d.save();
  audit(req, 'distributor.updated', 'distributor', d._id, { changed: Object.keys(req.body) });
  res.json(out(d));
}));
// Create a login for a distributor. The login is tied to this distributor and sees only its own records.
distributors.post('/:id/users', requirePermission('distributors:manage'), validate(z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().optional() })), asyncHandler(async (req, res) => {
  const d = await Distributor.findById(req.params.id);
  if (!d) throw notFound('Distributor not found');
  const r = await internalCall(IDENTITY(), '/internal/users', { body: { ...req.body, role: 'distributor', distributorId: String(d._id) }, actor: req.user });
  if (!r.ok) throw new HttpError(r.status === 409 ? 409 : 502, r.data.error || 'Could not create the login');
  audit(req, 'distributor.user.created', 'distributor', d._id, { userId: r.data.user.id });
  res.status(201).json(r.data);
}));

// ---------------- Leads ----------------
export const leads = Router();
leads.use(authenticate);

function leadScope(user) {
  if (user.role === 'distributor') return { distributorId: user.scope.distributorId || '__none__' };
  if (user.role === 'sales_executive') return { ownerUserId: user.id };
  return {};
}
async function loadLead(req) {
  const lead = await Lead.findOne({ $and: [{ _id: req.params.id }, leadScope(req.user)] });
  if (!lead) throw notFound('Lead not found');
  return lead;
}
const closed = (lead) => ['approved', 'rejected'].includes(lead.status);

const leadBody = z.object({
  dentistName: z.string().min(2), email: z.string().email(), phone: z.string().min(6), licenseNo: z.string().optional(),
  clinicName: z.string().min(2), clinicAddress: z.string().optional(), city: z.string().min(2), state: z.string().optional(), pincode: z.string().optional(),
  clinicType: z.enum(['avmsmiles', 'external']).optional(), distributorId: z.string().optional(),
});

leads.get('/', requirePermission('leads:read'), asyncHandler(async (req, res) => {
  const { page, limit, skip } = paging(req);
  const q = { ...leadScope(req.user) };
  if (req.query.status) q.status = String(req.query.status);
  if (req.query.q) { const rx = new RegExp(escapeRegex(req.query.q), 'i'); q.$or = [{ dentistName: rx }, { clinicName: rx }, { city: rx }, { email: rx }]; }
  const [items, total] = await Promise.all([Lead.find(q).sort({ createdAt: -1 }).skip(skip).limit(limit), Lead.countDocuments(q)]);
  res.json({ items: items.map(out), total, page, limit, statuses: LEAD_STATUSES });
}));

leads.get('/:id', requirePermission('leads:read'), asyncHandler(async (req, res) => res.json(out(await loadLead(req)))));

leads.post('/', requirePermission('leads:create'), validate(leadBody), asyncHandler(async (req, res) => {
  const isDistributor = req.user.role === 'distributor';
  if (isDistributor && !req.user.scope.distributorId) throw forbidden('Your login is not linked to a distributor');
  // A distributor's lead always belongs to that distributor, whatever the request says.
  const distributorId = isDistributor ? req.user.scope.distributorId : req.body.distributorId;
  const lead = await Lead.create({ ...req.body, distributorId, source: distributorId ? 'distributor' : 'sales', ownerUserId: req.user.id, ownerName: req.user.name });
  audit(req, 'lead.created', 'lead', lead._id);
  res.status(201).json(out(lead));
}));

leads.patch('/:id', requirePermission('leads:update'), validate(leadBody.omit({ distributorId: true }).partial().extend({ status: z.enum(['new', 'contacted', 'documents_pending']).optional() })), asyncHandler(async (req, res) => {
  const lead = await loadLead(req);
  if (closed(lead)) throw badRequest('This lead is closed and cannot be changed');
  Object.assign(lead, req.body);
  await lead.save();
  audit(req, 'lead.updated', 'lead', lead._id, { changed: Object.keys(req.body) });
  res.json(out(lead));
}));

leads.post('/:id/notes', requirePermission('leads:update'), validate(z.object({ text: z.string().min(1).max(2000) })), asyncHandler(async (req, res) => {
  const lead = await loadLead(req);
  lead.notes.push({ by: req.user.id, byName: req.user.name, text: req.body.text });
  await lead.save();
  res.status(201).json(out(lead));
}));

leads.post('/:id/submit', requirePermission('leads:update'), asyncHandler(async (req, res) => {
  const lead = await loadLead(req);
  if (closed(lead)) throw badRequest('This lead is already closed');
  lead.status = 'submitted';
  await lead.save();
  audit(req, 'lead.submitted', 'lead', lead._id);
  res.json(out(lead));
}));

leads.post('/:id/reject', requirePermission('leads:approve'), validate(z.object({ reason: z.string().min(3) })), asyncHandler(async (req, res) => {
  const lead = await loadLead(req);
  if (closed(lead)) throw badRequest('This lead is already closed');
  lead.status = 'rejected';
  lead.decision = { by: req.user.id, byName: req.user.name, at: new Date(), reason: req.body.reason };
  await lead.save();
  audit(req, 'lead.rejected', 'lead', lead._id, { reason: req.body.reason });
  res.json(out(lead));
}));

// Approval creates the clinic, the doctor and the dentist login, in that order.
// If a later step fails, the earlier records are removed so nothing is left half-made.
leads.post('/:id/approve', requirePermission('leads:approve'), asyncHandler(async (req, res) => {
  const lead = await loadLead(req);
  if (lead.status !== 'submitted') throw badRequest('Only a submitted lead can be approved');
  const actor = req.user;
  const common = { distributorId: lead.distributorId, ownerUserId: lead.ownerUserId, createdBy: actor.id };

  const c = await internalCall(MASTERS(), '/internal/clinics', { actor, body: { name: lead.clinicName, type: lead.clinicType, address: lead.clinicAddress, shipToAddress: lead.clinicAddress, city: lead.city, state: lead.state, pincode: lead.pincode, phone: lead.phone, ...common } });
  if (!c.ok) throw new HttpError(502, 'Could not create the clinic');

  const d = await internalCall(MASTERS(), '/internal/doctors', { actor, body: { name: lead.dentistName, email: lead.email, phone: lead.phone, licenseNo: lead.licenseNo, clinicIds: [c.data.id], ...common } });
  if (!d.ok) {
    await internalCall(MASTERS(), `/internal/clinics/${c.data.id}`, { method: 'DELETE' });
    throw new HttpError(502, 'Could not create the doctor');
  }

  const u = await internalCall(IDENTITY(), '/internal/users', { actor, body: { name: lead.dentistName, email: lead.email, phone: lead.phone, role: 'dentist', doctorId: d.data.id, distributorId: lead.distributorId } });
  if (!u.ok) {
    await internalCall(MASTERS(), `/internal/doctors/${d.data.id}`, { method: 'DELETE' });
    await internalCall(MASTERS(), `/internal/clinics/${c.data.id}`, { method: 'DELETE' });
    if (u.status === 409) throw conflict('A login with this email already exists');
    throw new HttpError(502, 'Could not create the dentist login');
  }
  await internalCall(MASTERS(), `/internal/doctors/${d.data.id}`, { method: 'PATCH', body: { userId: u.data.user.id } });

  lead.status = 'approved';
  lead.decision = { by: actor.id, byName: actor.name, at: new Date() };
  lead.result = { clinicId: c.data.id, doctorId: d.data.id, userId: u.data.user.id };
  await lead.save();
  audit(req, 'lead.approved', 'lead', lead._id, lead.result);
  // The temporary password is returned once, to pass on to the dentist.
  res.json({ lead: out(lead), login: { email: u.data.user.email, temporaryPassword: u.data.temporaryPassword } });
}));
