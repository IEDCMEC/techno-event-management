import { Request, Response, NextFunction } from 'express';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  if (token !== process.env.AUTHORIZATION_SECRET) {
    return res.status(401).send('Unauthorized');
  }

  next();
};
