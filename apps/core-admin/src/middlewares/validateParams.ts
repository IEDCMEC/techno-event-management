import { Request, Response, NextFunction } from 'express';

const regex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;

export function validateUUID(req: Request, res: Response, next: NextFunction, eventId: string) {
  if (!regex.test(eventId)) {
    console.error('Invalid eventId: must be a valid UUID');
    return res.status(400).send('Invalid eventId: must be a valid UUID');
  }

  next();
}
