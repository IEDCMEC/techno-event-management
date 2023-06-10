import { Request, Response } from 'express';

const getAllEvents = async (req: Request, res: Response) => {
  const { organizationId } = req.body;
  // const events = await getAllEventsByOrganization(organizationId);
  // res.status(200).json(events);
  // return { message: 'Get all events' };
};

const getEventById = async () => {
  return { message: 'Get event by id' };
};

export { getAllEvents, getEventById };
