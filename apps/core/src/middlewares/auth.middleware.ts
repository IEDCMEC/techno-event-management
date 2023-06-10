import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
const pg = require('pgdatabase').pg;
const Organization = require('common').Organization;
const Event = require('common').Event;
const User = require('common').User;


const accessTokenSecret = process.env.SECRET_KEY;



// Temporary authorization for testing
const authorize = async (req: Request & typeof User, res: Response, next: NextFunction) => {
  // const organization: typeof Organization = (
  //   await pg.query('SELECT * FROM organization WHERE name = $1', ['FOSS MEC'])
  // ).rows[0];

  // const event: typeof Event = (await pg.query('SELECT * FROM event WHERE name = $1', ['DebUtsav']))
  //   .rows[0];

  // const user: typeof User = (await pg.query('SELECT * FROM "user" WHERE name = $1', ['checkinbot']))
  //   .rows[0];

  // if (!organization || !event || !user) {
  //   res.status(400).json({ error: 'Something went wrong' });
  //   return;
  // }
  // if (organization?.id === undefined || event?.id === undefined || user?.id === undefined) {
  //   res.status(400).json({ error: 'Something went wrong' });
  //   return;
  // }

  // req.body.organizationId = organization.id;
  // req.body.eventId = event.id;
  // req.body.userId = user.id;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, (err:Error, user: typeof User) => {
       if (err) {
         return res.sendStatus(403);
       }
        
       req.user = user;
        next();
     });

  } else {
    res.sendStatus(401);
  }
};

export { authorize };
