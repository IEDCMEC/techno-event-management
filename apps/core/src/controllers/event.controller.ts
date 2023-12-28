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

        const newEvent = await eventService().addNewEventService(organizationId, name);

        return res.status(201).json({
          message: 'Successfully created new event',
          event: newEvent,
        });
      } catch (err) {
        console.error(err);
      }
    },
    getAllEventsController: async (req: Request, res: Response) => {
      try {
        const organizationId = req?.params?.organizationId;

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        const events = await eventService().getAllEventsService(organizationId);

        return res.status(200).json({
          message: 'Successfully retrieved all events',
          events: events,
        });
      } catch (err) {
        console.error(err);
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

        const event = await eventService().getEventService(organizationId, eventId);

        return res.status(200).json({
          message: 'Successfully retrieved event',
          event: event,
        });
      } catch (err) {
        console.error(err);
      }
    },
  };
};

export default eventController;
