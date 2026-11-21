import React, { useEffect, useState } from 'react';
import { get, post, put } from '../api.js';
import { useSession } from '../App.jsx';
import { CreateForm, Search, Status, Table, fmtDate, fmtDateTime, useList } from './kit.jsx';

export function Users() {
  const { can, level } = useSession();
  const list = useList('/identity/users');
  const [roles, setRoles] = useState([]);
  const [note, setNote] = useState('');
  useEffect(() => { get('/identity/roles').then((d) => setRoles(d.items)).catch(() => {}); }, []);
  const lvl = (k) => roles.find((r) => r.key === k)?.level ?? 999;
  // Only roles below the signed-in user's level are offered. The API enforces the same rule.
  const allowed = roles.filter((r) => r.level < level).map((r) => ({ value: r.key, label: r.name }));
  const act = async (path, label) => { try { const d = await post(path); setNote(d.temporaryPassword ? `${label}. Temporary password for ${d.user.email}: ${d.temporaryPassword}` : label); list.reload(); } catch (e) { setNote(e.message); } };
  return (
    <>
      <h1>Users</h1>
      {can('users:create') && <CreateForm button="Create user" fields={[['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['role', 'Role', allowed]]}
        onCreate={async (b) => { const d = await post('/identity/users', b); list.reload(); return `Created. Temporary password for ${d.user.email}: ${d.temporaryPassword} (shown once)`; }} />}
      {note && <div className="ok">{note}</div>}
      <div className="card">
        <Search list={list} />
        <Table rows={list.items} cols={[
          { h: 'Name', f: (u) => u.name }, { h: 'Email', f: (u) => u.email }, { h: 'Role', f: (u) => u.role.replace(/_/g, ' ') },
          { h: 'Status', f: (u) => <Status v={u.status} /> }, { h: 'Last sign-in', f: (u) => fmtDate(u.lastLoginAt) },
          { h: '', f: (u) => lvl(u.role) < level && (
            <span className="row">
              {can('users:disable') && <button className="ghost" onClick={() => act(`/identity/users/${u.id}/${u.status === 'active' ? 'disable' : 'enable'}`, u.status === 'active' ? 'Disabled' : 'Enabled')}>{u.status === 'active' ? 'Disable' : 'Enable'}</button>}
              {can('users:update') && <button className="ghost" onClick={() => act(`/identity/users/${u.id}/reset-password`, 'Password reset')}>Reset password</button>}
            </span>) },
        ]} />
      </div>
    </>
  );
}

export function Roles() {
  const { can } = useSession();
  const [d, setD] = useState(null);
  const [msg, setMsg] = useState('');
  const load = () => get('/identity/roles').then(setD).catch((e) => setMsg(e.message));
  useEffect(() => { load(); }, []);
  if (!d) return <p className="muted">{msg || 'Loading…'}</p>;
  const editable = can('roles:update');
  const toggle = async (role, perm) => {
    const next = role.permissions.includes(perm) ? role.permissions.filter((p) => p !== perm) : [...role.permissions, perm];
    try { await put(`/identity/roles/${role.key}/permissions`, { permissions: next }); setMsg(''); load(); } catch (e) { setMsg(e.message); }
  };
  return (
    <>
      <h1>Roles and permissions</h1>
      <p className="muted">{editable ? 'Tick or untick to change a role. Changes apply at the user\'s next sign-in.' : 'Only a Super Admin can change roles.'}</p>
      {msg && <div className="err">{msg}</div>}
      <div className="card tablewrap">
        <table>
          <thead><tr><th>Permission</th>{d.items.map((r) => <th key={r.key}>{r.name}</th>)}</tr></thead>
          <tbody>{d.allPermissions.map((p) => (
            <tr key={p}><td>{p}</td>{d.items.map((r) => {
              const all = r.permissions.includes('*');
              const locked = !editable || r.key === 'super_admin' || d.superAdminOnly.includes(p);
              return <td key={r.key}><input type="checkbox" style={{ minWidth: 0 }} checked={all || r.permissions.includes(p)} disabled={locked} onChange={() => toggle(r, p)} /></td>;
            })}</tr>))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function Audit() {
  const list = useList('/identity/audit');
  return (
    <>
      <h1>Audit log</h1>
      <div className="card">
        <Table rows={list.items} cols={[
          { h: 'When', f: (a) => fmtDateTime(a.at) }, { h: 'Who', f: (a) => a.actorEmail || '' }, { h: 'Role', f: (a) => (a.actorRole || '').replace(/_/g, ' ') },
          { h: 'Module', f: (a) => a.service }, { h: 'Action', f: (a) => a.action }, { h: 'Record', f: (a) => `${a.entity || ''} ${a.entityId || ''}` },
        ]} />
      </div>
    </>
  );
}
