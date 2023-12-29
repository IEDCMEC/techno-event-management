import { Request, Response } from 'express';
import { CheckinService } from '../services/checkin.service';

const checkinController = (checkinService: CheckinService) => {
  return {
    checkinParticipantController: async (req: Request, res: Response) => {
      try {
        const user = req?.body?.user;
        const organizationId = req?.params?.organizationId;
        const eventId = req?.params?.eventId;
        const participantId = req?.params?.participantId;
        const checkinTime = req?.body?.checkinTime;

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        if (!eventId || eventId === '' || eventId === undefined) {
          return res.status(400).json({ error: 'Event ID is required' });
        }

        if (!participantId || participantId === '' || participantId === undefined) {
          return res.status(400).json({ error: 'Participant ID is required' });
        }

        if (!checkinTime || checkinTime === '' || checkinTime === undefined) {
          return res.status(400).json({ error: 'Checkin time is required' });
        }

        if (!req.body.user.assets.find((asset: any) => asset.organizationId === organizationId)) {
          return res.status(400).json({ error: 'You are not a member of this organization' });
        }

        if (!req.body.user.assets.find((asset: any) => asset.eventId === eventId)) {
          return res.status(400).json({ error: 'No such event' });
        }

        const newParticipantCheckin = await checkinService().checkinParticipantService(
          organizationId,
          eventId,
          participantId,
          checkinTime,
          user.id,
        );
        return res.status(201).json({
          message: 'Participant checked in successfully',
          newParticipantCheckin,
        });
      } catch (err: any) {
        console.error(err.message);
        return res.status(400).json({ error: err.message });
      }
    },
    getParticipantCheckinDetailsController: async (req: Request, res: Response) => {
      try {
        const user = req?.body?.user;
        const organizationId = req?.params?.organizationId;
        const eventId = req?.params?.eventId;
        const participantId = req?.params?.participantId;

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

        const participantCheckinDetails =
          await checkinService().getParticipantCheckinDetailsService(
            organizationId,
            eventId,
            participantId,
          );
        return res.status(200).json({
          message: 'Participant checkin details retrieved successfully',
          participantCheckinDetails,
        });
      } catch (err: any) {
        console.error(err.message);
        return res.status(400).json({ error: err.message });
      }
    },
  };
};

export default checkinController;
