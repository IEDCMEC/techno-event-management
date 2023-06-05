import express, { Router, Request, Response } from 'express';
import { authorize } from '../../middlewares/auth.middleware';
import {
  getAllEventParticipants,
  getEventParticipantById,
  getEventParticipantByInviteId,
} from '../../controllers/participants.controller';
import { Participant } from 'domain';

const router: Router = express.Router();

// Get all participants
router.get('/', authorize, async (req: Request, res: Response) => {
  const participants: Participant[] = await getAllEventParticipants(req, res);
  res.json(participants);
});

// Checkin a participant
router.post('/checkin', authorize, async (req: Request, res: Response) => {
  res.json({ message: 'checked in' });
});

// Get participant by invite id
router.get('/invite/:inviteId', authorize, async (req: Request, res: Response) => {
  const participant: Participant = await getEventParticipantByInviteId(req, res);
  res.json(participant);
});

// Get participant by id
router.get('/:id', authorize, async (req: Request, res: Response) => {
  const participant: Participant = await getEventParticipantById(req, res);
  res.json(participant);
});

export { router as participantsRouter };
