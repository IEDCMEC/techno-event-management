import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { validateUUID } from './middlewares/validateParams';

const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const port: any = process.env.PORT;

const app: Express = express();

const { auth } = require('express-oauth2-jwt-bearer');

const allowedOrigins = [
  'https://techno-event-management.vercel.app',
  'http://localhost:3000',
  'https://admin.eventsync.iedcmec.in',
];

app.use(cors());

app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});

app.get('/', (req: Request, res: Response) => {
  return res.send('Techno Event Server');
});

app.get('/health', (req: Request, res: Response) => {
  const healthcheck: any = {
    resource: 'Techno Event Server',
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});

app.param('eventId', validateUUID);

import router from './routes';
import clientRouter from './unprotectedRoutes';
import { decodeUserInfo } from './middlewares/auth0';

app.use('/registration', clientRouter);

app.use(jwtCheck);

app.use('/core', decodeUserInfo, router);

app.listen(port, () => {
  //console.log(`Server is running at http://localhost:${port}`);
});

export default app;
