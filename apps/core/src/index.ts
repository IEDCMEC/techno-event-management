import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const getPORT = () => {
  // const port = process.env.PORT 
  const port = "3001";
  if (port) {
    return parseInt(port);
  } else {
    return 3000;
  }
};

const app: Express = express();
const port: any = getPORT();

app.use(cors());
app.use(bodyParser.json());

import { participantsRouter } from './routes/onsite/participants.route';

app.use('/onsite/participant', participantsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Techno Event Server');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
