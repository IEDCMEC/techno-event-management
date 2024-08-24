import { NextFunction, Request, Response } from 'express';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

    if (!ACCESS_TOKEN) {
      console.error('Access token not found on the server');
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    if (token !== ACCESS_TOKEN) return res.status(403).json({ message: 'Unauthorized' });

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
