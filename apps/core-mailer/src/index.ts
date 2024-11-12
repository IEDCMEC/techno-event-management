import dotenv from 'dotenv';
import { UUID } from 'node:crypto';

import express, { Express, Request, Response } from 'express';

import { fetchEmailJobStatus, sendEmailController } from './controllers/MailController';
import { MailService } from './services/MailService';
import { authorize } from './middlewares/auth';
import formidable from 'formidable';

// const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const port = process.env.PORT || 80;

const app: Express = express();

app.use(cors({ origin: '*' }));

// app.use(bodyParser.json());

app.get('/health', (req: Request, res: Response) => {
  const healthcheck: any = {
    resource: 'Core Mailer',
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    return res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    return res.status(503).send();
  }
});

// Add email to queue
app.post('/mail', authorize, async (req: Request, res: Response) => {
  try {
    // const { name, to, subject, text, html } = req.body;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).send({ message: 'Error parsing form data' });
      }

      // Process fields and files as needed
      const { name, to, subject, text, html } = fields;
      console.log(name, to, subject, text, html);
      if (!name || !to || !subject || !text || !html) {
        return res.status(400).send({ message: 'Missing required fields' });
      }

      const jobId: UUID = await sendEmailController(name, to, subject, text, html);

      return res.status(200).send({
        jobId: jobId,
      });
    });
    // if (!name || !to || !subject || !text || !html) {
    //   console.log(req.body);

    //   return res.status(400).send({ message: 'Missing required fields' });
    // }

    // const jobId: UUID = await sendEmailController(name, to, subject, text, html);

    // return res.status(200).send({
    //   jobId: jobId,
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Fetch email status
app.get('/mail', authorize, async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;

    if (!jobId) return res.status(400).send({ message: 'Missing required fields' });

    const status = await fetchEmailJobStatus(jobId as UUID);

    return res.status(200).send({
      status: status,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Core Mailer is running on ${port}`);
});

// Check queue for new emails and send them
async function startMailSub() {
  try {
    const rmqInstance: MailService = new MailService();
    await rmqInstance.initialize();
    await rmqInstance.subscribe();
    console.log('Subscribed to RabbitMQ email queue');
  } catch (error) {
    console.error('Failed to subscribe to RabbitMQ email queue: ', error);
  }
}

startMailSub();
