import { Request, Response } from 'express';
import { checkInParticipant } from '../services/checkin.service';

const checkInEventParticipant = async (req: Request, res: Response) => {
  try {
    const { organizationId, eventId, userId, participantId } = req.body;
    if (!organizationId || !eventId || !userId) {
      res.status(400).json({ error: 'Authentication Error' });
      return;
    }

    if (!participantId) {
      res.status(400).json({ error: 'Participant id is required' });
      return;
    }

    const checkInSucces = await checkInParticipant(organizationId, eventId, participantId, userId);
    if (!checkInSucces) {
      res.status(400).json({  error: 'Checkin failed' });
      return;
    }
    if (checkInSucces) {
      res.status(200).json({ message: 'Checkin success' });
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

export { checkInEventParticipant };
