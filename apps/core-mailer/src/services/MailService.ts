import { UUID } from 'node:crypto';

import { connect } from 'amqplib';
import Redis from 'ioredis';

import { createTransport } from '../config/NodeMailer';
import { createRedisClient } from '../config/Redis';

import { Mail, parseMail } from '../models/Mail';

export class MailService {
  private connection: any;
  private channel: any;
  private readonly queueName: string;

  private redis: Redis;
  private transporter;

  constructor() {
    this.queueName = 'core-mailer';
    this.redis = createRedisClient();
    this.transporter = createTransport();
  }

  async initialize() {
    this.connection = await connect(process.env.RABBITMQ_URL as string);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName, {
      durable: false,
    });
  }

  async publish(mail: Mail) {
    try {
      await this.redis.set(
        mail.jobId,
        JSON.stringify({
          status: 'PENDING',
          timestamp: Date.now(),
        }),
      );

      this.channel.sendToQueue(this.queueName, Buffer.from(mail.toString()));
    } catch (error) {
      this.redis.set(
        mail.jobId,
        JSON.stringify({
          status: 'FAILED',
          timestamp: Date.now(),
        }),
      );
      console.error('Failed to push email to queue:', error);
    }
  }

  async subscribe() {
    try {
      await this.channel.consume(
        this.queueName,
        (msg: any) => {
          if (msg !== null) {
            const mail: Mail = parseMail(msg.content.toString());

            this.transporter.sendMail(
              {
                from: {
                  name: mail.name,
                  address: mail.from,
                },
                to: mail.to,
                subject: mail.subject,
                text: mail.text,
                html: mail.html,
              },
              (error, info) => {
                if (error) {
                  this.redis.set(
                    mail.jobId,
                    JSON.stringify({
                      status: 'FAILED',
                      timestamp: Date.now(),
                    }),
                  );
                  console.error('Failed to send email:', error);
                } else {
                  this.redis.set(
                    mail.jobId,
                    JSON.stringify({
                      status: 'SENT',
                      timestamp: Date.now(),
                    }),
                  );
                }
              },
            );
            this.channel.ack(msg);
          }
        },
        {
          noAck: false,
        },
      );
    } catch (error) {
      console.error('Failed to subscribe to RabbitMQ email queue:', error);
    }
  }

  async fetchJobStatus(jobId: UUID) {
    try {
      const status = await this.redis.get(jobId);
      return JSON.parse(status as string);
    } catch (error) {
      console.error('Failed to fetch job status:', error);
    }
  }
}
