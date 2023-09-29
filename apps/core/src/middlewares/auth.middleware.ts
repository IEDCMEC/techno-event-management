import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
const pg = require('pgdatabase').pg;
const Organization = require('common').Organization;
const Event = require('common').Event;
const User = require('common').User;

const accessTokenSecret = process.env.SECRET_KEY;

// Temporary authorization for testing
const authorize = async (req: Request & typeof User, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, (err: Error, user: typeof User) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired' });
        }
        return res.sendStatus(403);
      }

      req.body.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { authorize };
