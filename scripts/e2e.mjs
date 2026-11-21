// End-to-end check through the gateway. Needs all services running.
// Usage: GATEWAY=http://localhost:4000 SUPER_ADMIN_EMAIL=... SUPER_ADMIN_PASSWORD=... node scripts/e2e.mjs
const GW = process.env.GATEWAY || 'http://localhost:4000';
const SA_EMAIL = process.env.SUPER_ADMIN_EMAIL;
const SA_PASS = process.env.SUPER_ADMIN_PASSWORD;
const tag = Date.now().toString(36);
let passed = 0; let failed = 0;

async function call(method, path, { token, body } = {}) {
  const res = await fetch(`${GW}/api${path}`, { method, headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
  return { status: res.status, data: await res.json().catch(() => ({})) };
}
function check(name, cond, extra) {
  if (cond) { passed += 1; console.log(`  ok   ${name}`); } else { failed += 1; console.log(`  FAIL ${name}`, extra ?? ''); }
}
async function login(email, password) {
  const r = await call('POST', '/identity/auth/login', { body: { email, password } });
  return r.data.accessToken;
}
// first login needs a password change; do it and return a working token
async function firstLogin(email, temp) {
  const t = await login(email, temp);
  const np = `New${tag}Pass9x`;
  const r = await call('POST', '/identity/auth/change-password', { token: t, body: { currentPassword: temp, newPassword: np } });
  return r.data.accessToken;
}

console.log('Identity');
let sa;
{
  // A fresh Super Admin is on a temporary password: change it first, as the portal requires.
  const r = await call('POST', '/identity/auth/login', { body: { email: SA_EMAIL, password: SA_PASS } });
  sa = r.data.accessToken;
  if (r.data.user?.mustChangePassword) {
    check('temporary password is blocked from other actions', (await call('GET', '/identity/users', { token: sa })).status === 403);
    const np = process.env.SUPER_ADMIN_NEW_PASSWORD || `${SA_PASS}Zz9`;
    sa = (await call('POST', '/identity/auth/change-password', { token: sa, body: { currentPassword: SA_PASS, newPassword: np } })).data.accessToken;
  }
}
check('super admin signs in', !!sa);
check('wrong password is refused', (await call('POST', '/identity/auth/login', { body: { email: SA_EMAIL, password: 'nope' } })).status === 401);
check('no token is refused', (await call('GET', '/identity/users')).status === 401);

const mk = (role, extra = {}) => call('POST', '/identity/users', { token: sa, body: { name: `${role} ${tag}`, email: `${role}.${tag}@example.test`, role, ...extra } });
const adminU = await mk('admin');
check('super admin creates an admin', adminU.status === 201, adminU.data);
const admin = await firstLogin(adminU.data.user.email, adminU.data.temporaryPassword);
check('admin signs in after changing password', !!admin);

console.log('Admin is one level below Super Admin');
check('admin cannot create another admin', (await call('POST', '/identity/users', { token: admin, body: { name: 'x admin', email: `a2.${tag}@example.test`, role: 'admin' } })).status === 403);
check('admin cannot create a super admin', (await call('POST', '/identity/users', { token: admin, body: { name: 'x super', email: `s2.${tag}@example.test`, role: 'super_admin' } })).status === 403);
check('admin cannot edit role permissions', (await call('PUT', '/identity/roles/dentist/permissions', { token: admin, body: { permissions: ['clinics:read'] } })).status === 403);
const saId = (await call('GET', '/identity/auth/me', { token: sa })).data.user.id;
check('admin cannot disable the super admin', (await call('POST', `/identity/users/${saId}/disable`, { token: admin })).status === 403);
check('admin can read the audit log', (await call('GET', '/identity/audit', { token: admin })).status === 200);
check('super admin can edit role permissions', (await call('PUT', '/identity/roles/clinic_staff/permissions', { token: sa, body: { permissions: ['clinics:read', 'products:read'] } })).status === 200);
check('reserved permission cannot be given to a role', (await call('PUT', '/identity/roles/dentist/permissions', { token: sa, body: { permissions: ['roles:update'] } })).status === 400);

console.log('Masters');
const prod = await call('POST', '/masters/products', { token: admin, body: { code: `CL${tag}`, name: 'Classic' } });
check('admin creates a product', prod.status === 201, prod.data);
const otherClinic = await call('POST', '/masters/clinics', { token: admin, body: { name: `Other Clinic ${tag}`, city: 'Pune' } });
check('admin creates a clinic', otherClinic.status === 201, otherClinic.data);

console.log('Onboarding');
const dist = await call('POST', '/onboarding/distributors', { token: admin, body: { code: `D${tag}`, name: `Distributor ${tag}`, states: ['Maharashtra'] } });
check('admin creates a distributor', dist.status === 201, dist.data);
const dLogin = await call('POST', `/onboarding/distributors/${dist.data.id}/users`, { token: admin, body: { name: `Dist User ${tag}`, email: `dist.${tag}@example.test` } });
check('admin creates a distributor login', dLogin.status === 201, dLogin.data);
const distTok = await firstLogin(dLogin.data.user.email, dLogin.data.temporaryPassword);

const dist2 = await call('POST', '/onboarding/distributors', { token: admin, body: { code: `E${tag}`, name: `Other Distributor ${tag}` } });
const d2Login = await call('POST', `/onboarding/distributors/${dist2.data.id}/users`, { token: admin, body: { name: `Dist2 User ${tag}`, email: `dist2.${tag}@example.test` } });
const dist2Tok = await firstLogin(d2Login.data.user.email, d2Login.data.temporaryPassword);

const leadBody = { dentistName: `Dr. Test ${tag}`, email: `dr.${tag}@example.test`, phone: '9000000000', clinicName: `Smile Clinic ${tag}`, city: 'Mumbai', state: 'Maharashtra' };
const lead = await call('POST', '/onboarding/leads', { token: distTok, body: { ...leadBody, distributorId: dist2.data.id } });
check('distributor creates a lead', lead.status === 201, lead.data);
check('lead is forced onto the distributor own account', lead.data.distributorId === dist.data.id);
check('other distributor cannot see the lead', (await call('GET', `/onboarding/leads/${lead.data.id}`, { token: dist2Tok })).status === 404);
check('other distributor list is empty', (await call('GET', '/onboarding/leads', { token: dist2Tok })).data.total === 0);
check('distributor cannot approve its own lead', (await call('POST', `/onboarding/leads/${lead.data.id}/approve`, { token: distTok })).status === 403);
check('lead cannot be approved before it is submitted', (await call('POST', `/onboarding/leads/${lead.data.id}/approve`, { token: admin })).status === 400);
check('distributor submits the lead', (await call('POST', `/onboarding/leads/${lead.data.id}/submit`, { token: distTok })).data.status === 'submitted');
const appr = await call('POST', `/onboarding/leads/${lead.data.id}/approve`, { token: admin });
check('admin approves: clinic, doctor and login are created', appr.status === 200 && !!appr.data.login?.temporaryPassword && !!appr.data.lead?.result?.clinicId, appr.data);
check('approved lead cannot be edited', (await call('PATCH', `/onboarding/leads/${lead.data.id}`, { token: distTok, body: { city: 'Thane' } })).status === 400);

console.log('Dentist sees only own records');
const dentist = await firstLogin(appr.data.login.email, appr.data.login.temporaryPassword);
check('dentist signs in', !!dentist);
const myClinics = await call('GET', '/masters/clinics', { token: dentist });
check('dentist sees exactly one clinic, their own', myClinics.data.total === 1 && myClinics.data.items[0].id === appr.data.lead.result.clinicId, myClinics.data);
check('dentist cannot open another clinic', (await call('GET', `/masters/clinics/${otherClinic.data.id}`, { token: dentist })).status === 404);
check('dentist cannot create a clinic', (await call('POST', '/masters/clinics', { token: dentist, body: { name: 'x clinic', city: 'Goa' } })).status === 403);
check('dentist cannot list users', (await call('GET', '/identity/users', { token: dentist })).status === 403);
check('dentist cannot see leads', (await call('GET', '/onboarding/leads', { token: dentist })).status === 403);
const distClinics = await call('GET', '/masters/clinics', { token: distTok });
check('distributor sees the clinic it onboarded and no other', distClinics.data.total === 1 && distClinics.data.items[0].id === appr.data.lead.result.clinicId);

console.log('Gateway and audit');
check('internal routes are closed at the gateway', (await call('POST', '/identity/internal/audit', { body: { action: 'x' } })).status === 404);
await new Promise((r) => setTimeout(r, 500));
const au = await call('GET', '/identity/audit?action=lead.approved', { token: sa });
check('approval is in the audit log', au.data.items?.some((x) => x.entityId === lead.data.id));
check('disabled user cannot sign in', await (async () => {
  await call('POST', `/identity/users/${dLogin.data.user.id}/disable`, { token: admin });
  return (await call('POST', '/identity/auth/login', { body: { email: dLogin.data.user.email, password: `New${tag}Pass9x` } })).status === 401;
})());

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
