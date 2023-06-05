import { Request, Response } from 'express';
import Participant from 'domain/src/models/Participant';

import {
  getParticipantById,
  getAllParticipants,
  getParticipantByInviteId,
} from '../services/participant.service';

const getAllEventParticipants = async (req: Request, res: Response) => {
  try {
    const { organizationId, eventId } = req.body;
    if (!organizationId || !eventId) {
      res.status(400).json({ error: 'Authentication Error' });
      return;
    }
    const participants: Participant[] = await getAllParticipants(organizationId, eventId);
    res.json(participants);
  } catch (err) {
    console.log(err);
  }
};

const getEventParticipantById = async (req: Request, res: Response) => {
  try {
    const participantId = req.params.id;
    const { organizationId, eventId } = req.body;

    if (!organizationId || !eventId) res.status(400).json({ error: 'Authentication Error' });

    if (!participantId) {
      res.status(400).json({ error: 'Participant id is required' });
      return;
    }

    const participant: Participant = await getParticipantById(
      organizationId,
      eventId,
      participantId,
    );

    res.json(participant);
  } catch (err) {
    console.log(err);
  }
};

const getEventParticipantByInviteId = async (req: Request, res: Response) => {
  try {
    const inviteId = req.params.inviteId;
    const { organizationId, eventId } = req.body;

    if (!organizationId || !eventId) res.status(400).json({ error: 'Authentication Error' });

    if (!inviteId) {
      res.status(400).json({ error: 'Invite id is required' });
      return;
    }

    const participant: Participant = await getParticipantByInviteId(
      organizationId,
      eventId,
      inviteId,
    );

    res.json(participant);
  } catch (err) {
    console.log(err);
  }
};

export { getAllEventParticipants, getEventParticipantById, getEventParticipantByInviteId };
