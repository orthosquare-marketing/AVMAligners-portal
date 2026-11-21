import { start } from '@avm/common';
import { buildApp } from './app.js';
import { seed } from './seed.js';

process.env.SERVICE_NAME = 'identity';
const port = parseInt(process.env.PORT || '4001', 10);
await start('identity', buildApp(), port);
await seed();
