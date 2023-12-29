import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');
const { pg } = require('pgdatabase');
const { User } = require('common');

const accessTokenSecret = process.env.SECRET_KEY;

// Temporary authorization for testing
const authorize = async (req: Request & typeof User, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, async (err: Error, user: typeof User) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired' });
        }
        return res.sendStatus(403);
      }

      // Todo: Remove names of events and organizations after testing
      const assets = (
        await pg.query(
          ` SELECT 
              organization.id as "organizationId",
              organization.name as "organizationName",
              role_id as "roleId",
              event.id as "eventId",
              event.name as "eventName"
            FROM organization
              JOIN organization_user 
                ON organization.id = organization_user.organization_id 
              JOIN event
                ON organization.id = event.organization_id
            WHERE organization_user.user_id = $1`,
          [user.id],
        )
      )?.rows;

      req.body.user = user;
      req.body.user.assets = assets;

      next();
    });
  } else {
    res.sendStatus(403);
  }
};

export { authorize };
