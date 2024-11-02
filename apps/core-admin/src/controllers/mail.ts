import { Request, Response } from 'express';

import prisma from '../utils/database';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
// import chalk from 'chalk';
import supabase from '../utils/supabase';
import FormData from 'form-data';

const MAILER_URL = process.env.MAILER_URL;
const MAILER_DATABASE_URL = process.env.MAILER_DATABASE_URL;
const AUTHORIZATION_TOKEN = process.env.AUTHORIZATION_TOKEN;
const sleepAsync = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sendMailWithQR = async (req: Request, res: Response) => {
  try {
    // const { name, to, subject, text, html, qr_code, projectId } = req.body;
    const { subject, html, projectId } = req.body;
    const { orgId, eventId } = req?.params;
    if (!subject || !html || !projectId || !orgId || !eventId) {
      return res.status(400).send({ message: 'Missing required fields' });
    } else {
      if (supabase) {
        const response = await supabase.from('Recipients').select('*').eq('projectId', projectId);
        if (response.status == 200) {
          if (response.data && response.data?.length > 0) {
            const recipients = response.data;
            const numberOfRecipientsToBeMailed = recipients.length;
            let numberOfRecipientsMailed = 0;
            let RecipientsMailed = [];
            let numberOfRecipientsAlreadyMailed = 0;
            let numberOfRecipientsFailed = 0;
            let RecipientsNotMailed = [];

            for (const recipient of recipients) {
              if (recipient.emailSent) {
                numberOfRecipientsAlreadyMailed++;
                console.log(`Project: ${projectId} - Mail already sent to ${recipient.email}`);
              } else {
                console.log(`Project: ${projectId} - Sending mail to ${recipient.email}`);
                await sleepAsync(5);
                const form = new FormData();
                form.append('name', recipient.name);
                form.append('to', recipient.email);
                let emailText: string = html;
                emailText = emailText.replace('{{payload}}', recipient.payload);
                emailText = emailText.replace('{{payload}}', recipient.payload);
                emailText = emailText.replace('{{name}}', recipient.name);
                form.append('html', emailText);
                form.append('subject', subject);
                form.append('text', subject);
                const response = await axios.post(`${MAILER_URL}/mail`, form, {
                  headers: {
                    ...form.getHeaders(),
                    authorization: AUTHORIZATION_TOKEN,
                  },
                });
                console.log(response.data);
                if (response && response.status == 200) {
                  await supabase
                    .from('Recipients')
                    .update({
                      emailSent: true,
                      emailSentAt: new Date().toDateString(),
                      jobId: response.data.jobId,
                    })
                    .eq('id', recipient.id);
                  numberOfRecipientsMailed++;
                  RecipientsMailed.push(recipient.email);
                } else {
                  try {
                    console.log(response.data);
                  } catch (e) {
                    console.log('error', e);
                  }
                  numberOfRecipientsFailed++;
                  RecipientsNotMailed.push(recipient.email);
                }
              }
            }
            res.status(200).json({
              success: RecipientsMailed,
              failure: RecipientsNotMailed,
              nSuccess: RecipientsMailed.length,
              nFailure: RecipientsNotMailed.length,
            });
          } else {
            res.status(400).send({ message: 'Invalid Project ID / project ID not found' });
          }
        } else {
          res.status(400).send({ message: 'Incorrect project ID or invalid supabase credentials' });
        }
      } else {
        res.status(500).send({ message: 'Invalid Supabase Credentials' });
      }
    }
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e });
  }
};

export const getMailStatus = async (req: Request, res: Response) => {
  try {
    const { email } = req?.params;
    if (!email) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
    if (supabase) {
      let response = await supabase.from('Recipients').select('jobId').eq('email', email);
      if (response.data && response.status == 200) {
        const jobId = response.data[0].jobId;
        if (jobId) {
          const emailStatus = await axios.get(`${MAILER_URL}/mail?jobId=${jobId}`, {
            headers: {
              authorization: AUTHORIZATION_TOKEN,
            },
          });
          if (emailStatus && emailStatus.status == 200) {
            console.log({ ...emailStatus.data.status });
            res.send(200).json({
              ...emailStatus.data.status,
            });
          } else {
            res.status(400).send({ message: 'JobId not found', error: emailStatus.data });
          }
        } else {
          res.status(400).send({ message: 'Email Job ID not found, send email again' });
        }
      } else {
        res.status(400).send({ message: 'Email Job not found, send email again' });
      }
    } else {
      res.status(500).send({ message: 'Invalid Supabase Credentials' });
    }
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e });
  }
};

export const newMailProject = async (req: Request, res: Response) => {
  try {
    const { name, desc } = req.body;
    const { orgId } = req?.params;
    if (!name || !desc || !orgId) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
    if (supabase) {
      const response = await supabase.from('Projects').select('name').eq('name', name);
      console.log(response.data);
      if (response && response.status == 200) {
        if (response.data && response.data?.length == 0) {
          const response = await supabase
            .from('Projects')
            .insert({ name: name, description: desc });
          if (response && response.status == 200) {
            const currentProject = await supabase.from('Projects').select('*').eq('name', name);
            res
              .status(200)
              .send({ message: 'Successfully created project', ...currentProject.data });
          }
        } else {
          const currentProject = await supabase.from('Projects').select('*').eq('name', name);
          res.status(200).send({ message: 'Project Already Exists', ...currentProject.data });
        }
      } else {
        res.status(400).send({ message: 'Error', data: response.data });
      }
    } else {
      res.status(500).send({ message: 'Invalid Supabase Credentials' });
    }
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e });
  }
};

export const getMailProjects = async (req: Request, res: Response) => {
  try {
    const { orgId } = req?.params;
    if (orgId) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
    if (supabase) {
      const response = await supabase.from('Projects').select('*').eq('orgId', orgId);
      if (response && response.status == 200) {
        res.status(200).json({
          data: response.data,
        });
      } else {
        res.status(400).send({ message: 'No Emailing tasks found for this organization' });
      }
    } else {
      res.status(500).send({ message: 'Invalid Supabase Credentials' });
    }
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e });
  }
};

export const addNewRecipient = async (req: Request, res: Response) => {
  const { projectId, name, email, payload } = req.body;
  if (!projectId || !name || !email || !payload) {
    return res.status(400).send({ message: 'Missing required fields' });
  }
  if (supabase) {
    const recipientExists = await supabase
      .from('Recipients')
      .select('*')
      .eq('projectId', projectId)
      .eq('email', email);
    if (recipientExists && recipientExists.status == 200) {
      if (recipientExists.data && recipientExists.data?.length > 0) {
        res.status(200).json({ message: 'User already exists, add another user' });
      } else {
        const response = await supabase
          .from('Recipients')
          .insert({ name: name, email: email, payload: payload, projectId: projectId });
        console.log('Insert:', response.data);
        if (response && response.status == 200) {
          res.status(200).json({ message: 'User successfully Added' });
        } else {
          res.status(400).send({ message: 'User Not added', ...response.error });
        }
      }
    } else {
      res.status(400).send({ message: 'Supabase Error' });
    }
  } else {
    res.status(500).send({ message: 'Invalid Supabase Credentials' });
  }
  try {
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e });
  }
};
