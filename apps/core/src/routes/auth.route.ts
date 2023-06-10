import express, { Router, Request, Response } from 'express'; 
import { checkInEventParticipant } from '../controllers/checkin.controller';

const router: Router = express.Router();

// Get all participants
router.post('/signup',  async (req: Request, res: Response) => {
  await checkInEventParticipant(req, res);
});

export { router as checkInRouter };
