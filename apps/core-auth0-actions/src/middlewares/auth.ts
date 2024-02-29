import { Request, Response, NextFunction } from 'express';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({
      message: 'No authorization header provided',
    });
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      message: 'No token provided',
    });
  }

  if (token !== process.env.AUTHORIZATION_SECRET) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  next();
};
