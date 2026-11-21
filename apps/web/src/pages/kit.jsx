import React, { useCallback, useEffect, useState } from 'react';
import { get } from '../api.js';

// Dates are shown as DD-MM-YYYY across the portal.
export const fmtDate = (d) => {
  if (!d) return '';
  const x = new Date(d); const p = (n) => String(n).padStart(2, '0');
  return `${p(x.getDate())}-${p(x.getMonth() + 1)}-${x.getFullYear()}`;
};
export const fmtDateTime = (d) => (d ? `${fmtDate(d)} ${new Date(d).toTimeString().slice(0, 5)}` : '');

export function useList(path) {
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: '' });
  const [q, setQ] = useState('');
  const load = useCallback(async () => {
    try {
      const sep = path.includes('?') ? '&' : '?';
      const d = await get(`${path}${sep}limit=100${q ? `&q=${encodeURIComponent(q)}` : ''}`);
      setState({ ...d, loading: false, error: '' });
    } catch (e) { setState((s) => ({ ...s, loading: false, error: e.message })); }
  }, [path, q]);
  useEffect(() => { load(); }, [load]);
  return { ...state, q, setQ, reload: load };
}

export function Table({ cols, rows, empty = 'Nothing here yet' }) {
  if (!rows.length) return <p className="muted">{empty}</p>;
  return (
    <div className="tablewrap"><table>
      <thead><tr>{cols.map((c) => <th key={c.h}>{c.h}</th>)}</tr></thead>
      <tbody>{rows.map((r) => <tr key={r.id || r._id}>{cols.map((c) => <td key={c.h}>{c.f(r)}</td>)}</tr>)}</tbody>
    </table></div>
  );
}

// A small create form driven by a field list: [name, label, options?]
export function CreateForm({ fields, onCreate, button = 'Add' }) {
  const blank = Object.fromEntries(fields.map(([n]) => [n, '']));
  const [f, setF] = useState(blank);
  const [msg, setMsg] = useState({});
  const submit = async (e) => {
    e.preventDefault(); setMsg({});
    const body = Object.fromEntries(Object.entries(f).filter(([, v]) => v !== ''));
    try { const ok = await onCreate(body); setF(blank); setMsg({ ok: ok || '' }); } catch (x) { setMsg({ err: x.message }); }
  };
  return (
    <form className="card" onSubmit={submit}>
      <div className="row">
        {fields.map(([n, label, opts]) => (
          <label key={n}>{label}
            {opts
              ? <select value={f[n]} onChange={(e) => setF({ ...f, [n]: e.target.value })}><option value="">Select</option>{opts.map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}</select>
              : <input value={f[n]} onChange={(e) => setF({ ...f, [n]: e.target.value })} />}
          </label>
        ))}
        <button>{button}</button>
      </div>
      {msg.err && <div className="err">{msg.err}</div>}
      {msg.ok && <div className="ok">{msg.ok}</div>}
    </form>
  );
}

export const Search = ({ list }) => <p><input placeholder="Search" value={list.q} onChange={(e) => list.setQ(e.target.value)} /> <span className="muted">{list.total} found</span></p>;
export const Status = ({ v }) => <span className={`pill ${['active', 'approved'].includes(v) ? 'good' : ['disabled', 'inactive', 'rejected'].includes(v) ? 'bad' : ''}`}>{String(v).replace(/_/g, ' ')}</span>;
