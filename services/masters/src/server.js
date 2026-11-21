import { createApp, start } from '@avm/common';
import { clinics, doctors, products, internal } from './routes/index.js';

process.env.SERVICE_NAME = 'masters';
const app = createApp('masters', (a) => {
  a.use('/clinics', clinics);
  a.use('/doctors', doctors);
  a.use('/products', products);
  a.use('/internal', internal);
});
await start('masters', app, parseInt(process.env.PORT || '4002', 10));
