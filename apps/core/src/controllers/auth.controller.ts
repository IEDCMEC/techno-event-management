import { Request, Response } from 'express';

const signup = async (req: Request, res: Response) => {
  try {
    const { organizationId, eventId } = req.body;
    if (!organizationId || !eventId) {
      return res.status(400).json({ error: 'Authentication Error' });
    }
    return res.json({ message: 'success' });
  } catch (err) {
    console.log(err);
  }
}