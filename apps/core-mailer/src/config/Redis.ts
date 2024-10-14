import Redis from 'ioredis';

// Right now the entries do not have a TTL, so they will remain in Redis indefinitely.
// This is not a problem for this application, but it is something to keep in mind.
// Ideally, we would want to set a TTL for each entry, so that they are automatically removed after a certain amount of time.
// The application sending the email job should check whether the email has been sent or failed and update in its database.

export const createRedisClient = (): Redis => {
  return new Redis(process.env.REDIS_URL as string, {
    maxRetriesPerRequest: null,
    keyPrefix: 'core-mailer:',
  });
};
