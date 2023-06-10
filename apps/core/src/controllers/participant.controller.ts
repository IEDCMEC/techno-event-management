import { Request, Response } from 'express';
const Participant = require('common').Participant;

import {
  getParticipantById,
  getAllParticipants,
  getParticipantByInviteId,
} from '../services/participant.service';
import { checkInParticipant } from '../services/checkin.service';

const getAllEventParticipants = async (req: Request, res: Response) => {
  try {
    const { organizationId, eventId } = req.body;
    if (!organizationId || !eventId) {
      return res.status(400).json({ error: 'Authentication Error' });
    }
    const participants: (typeof Participant)[] = await getAllParticipants(organizationId, eventId);
    return res.json(participants);
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
      return res.status(400).json({ error: 'Participant id is required' });
    }

    const participant: typeof Participant = await getParticipantById(
      organizationId,
      eventId,
      participantId,
    );

    return res.json(participant);
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
      return res.status(400).json({ error: 'Invite id is required' });
    }

    const participant: typeof Participant = await getParticipantByInviteId(
      organizationId,
      eventId,
      inviteId,
    );

    return res.json(participant);
  } catch (err) {
    console.log(err);
  }
};

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

const getEventParticipantCheckInStatus = async (req: Request, res: Response) => {
  return res.json({ message: 'Check in participant' });
};

export {
  getAllEventParticipants,
  getEventParticipantById,
  getEventParticipantByInviteId,
  checkInEventParticipant,
  getEventParticipantCheckInStatus,
};
