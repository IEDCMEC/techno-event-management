import { UUID } from 'common';
const EventRepository = require('common').EventRepository;
import { NodePGEventRepository } from 'pgdatabase';

const eventRepository: EventRepository = new NodePGEventRepository();

const getAllEventsByOrganization = async (organizationId: UUID) => {
  // const events = await EventRepository.findAll(organizationId);
  // return events;
};

const getEvent = async (organizationId: string, eventId: string) => {};
