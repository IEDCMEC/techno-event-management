import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const port: any = process.env.PORT;

const app: Express = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(bodyParser.json());

import { router } from './routes/routes';
import { organizationRouter } from './routes/organization.route';
import { userRouter } from './routes/user.route';
import { authrouter } from './routes/auth.route';

app.use('/', organizationRouter);
app.use('/', userRouter);

import { authorize } from './middlewares/auth.middleware';

app.use('/core', authorize, router);

app.get('/', (req: Request, res: Response) => {
  res.send('Techno Event Server');
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

app.use('/auth', authrouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
