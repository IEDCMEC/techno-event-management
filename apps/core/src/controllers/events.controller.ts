import { Request, Response } from 'express';

import { addNewEventService } from '../services/events.service';

const addNewEvent = async (req: Request, res: Response) => {
  try {
    const organizationId = req.params.organizationId;
    const { name } = req.body;

    const eventId = await addNewEventService(organizationId, name);

    res.status(201).json({ eventId });
  } catch (err) {
    console.log(err);
  }
};

const getAllEvents = async (req: Request, res: Response) => {
  const { organizationId } = req.body;
  // const events = await getAllEventsByOrganization(organizationId);
  // res.status(200).json(events);
  // return { message: 'Get all events' };
};

const getEventById = async () => {
  return { message: 'Get event by id' };
};

export { addNewEvent, getAllEvents, getEventById };
