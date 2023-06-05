import express, { Router, Request, Response } from 'express';
import { authorize } from '../../middlewares/auth.middleware';
import { checkInEventParticipant } from '../../controllers/checkin.controller';

const router: Router = express.Router();

// Get all participants
router.post('/', authorize, async (req: Request, res: Response) => {
    await checkInEventParticipant(req, res);
});


export { router as checkInRouter };
