import { UUID } from 'node:crypto';

import { Mail } from '../models/Mail';
import { MailService } from '../services/MailService';

// Add email to the queue. This will be picked up by the worker and sent.
export const sendEmailController: any = async (
  name: string,
  to: string,
  subject: string,
  text: string,
  html: string,
) => {
  try {
    const mail: Mail = new Mail(process.env.EMAIL_ID as string, name, to, subject, text, html);

    const mailService: MailService = new MailService();
    await mailService.initialize();

    await mailService.publish(mail);

    return mail.jobId;
  } catch (error) {
    console.error(error);
  }
};

// Check the status of an email job.
export const fetchEmailJobStatus: any = async (jobId: UUID) => {
  try {
    const mailService: MailService = new MailService();
    await mailService.initialize();

    return await mailService.fetchJobStatus(jobId);
  } catch (error) {
    console.error(error);
  }
};
