import { createApp } from '@avm/common';
import auth from './routes/auth.js';
import users from './routes/users.js';
import { roles, auditRoutes } from './routes/roles.js';
import internal from './routes/internal.js';

export function buildApp() {
  return createApp('identity', (app) => {
    app.use('/auth', auth);
    app.use('/users', users);
    app.use('/roles', roles);
    app.use('/audit', auditRoutes);
    app.use('/internal', internal);
  });
}
