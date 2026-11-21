import React, { useState } from 'react';
import { post } from '../api.js';
import { useSession } from '../App.jsx';
import { CreateForm, Search, Status, Table, fmtDate, useList } from './kit.jsx';

export function Distributors() {
  const { can } = useSession();
  const list = useList('/onboarding/distributors');
  const [note, setNote] = useState('');
  const addLogin = async (d) => {
    const name = window.prompt?.('Name of the person') || '';
    const email = name && (window.prompt?.('Their email') || '');
    if (!name || !email) return;
    try { const r = await post(`/onboarding/distributors/${d.id}/users`, { name, email }); setNote(`Login created for ${r.user.email}. Temporary password: ${r.temporaryPassword} (shown once)`); } catch (e) { setNote(e.message); }
  };
  return (
    <>
      <h1>Distributors</h1>
      {can('distributors:manage') && <CreateForm button="Add distributor" fields={[['code', 'Code'], ['name', 'Name'], ['contactName', 'Contact person'], ['email', 'Email'], ['phone', 'Phone']]}
        onCreate={async (b) => { await post('/onboarding/distributors', b); list.reload(); return 'Distributor added'; }} />}
      {note && <div className="ok">{note}</div>}
      <div className="card"><Search list={list} />
        <Table rows={list.items} cols={[{ h: 'Code', f: (d) => d.code }, { h: 'Name', f: (d) => d.name }, { h: 'Contact', f: (d) => d.contactName }, { h: 'Email', f: (d) => d.email }, { h: 'Status', f: (d) => <Status v={d.status} /> },
          { h: '', f: (d) => can('distributors:manage') && <button className="ghost" onClick={() => addLogin(d)}>Create login</button> }]} />
      </div>
    </>
  );
}

export function Leads() {
  const { can } = useSession();
  const list = useList('/onboarding/leads');
  const [note, setNote] = useState('');
  const run = async (fn) => { try { setNote(await fn() || ''); list.reload(); } catch (e) { setNote(e.message); } };
  const approve = (l) => run(async () => { const r = await post(`/onboarding/leads/${l.id}/approve`); return `Approved. Dentist login: ${r.login.email}. Temporary password: ${r.login.temporaryPassword} (shown once)`; });
  const reject = (l) => { const reason = window.prompt?.('Reason for rejection') || ''; if (reason) run(async () => { await post(`/onboarding/leads/${l.id}/reject`, { reason }); return 'Rejected'; }); };
  const open = (l) => !['approved', 'rejected'].includes(l.status);
  return (
    <>
      <h1>Dentist and clinic leads</h1>
      {can('leads:create') && <CreateForm button="Add lead" fields={[['dentistName', 'Dentist name'], ['email', 'Email'], ['phone', 'Phone'], ['licenseNo', 'Licence no.'], ['clinicName', 'Clinic name'], ['clinicAddress', 'Clinic address'], ['city', 'City'], ['state', 'State'], ['pincode', 'PIN code']]}
        onCreate={async (b) => { await post('/onboarding/leads', b); list.reload(); return 'Lead added'; }} />}
      {note && <div className="ok">{note}</div>}
      <div className="card"><Search list={list} />
        <Table rows={list.items} cols={[
          { h: 'Dentist', f: (l) => l.dentistName }, { h: 'Clinic', f: (l) => l.clinicName }, { h: 'City', f: (l) => l.city },
          { h: 'Source', f: (l) => l.source }, { h: 'Owner', f: (l) => l.ownerName }, { h: 'Added', f: (l) => fmtDate(l.createdAt) }, { h: 'Status', f: (l) => <Status v={l.status} /> },
          { h: '', f: (l) => (
            <span className="row">
              {open(l) && l.status !== 'submitted' && can('leads:update') && <button className="ghost" onClick={() => run(async () => { await post(`/onboarding/leads/${l.id}/submit`); return 'Submitted for approval'; })}>Submit</button>}
              {l.status === 'submitted' && can('leads:approve') && <button onClick={() => approve(l)}>Approve</button>}
              {open(l) && can('leads:approve') && <button className="danger" onClick={() => reject(l)}>Reject</button>}
            </span>) },
        ]} />
      </div>
    </>
  );
}
