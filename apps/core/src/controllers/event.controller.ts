import { Request, Response } from 'express';

const eventController = (eventService: any) => {
  const addNewEventController = async (req: Request, res: Response) => {
    try {
      const organizationId = req.params.organizationId;
      const { name } = req.body.event;

      const newEvent = await eventService().addNewEventService(organizationId, name);

      res.status(201).json({ event: newEvent });
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
  return {
    addNewEventController,
    getAllEvents,
    getEventById,
  };
};

export { eventController };
