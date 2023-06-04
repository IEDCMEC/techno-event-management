import express, { Router, Request, Response } from 'express';
import { getAllParticipants, getParticipantById } from '../../controllers/participants.controller';

const router: Router = express.Router();

// Get all participants
router.get('/', async (req: Request, res: Response) => {
  const participants: any = await getAllParticipants();
  res.json(participants);
});

// Checkin a participant
router.post('/checkin', async (req: Request, res: Response) => {
  res.json({ message: 'checked in' });
});

// Get participant by id
router.get('/:id', async (req: Request, res: Response) => {
  const participantId = req.params.id;
  if (!participantId) res.status(400).json({ error: 'Participant id is required' });

  const participant: any = await getParticipantById(participantId);
  res.json(participant);
});

export { router as participantsRouter };
