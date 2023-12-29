import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

const eventController = (eventService: EventService) => {
  return {
    addNewEventController: async (req: Request, res: Response) => {
      try {
        const organizationId = req?.params?.organizationId;
        const name = req?.body?.name;

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        if (!name || name === '' || name === undefined) {
          return res.status(400).json({ error: 'Event name is required' });
        }

        if (!req.body.user.assets.find((asset: any) => asset.organizationId === organizationId)) {
          return res.status(400).json({ error: 'You are not a member of this organization' });
        }

        const newEvent = await eventService().addNewEventService(organizationId, name);

        return res.status(201).json({
          message: 'Successfully created new event',
          event: newEvent,
        });
      } catch (err: any) {
        console.error(err.message);
        return res.status(400).json({ error: err.message });
      }
    },
    getAllEventsController: async (req: Request, res: Response) => {
      try {
        const user = req.body.user;
        const organizationId = req?.params?.organizationId;

        if (!user || user === '' || user === undefined) {
          return res.status(400).json({ error: 'Authentication error' });
        }

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        if (!req.body.user.assets.find((asset: any) => asset.organizationId === organizationId)) {
          return res.status(400).json({ error: 'You are not a member of this organization' });
        }

        const events = await eventService().getAllEventsService(user, organizationId);

        return res.status(200).json({
          message: 'Successfully retrieved all events',
          events: events,
        });
      } catch (err: any) {
        console.error(err.message);
        return res.status(400).json({ error: err.message });
      }
    },
    getEventController: async (req: Request, res: Response) => {
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

        const event = await eventService().getEventService(organizationId, eventId);

        return res.status(200).json({
          message: 'Successfully retrieved event',
          event: event,
        });
      } catch (err: any) {
        console.error(err.message);
        return res.status(400).json({ error: err.message });
      }
    },
  };
};

export default eventController;
