import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import { errorHandler, notFoundHandler } from './errors.js';

export function createApp(name, mount) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(cors({ origin: (process.env.CORS_ORIGIN || '').split(',').filter(Boolean), credentials: false }));
  app.use(express.json({ limit: '1mb' }));
  app.get('/health', (req, res) => res.json({ service: name, status: 'ok', db: mongoose.connection.readyState === 1 ? 'up' : 'down' }));
  mount(app);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

export async function connectDb(uri = process.env.MONGO_URL) {
  if (!uri) throw new Error('MONGO_URL is not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  return mongoose.connection;
}

export async function start(name, app, port) {
  await connectDb();
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`[${name}] listening on ${port}`);
      resolve(server);
    });
  });
}

export const validate = (schema, part = 'body') => (req, res, next) => {
  const r = schema.safeParse(req[part]);
  if (!r.success) return next(r.error);
  req[part] = r.data;
  next();
};

export function paging(req) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 25));
  return { page, limit, skip: (page - 1) * limit };
}

export const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
