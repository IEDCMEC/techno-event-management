import express, { Router, Request, Response } from 'express';
import { authorize } from '../../middlewares/auth.middleware';
import {
  getAllEventParticipants,
  getEventParticipantById,
  getEventParticipantByInviteId,
} from '../../controllers/participants.controller';

const router: Router = express.Router();

// Get all participants
router.get('/', authorize, async (req: Request, res: Response) => {
  await getAllEventParticipants(req, res);
});

// Get participant by invite id
router.get('/invite/:inviteId', authorize, async (req: Request, res: Response) => {
  await getEventParticipantByInviteId(req, res);
});

// Get participant by id
router.get('/:id', authorize, async (req: Request, res: Response) => {
  await getEventParticipantById(req, res);
});

export { router as participantsRouter };
