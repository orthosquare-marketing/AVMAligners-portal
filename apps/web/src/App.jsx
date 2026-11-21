import React, { createContext, useContext, useEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { get, post, refresh, setSignOutHandler, setTokens, hasRefresh } from './api.js';
import { Login, ChangePassword } from './pages/Auth.jsx';
import { Users, Roles, Audit } from './pages/Identity.jsx';
import { Clinics, Doctors, Products } from './pages/Masters.jsx';
import { Distributors, Leads } from './pages/Onboarding.jsx';

const Ctx = createContext(null);
export const useSession = () => useContext(Ctx);

// Menu items are shown only if the signed-in user holds the permission.
// This is for convenience only: the API enforces access on every request.
const NAV = [
  ['/leads', 'Leads', 'leads:read'],
  ['/distributors', 'Distributors', 'distributors:read'],
  ['/clinics', 'Clinics', 'clinics:read'],
  ['/doctors', 'Doctors', 'doctors:read'],
  ['/products', 'Products', 'products:read'],
  ['/users', 'Users', 'users:read'],
  ['/roles', 'Roles', 'roles:read'],
  ['/audit', 'Audit log', 'audit:read'],
];

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = loading, null = signed out
  const nav = useNavigate();
  const can = (p) => !!session && (session.permissions.includes('*') || session.permissions.includes(p));

  const signIn = (data) => { setTokens(data); setSession({ user: data.user, permissions: data.permissions, level: data.level }); };
  const signOut = async () => {
    const rt = sessionStorage.getItem('rt');
    if (rt) post('/identity/auth/logout', { refreshToken: rt }).catch(() => {});
    setTokens(null); setSession(null); nav('/login');
  };

  useEffect(() => {
    setSignOutHandler(() => { setTokens(null); setSession(null); });
    (async () => {
      if (!hasRefresh()) return setSession(null);
      const data = await refresh();
      if (data) setSession({ user: data.user, permissions: data.permissions, level: data.level }); else setSession(null);
    })();
  }, []);

  if (session === undefined) return <div className="main muted">Loading…</div>;
  if (!session) return <Routes><Route path="*" element={<Login onSignIn={signIn} />} /></Routes>;
  if (session.user.mustChangePassword) return <ChangePassword first onDone={signIn} />;

  const items = NAV.filter(([, , p]) => can(p));
  return (
    <Ctx.Provider value={{ ...session, can, signOut, get }}>
      <div className="shell">
        <aside className="side">
          <div className="brand">AVM Aligners Portal</div>
          {items.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
          <div className="who">
            <div><b>{session.user.name}</b></div>
            <div>{session.user.role.replace(/_/g, ' ')}</div>
            <p><NavLink to="/password">Change password</NavLink></p>
            <button className="ghost" onClick={signOut}>Sign out</button>
          </div>
        </aside>
        <main className="main">
          <Routes>
            <Route path="/leads" element={<Leads />} />
            <Route path="/distributors" element={<Distributors />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/password" element={<ChangePassword onDone={signIn} />} />
            <Route path="*" element={<Navigate to={items[0]?.[0] || '/password'} replace />} />
          </Routes>
        </main>
      </div>
    </Ctx.Provider>
  );
}
