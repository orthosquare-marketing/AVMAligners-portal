import { createApp, start } from '@avm/common';
import { distributors, leads } from './routes/index.js';

process.env.SERVICE_NAME = 'onboarding';
const app = createApp('onboarding', (a) => {
  a.use('/distributors', distributors);
  a.use('/leads', leads);
});
await start('onboarding', app, parseInt(process.env.PORT || '4003', 10));
