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
console.log(AUTHORIZATION_TOKEN);
export const sendMailWithQR = async (req: Request, res: Response) => {
  try {
    const { subject, html, projectId } = req.body;
    const { orgId, eventId } = req?.params;

    if (!subject || !html || !projectId || !orgId || !eventId) {
      return res.status(400).send({ message: 'Missing required fields' });
    } else {
      // Get recipients from the database using Prisma
      const recipients = await prisma.Recipients.findMany({
        where: {
          projectId: projectId,
        },
      });
      if (recipients.length > 0) {
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
            await sleepAsync(5); // Assuming you have this function defined for waiting

            const form = new FormData();
            form.append('name', recipient.name);
            form.append('to', recipient.email);
            let emailText: string = html;
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
              // Update the recipient's record in Prisma
              await prisma.Recipients.update({
                where: {
                  id: recipient.id,
                },
                data: {
                  emailSent: true,
                  emailSentAt: new Date(),
                  jobId: response.data.jobId,
                },
              });

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

        return res.status(200).json({
          success: RecipientsMailed,
          failure: RecipientsNotMailed,
          nSuccess: RecipientsMailed.length,
          nFailure: RecipientsNotMailed.length,
        });
      } else {
        return res.status(400).send({ message: 'Invalid Project ID / project ID not found' });
      }
    }
  } catch (e: any) {
    console.error(e);
    return res.status(400).send({ message: e.message || 'Something went wrong' });
  }
};

