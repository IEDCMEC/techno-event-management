import { Request, Response } from 'express';
import { checkInParticipant } from '../services/checkin.service';

const checkInEventParticipant = async (req: Request, res: Response) => {
  try {
    const { organizationId, eventId, userId, participantId } = req.body;
    if (!organizationId || !eventId || !userId) {
      return res.status(400).json({ error: 'Authentication Error' });
    }

    if (!participantId) {
      return res.status(400).json({ error: 'Participant id is required' });
    }

    const checkInSucces = await checkInParticipant(organizationId, eventId, participantId, userId);
    if (!checkInSucces) {
      return res.status(400).json({ error: 'Checkin failed' });
    }
    if (checkInSucces) {
      return res.status(200).json({ message: 'Checkin success' });
    }
  } catch (err) {
    console.log(err);
  }
};

export { checkInEventParticipant };
