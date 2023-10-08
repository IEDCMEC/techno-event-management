import { Request, Response } from 'express';
import participantService, { ParticipantService } from '../services/participant.service';

const participantController = (participant: ParticipantService) => {
  return {
    addNewParticipantController: async (req: Request, res: Response) => {
      try {
        const organizationId = req?.params?.organizationId;
        const eventId = req?.params?.eventId;
        const { firstName, lastName } = req?.body?.participant;

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        if (!eventId || eventId === '' || eventId === undefined) {
          return res.status(400).json({ error: 'Event ID is required' });
        }

        if (!firstName || firstName === '' || firstName === undefined) {
          return res.status(400).json({ error: 'First name is required' });
        }

        if (!lastName || lastName === '' || lastName === undefined) {
          return res.status(400).json({ error: 'Last name is required' });
        }

        const newParticipant = await participantService().addNewParticipantService(
          organizationId,
          eventId,
          firstName,
          lastName,
        );

        return res.status(201).json({ participant: newParticipant });
      } catch (err) {
        console.log(err);
      }
    },
    getAllParticipantsController: async (req: Request, res: Response) => {
      try {
        const { organizationId, eventId } = req?.params;

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        if (!eventId || eventId === '' || eventId === undefined) {
          return res.status(400).json({ error: 'Event ID is required' });
        }

        const participants = await participantService().getAllParticipantsService(
          organizationId,
          eventId,
        );

        return res.status(201).json({ participants: participants });
      } catch (err) {
        console.log(err);
      }
    },
    getParticipantController: async (req: Request, res: Response) => {
      try {
        const { organizationId, eventId, participantId } = req?.params;

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        if (!eventId || eventId === '' || eventId === undefined) {
          return res.status(400).json({ error: 'Event ID is required' });
        }

        if (!participantId || participantId === '' || participantId === undefined) {
          return res.status(400).json({ error: 'Participant ID is required' });
        }

        const participant = await participantService().getParticipantService(
          organizationId,
          eventId,
          participantId,
        );

        return res.status(201).json({ participant: participant });
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export default participantController;
