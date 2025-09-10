import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth/auth';
import { config } from './config/index';
import { requestLogger } from './logging/middleware';
import { db } from './db/config';
import { sql } from 'drizzle-orm';
import { errorHandler } from './middleware/error-handler';
import cursoRouter from './modules/curso/curso-routes';
import departamentoRouter from './modules/departamento/departamento-router';

const app = express();

// Health checks
app.get('/health/livez', (req, res) => res.json({ status: 'ok' }));
app.get('/health/readyz', async (req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.json({ status: 'ok' });
  } catch {
    res.status(503).json({ status: 'unhealthy' });
  }
});

app.use(
  cors({
    origin: config.clientUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

app.use(requestLogger);

// Better auth handler
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use('/api', cursoRouter);
app.use('/api', departamentoRouter);

// Global error handler
app.use(errorHandler);

export { app };
