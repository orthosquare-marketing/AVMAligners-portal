import { Doctor } from './models/index.js';

// Row-level access. Returns a Mongo filter that limits what this user may see.
// Internal staff and admins see everything; partners and dentists see only their own.
export async function clinicScope(user) {
  switch (user.role) {
    case 'distributor': return { distributorId: user.scope.distributorId || '__none__' };
    case 'sales_executive': return { ownerUserId: user.id };
    case 'dentist':
    case 'clinic_staff': {
      const doc = user.scope.doctorId ? await Doctor.findById(user.scope.doctorId).lean() : null;
      return { _id: { $in: doc?.clinicIds || [] } };
    }
    case 'patient': return { _id: { $in: [] } };
    default: return {};
  }
}

export function doctorScope(user) {
  switch (user.role) {
    case 'distributor': return { distributorId: user.scope.distributorId || '__none__' };
    case 'sales_executive': return { ownerUserId: user.id };
    case 'dentist':
    case 'clinic_staff': return { _id: user.scope.doctorId || '000000000000000000000000' };
    case 'patient': return { _id: { $in: [] } };
    default: return {};
  }
}
