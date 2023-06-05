import { Request, Response, NextFunction } from 'express';

import { pg } from '../../../../packages/pgdatabase/src/pg';
import { Organization, Event, User } from 'domain';

// Temporary authorization for testing
const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const organization: Organization = (
    await pg.query('SELECT * FROM organization WHERE name = $1', ['FOSS MEC'])
  ).rows[0];

  const event: Event = (await pg.query('SELECT * FROM event WHERE name = $1', ['DebUtsav']))
    .rows[0];

  const user: User = (await pg.query('SELECT * FROM "user" WHERE name = $1', ['checkinbot']))
    .rows[0];

  if (!organization || !event || !user) {
    res.status(400).json({ error: 'Something went wrong' });
    return;
  }
  if (organization?.id === undefined || event?.id === undefined || user?.id === undefined) {
    res.status(400).json({ error: 'Something went wrong' });
    return;
  }

  req.body.organizationId = organization.id;
  req.body.eventId = event.id;
  req.body.userId = user.id;

  next();
};

export { authorize };
