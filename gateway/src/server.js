// API gateway: the one public door. It routes /api/<module>/... to that module's service.
// It does not decide access; every service checks the token and permissions itself.
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';

const routes = {
  identity: process.env.IDENTITY_URL || 'http://localhost:4001',
  masters: process.env.MASTERS_URL || 'http://localhost:4002',
  onboarding: process.env.ONBOARDING_URL || 'http://localhost:4003',
};

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',') }));
app.use(rateLimit({ windowMs: 60 * 1000, limit: parseInt(process.env.RATE_LIMIT_PER_MIN || '600', 10), standardHeaders: true, legacyHeaders: false }));

app.get('/health', async (req, res) => {
  const services = {};
  await Promise.all(Object.entries(routes).map(async ([name, url]) => {
    try { services[name] = (await (await fetch(`${url}/health`, { signal: AbortSignal.timeout(3000) })).json()).status; } catch { services[name] = 'down'; }
  }));
  res.json({ gateway: 'ok', services });
});

// Service-to-service routes are never reachable from outside.
app.use((req, res, next) => (/^\/api\/[^/]+\/internal(\/|$)/i.test(req.path) ? res.status(404).json({ error: 'Not found' }) : next()));

for (const [name, target] of Object.entries(routes)) {
  app.use(`/api/${name}`, createProxyMiddleware({ target, changeOrigin: true, xfwd: true, on: { error: (err, req, res) => res.status?.(502).json({ error: `${name} service is unavailable` }) } }));
}
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const port = parseInt(process.env.PORT || '4000', 10);
app.listen(port, () => console.log(`[gateway] listening on ${port}`));
