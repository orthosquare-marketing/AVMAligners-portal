import React, { useState } from 'react';
import { post } from '../api.js';

export function Login({ onSignIn }) {
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setErr(''); setBusy(true);
    try { onSignIn(await post('/identity/auth/login', f)); } catch (x) { setErr(x.message); } finally { setBusy(false); }
  };
  return (
    <form className="card login" onSubmit={submit}>
      <h1>AVM Aligners Portal</h1>
      <label>Email<input type="email" autoComplete="username" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required /></label>
      <p />
      <label>Password<input type="password" autoComplete="current-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} required /></label>
      {err && <div className="err">{err}</div>}
      <p><button disabled={busy}>Sign in</button></p>
    </form>
  );
}

export function ChangePassword({ first, onDone }) {
  const [f, setF] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState({});
  const submit = async (e) => {
    e.preventDefault(); setMsg({});
    try { const d = await post('/identity/auth/change-password', f); setMsg({ ok: 'Password changed' }); setF({ currentPassword: '', newPassword: '' }); onDone(d); } catch (x) { setMsg({ err: x.message }); }
  };
  return (
    <form className={`card ${first ? 'login' : ''}`} onSubmit={submit} style={{ maxWidth: 420 }}>
      <h1>{first ? 'Set a new password' : 'Change password'}</h1>
      {first && <p className="muted">You are using a temporary password. Choose your own to continue.</p>}
      <label>Current password<input type="password" value={f.currentPassword} onChange={(e) => setF({ ...f, currentPassword: e.target.value })} required /></label>
      <p />
      <label>New password<input type="password" value={f.newPassword} onChange={(e) => setF({ ...f, newPassword: e.target.value })} required /></label>
      <p className="muted">At least 10 characters, with an upper-case letter, a lower-case letter and a number.</p>
      {msg.err && <div className="err">{msg.err}</div>}
      {msg.ok && <div className="ok">{msg.ok}</div>}
      <button>Save</button>
    </form>
  );
}