// Sleep function to add delay
function sleepAsync(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getMailStatus = async (req: Request, res: Response) => {
  try {
    const { email } = req?.params;
    if (!email) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    // Fetch the jobId associated with the email from the Recipients table
    const recipient = await prisma.Recipients.findUnique({
      where: { email: email },
      select: { jobId: true },
    });

    if (recipient) {
      const jobId = recipient.jobId;

      if (jobId) {
        // Call external mail service to get the status of the email job
        const emailStatus = await axios.get(`${MAILER_URL}/mail?jobId=${jobId}`, {
          headers: {
            authorization: AUTHORIZATION_TOKEN,
          },
        });

        if (emailStatus && emailStatus.status === 200) {
          console.log({ ...emailStatus.data.status });
          return res.status(200).json({
            ...emailStatus.data.status,
          });
        } else {
          return res.status(400).send({ message: 'JobId not found', error: emailStatus.data });
        }
      } else {
        return res.status(400).send({ message: 'Email Job ID not found, send email again' });
      }
    } else {
      return res.status(400).send({ message: 'Email Job not found, send email again' });
    }
  } catch (e: any) {
    console.error(e);
    return res.status(400).send({ message: e.message || 'Something went wrong' });
  }
};

export const newMailProject = async (req: Request, res: Response) => {
  try {
    const { name, desc } = req.body;
    const { orgId } = req?.params;
    if (!name || !desc || !orgId) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
    console.log(name, desc, orgId);
    // if (supabase) {
    // const response = await supabase.from('Projects').select('name').eq('name', name);
    const response = await prisma.Projects.findMany({
      where: {
        name: name,
      },
      select: {
        name: true,
      },
    });
    // console.log(response);
    if (response) {
      if (response && response?.length == 0) {
        // const response = await supabase
        //   .from('Projects')
        //   .insert({ name: name, description: desc });
        const response = await prisma.Projects.create({
          data: {
            name: name,
            description: desc,
            orgId: orgId,
          },
        });
        // console.log(response)
        if (response) {
          // const currentProject = await supabase.from('Projects').select('*').eq('name', name);
          const currentProject = await prisma.Projects.findFirst({
            where: {
              name: name,
            },
          });

          res.status(200).send({ message: 'Successfully created project', ...currentProject.data });
        }
      } else {
        const currentProject = await prisma.Projects.findMany({
          where: {
            name: name,
          },
        });
        return res.status(200).send({ message: 'Project Already Exists', ...currentProject[0] });
      }
    } else {
      return res.status(400).send({ message: 'Error', data: response });
    }
    // } else {
    // return res.status(500).send({ message: 'Invalid Supabase Credentials' });
    // }
  } catch (e: any) {
    console.error(e);
    return res.status(400).send({ message: e });
  }
};

export const getMailProjects = async (req: Request, res: Response) => {
  try {
    const { orgId } = req?.params;
    // console.log(orgId)
    if (!orgId) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
    // if (supabase) {
    // const response = await supabase.from('Projects').select('*').eq('orgId', orgId);
    const response = await prisma.Projects.findMany({
      where: {
        orgId: orgId,
      },
    });

    if (response) {
      return res.status(200).json({
        data: response,
      });
    } else {
      return res.status(400).send({ message: 'No Emailing tasks found for this organization' });
    }
    // } else {
    //   return res.status(500).send({ message: 'Invalid Supabase Credentials' });
    // }
  } catch (e: any) {
    console.error(e);
    return res.status(400).send({ message: e });
  }
};

export const addNewRecipient = async (req: Request, res: Response) => {
  try {
    const { projectId, name, email, payload } = req.body;

    // Validate required fields
    if (!projectId || !name || !email || !payload) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    // Check if the recipient already exists in the database
    const recipientExists = await prisma.Recipients.findFirst({
      where: {
        projectId: projectId,
        email: email,
      },
    });

    if (recipientExists) {
      return res.status(200).json({ message: 'User already exists, add another user' });
    } else {
      // Insert new Recipients if they don't exist
      const response = await prisma.Recipients.create({
        data: {
          name: name,
          email: email,
          payload: payload,
          projectId: projectId,
        },
      });

      // console.log('Insert:', response);
      return res.status(200).json({ message: 'User successfully Added' });
    }
  } catch (e: any) {
    console.error(e);
    return res.status(400).send({ message: e.message || 'Something went wrong' });
  }
};
const generateOTP = () => {
  // Generates a 6-digit random number
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email, name, html } = req.body;
    console.log(req.body);

    // Check for required fields
    if (!email || !name || !html) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    // Check if the OTP already exists for the email
    const otpRecord = await prisma.Otp.findFirst({
      where: {
        email: email,
      },
    });
    console.log(otpRecord);
    if (otpRecord) {
      // OTP already exists, update the OTP code
      const otp = generateOTP();
      const otpUpdateResponse = await prisma.Otp.update({
        where: { email: email },
        data: { code: otp },
      });
      // console.log(otpUpdateResponse)
      if (otpUpdateResponse) {
        // Send OTP email
        console.log(AUTHORIZATION_TOKEN);
        const form = new FormData();
        form.append('name', name);
        form.append('to', email);
        form.append('subject', 'Confirm your OTP');
        let emailText: string = html;
        emailText = emailText.replace('((otp))', otp.toString());
        form.append('html', emailText);
        form.append('text', 'Confirm your OTP');
        console.log(`${MAILER_URL}/mail`);
        const response = await axios.post(`${MAILER_URL}/mail`, form, {
          headers: {
            ...form.getHeaders(),
            authorization: AUTHORIZATION_TOKEN,
          },
        });

        console.log(response.data);
        console.log(response);
        if (response.status === 200) {
          return res.status(200).json({
            message: 'OTP successfully sent',
          });
        } else {
          return res.status(400).json({
            message: 'Failed: OTP email not sent',
          });
        }
      } else {
        return res.status(400).send({
          message: 'OTP update failed',
          error: otpUpdateResponse,
        });
      }
    } else {
      // OTP doesn't exist, create a new one
      const otp = generateOTP();
      const newOtpResponse = await prisma.Otp.create({
        data: {
          code: otp,
          email: email,
        },
      });

      if (newOtpResponse) {
        // Send OTP email
        const form = new FormData();
        form.append('name', name);
        form.append('to', email);
        form.append('subject', 'Confirm your OTP');
        let emailText: string = html;
        emailText = emailText.replace('((otp))', otp.toString());
        form.append('html', emailText);
        form.append('text', 'Confirm your OTP');

        const response = await axios.post(`${MAILER_URL}/mail`, form, {
          headers: {
            ...form.getHeaders(),
            authorization: AUTHORIZATION_TOKEN,
          },
        });

        console.log(response.data);

        if (response.status === 200) {
          return res.status(200).json({
            message: 'OTP successfully sent',
          });
        } else {
          return res.status(400).json({
            message: 'Failed: OTP email not sent',
          });
        }
      } else {
        return res.status(400).send({
          message: 'OTP not sent',
          error: newOtpResponse,
        });
      }
    }
  } catch (e: any) {
    console.error(e);
    return res.status(400).send({ message: e.message || 'Something went wrong' });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
    console.log(email, otp);
    // Fetch OTP record for the provided email
    const otpRecord = await prisma.Otp.findFirst({
      where: {
        email: email,
      },
    });

    if (otpRecord) {
      console.log(otpRecord);
      // Check if the provided OTP matches the stored one
      if (otpRecord.code.toString() === otp.toString()) {
        return res.status(200).json({
          verified: true,
        });
      } else {
        return res.status(200).json({
          verified: false,
        });
      }
    } else {
      return res.status(400).send({ message: 'Email OTP not found' });
    }
  } catch (e: any) {
    console.error(e);
    return res.status(400).send({ message: e.message || 'Something went wrong' });
  }
};
