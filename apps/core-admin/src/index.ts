import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { validateUUID } from './middlewares/validateParams';

const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const port: any = process.env.PORT;

const app: Express = express();

const { auth } = require('express-oauth2-jwt-bearer');

app.use(
  cors({
    origin: '*',
  }),
);

app.use(bodyParser.json());

const jwtCheck = auth({
  audience: 'https://core.techno.iedcmec.in/api',
  issuerBaseURL: 'https://dev-techno.jp.auth0.com',
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
app.use(jwtCheck);

import router from './routes';
import { decodeUserInfo } from './middlewares/auth0';

app.use('/core', decodeUserInfo, router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
