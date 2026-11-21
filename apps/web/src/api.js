// One API client for every module. All calls go through the gateway at /api/<module>/...
const BASE = import.meta.env.VITE_API_URL || '/api';
let accessToken = null;
let onSignOut = () => {};

export const setSignOutHandler = (fn) => { onSignOut = fn; };
export const setTokens = (t) => {
  accessToken = t?.accessToken || null;
  if (t?.refreshToken) sessionStorage.setItem('rt', t.refreshToken); else if (t === null) sessionStorage.removeItem('rt');
};
export const hasRefresh = () => !!sessionStorage.getItem('rt');

let refreshing = null;
export async function refresh() {
  const rt = sessionStorage.getItem('rt');
  if (!rt) return null;
  refreshing ||= fetch(`${BASE}/identity/auth/refresh`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ refreshToken: rt }) })
    .then(async (r) => (r.ok ? r.json() : null)).finally(() => { refreshing = null; });
  const data = await refreshing;
  if (!data) { setTokens(null); return null; }
  setTokens(data);
  return data;
}

export async function api(method, path, body, retry = true) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'content-type': 'application/json', ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401 && retry && !path.includes('/auth/login')) {
    if (await refresh()) return api(method, path, body, false);
    onSignOut();
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.details?.map?.((d) => `${d.field}: ${d.message}`).join('; ');
    throw new Error(detail ? `${data.error} (${detail})` : data.error || 'Request failed');
  }
  return data;
}
export const get = (p) => api('GET', p);
export const post = (p, b) => api('POST', p, b);
export const patch = (p, b) => api('PATCH', p, b);
export const put = (p, b) => api('PUT', p, b);
