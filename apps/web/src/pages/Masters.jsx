import React from 'react';
import { post } from '../api.js';
import { useSession } from '../App.jsx';
import { CreateForm, Search, Status, Table, useList } from './kit.jsx';

export function Clinics() {
  const { can } = useSession();
  const list = useList('/masters/clinics');
  return (
    <>
      <h1>Clinics</h1>
      {can('clinics:create') && <CreateForm button="Add clinic" fields={[['name', 'Clinic name'], ['city', 'City'], ['state', 'State'], ['type', 'Type', [{ value: 'avmsmiles', label: 'AVMSmiles' }, { value: 'external', label: 'External' }]], ['labShortName', 'Lab short name']]}
        onCreate={async (b) => { await post('/masters/clinics', b); list.reload(); return 'Clinic added'; }} />}
      <div className="card"><Search list={list} />
        <Table rows={list.items} cols={[{ h: 'Clinic', f: (c) => c.name }, { h: 'City', f: (c) => c.city }, { h: 'State', f: (c) => c.state }, { h: 'Type', f: (c) => (c.type === 'avmsmiles' ? 'AVMSmiles' : 'External') }, { h: 'Short name', f: (c) => c.labShortName }, { h: 'Status', f: (c) => <Status v={c.status} /> }]} />
      </div>
    </>
  );
}

export function Doctors() {
  const { can } = useSession();
  const list = useList('/masters/doctors');
  return (
    <>
      <h1>Doctors</h1>
      {can('doctors:create') && <CreateForm button="Add doctor" fields={[['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['licenseNo', 'Licence no.']]}
        onCreate={async (b) => { await post('/masters/doctors', b); list.reload(); return 'Doctor added'; }} />}
      <div className="card"><Search list={list} />
        <Table rows={list.items} cols={[{ h: 'Doctor', f: (d) => d.name }, { h: 'Email', f: (d) => d.email }, { h: 'Phone', f: (d) => d.phone }, { h: 'Licence no.', f: (d) => d.licenseNo }, { h: 'Clinics', f: (d) => d.clinicIds?.length || 0 }, { h: 'Login', f: (d) => (d.userId ? 'Yes' : 'No') }, { h: 'Status', f: (d) => <Status v={d.status} /> }]} />
      </div>
    </>
  );
}

export function Products() {
  const { can } = useSession();
  const list = useList('/masters/products');
  return (
    <>
      <h1>Products</h1>
      {can('products:manage') && <CreateForm button="Add product" fields={[['code', 'Code'], ['name', 'Name'], ['description', 'Description']]}
        onCreate={async (b) => { await post('/masters/products', b); list.reload(); return 'Product added'; }} />}
      <div className="card"><Search list={list} />
        <Table rows={list.items} cols={[{ h: 'Code', f: (p) => p.code }, { h: 'Name', f: (p) => p.name }, { h: 'Description', f: (p) => p.description }, { h: 'Active', f: (p) => (p.active ? 'Yes' : 'No') }]} />
      </div>
    </>
  );
}
