import express, {Router, Request, Response} from 'express';
import {authorize} from '../../middlewares/auth.middleware';
import {getAllParticipants, getParticipantById} from '../../controllers/participants.controller';

const router: Router = express.Router();

// Get all participants
router.get('/', authorize, async (req: Request, res: Response) => {
    const {organizationId, eventId} = req.body;
    const participants: any = await getAllParticipants(organizationId, eventId);
    res.json(participants);
});

// Checkin a participant
router.post('/checkin', authorize, async (req: Request, res: Response) => {
    res.json({message: 'checked in'});
});

// Get participant by id
router.get('/:id', authorize, async (req: Request, res: Response) => {
    const participantId = req.params.id;
    const {organizationId, eventId} = req.body;

    if (!participantId) res.status(400).json({error: 'Participant id is required'});

    const participant: any = await getParticipantById(organizationId, eventId, participantId);
    res.json(participant);
});

export {router as participantsRouter};
