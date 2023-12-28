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

      const organizations = (
        await pg.query(
          'SELECT * FROM ORGANIZATION JOIN ORGANIZATION_USER ON ORGANIZATION.ID = ORGANIZATION_USER.ORGANIZATION_ID WHERE ORGANIZATION_USER.USER_ID = $1',
          [user.id],
        )
      )?.rows;

      req.body.user = user;
      req.body.organizations = organizations.rows;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { authorize };
