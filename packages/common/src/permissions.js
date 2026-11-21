// Single source of truth for permissions and default roles.
// The identity service seeds the roles collection from this file.
// Super Admin can later edit role permissions through the API.

export const PERMISSIONS = [
  // identity
  'users:read', 'users:create', 'users:update', 'users:disable',
  'roles:read', 'roles:update',
  'audit:read',
  'settings:update',
  'records:delete',
  // masters
  'clinics:read', 'clinics:create', 'clinics:update',
  'doctors:read', 'doctors:create', 'doctors:update',
  'products:read', 'products:manage',
  // onboarding
  'distributors:read', 'distributors:manage',
  'leads:read', 'leads:create', 'leads:update', 'leads:approve',
];

// Reserved for Super Admin only. Admin is "one level lower":
// full day-to-day control, but cannot change roles, system settings,
// delete records permanently, or manage other Admins (see level rule).
export const SUPER_ADMIN_ONLY = ['roles:update', 'settings:update', 'records:delete'];

const READ_MASTERS = ['clinics:read', 'doctors:read', 'products:read'];
const PARTNER = ['leads:read', 'leads:create', 'leads:update', ...READ_MASTERS];

// level: a user can only create or change users whose role level is LOWER than their own.
export const DEFAULT_ROLES = [
  { key: 'super_admin', name: 'Super Admin', level: 100, permissions: ['*'] },
  { key: 'admin', name: 'Admin', level: 90, permissions: PERMISSIONS.filter((p) => !SUPER_ADMIN_ONLY.includes(p)) },
  { key: 'accounts', name: 'Accounts', level: 50, permissions: [...READ_MASTERS, 'distributors:read'] },
  { key: 'treatment_planner', name: 'Treatment Planner', level: 50, permissions: READ_MASTERS },
  { key: 'production', name: 'Production', level: 50, permissions: READ_MASTERS },
  { key: 'quality_check', name: 'Quality Check', level: 50, permissions: READ_MASTERS },
  { key: 'dispatch', name: 'Dispatch', level: 50, permissions: READ_MASTERS },
  { key: 'sales_executive', name: 'Sales Executive', level: 40, permissions: PARTNER },
  { key: 'distributor', name: 'Distributor', level: 40, permissions: PARTNER },
  { key: 'dentist', name: 'Dentist', level: 30, permissions: READ_MASTERS },
  { key: 'clinic_staff', name: 'Clinic Staff', level: 20, permissions: ['clinics:read', 'products:read'] },
  { key: 'patient', name: 'Patient', level: 10, permissions: [] },
];

export function hasPermission(granted = [], needed) {
  return granted.includes('*') || granted.includes(needed);
}
