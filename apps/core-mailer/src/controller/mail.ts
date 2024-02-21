import { createTransport } from 'nodemailer';

import { Request, Response } from 'express';

const transporter = createTransport({
  service: 'disroot',
  host: 'disroot.org',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
  requireTLS: true,
});

export const sendMail = async (req: Request, res: Response) => {
  try {
    const { email, subject, text } = req.body;
    if (!email || !subject || !text) {
      return res.status(400).send('Missing required fields');
    }

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

    return res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Email failed to send');
  }
};
