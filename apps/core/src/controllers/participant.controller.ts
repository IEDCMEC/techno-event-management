import { Request, Response } from 'express';
import participantService, { ParticipantService } from '../services/participant.service';

const participantController = (participant: ParticipantService) => {
  return {
    addNewParticipantController: async (req: Request, res: Response) => {
      try {
        const organizationId = req?.params?.organizationId;
        const eventId = req?.params?.eventId;
        const firstName = req?.body?.firstName;
        const lastName = req?.body?.lastName;

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

        if (!req.body.user.assets.find((asset: any) => asset.organizationId === organizationId)) {
          return res.status(400).json({ error: 'You are not a member of this organization' });
        }

        if (!req.body.user.assets.find((asset: any) => asset.eventId === eventId)) {
          return res.status(400).json({ error: 'No such event' });
        }

        const newParticipant = await participantService().addNewParticipantService(
          organizationId,
          eventId,
          firstName,
          lastName,
        );

        return res.status(201).json({
          message: 'Successfully added new participant to event',
          participant: newParticipant,
        });
      } catch (err: any) {
        console.log(err.message);
        return res.status(400).json({ error: err.message });
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

        if (!req.body.user.assets.find((asset: any) => asset.organizationId === organizationId)) {
          return res.status(400).json({ error: 'You are not a member of this organization' });
        }

        if (!req.body.user.assets.find((asset: any) => asset.eventId === eventId)) {
          return res.status(400).json({ error: 'No such event' });
        }

        const participants = await participantService().getAllParticipantsService(
          organizationId,
          eventId,
        );

        return res.status(200).json({
          message: 'Successfully retrieved all participants',
          participants: participants,
        });
      } catch (err: any) {
        console.log(err.message);
        return res.status(400).json({ error: err.message });
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

        if (!req.body.user.assets.find((asset: any) => asset.organizationId === organizationId)) {
          return res.status(400).json({ error: 'You are not a member of this organization' });
        }

        if (!req.body.user.assets.find((asset: any) => asset.eventId === eventId)) {
          return res.status(400).json({ error: 'No such event' });
        }

        const participant = await participantService().getParticipantService(
          organizationId,
          eventId,
          participantId,
        );

        return res.status(200).json({
          message: 'Successfully retrieved participant',
          participant: participant,
        });
      } catch (err: any) {
        console.log(err.message);
        return res.status(400).json({ error: err.message });
      }
    },
  };
};

export default participantController;
