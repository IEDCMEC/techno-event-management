const UUID = require('common').UUID;
const EventRepository = require('common').EventRepository;
const NodePGEventRepository = require('pgdatabase').NodePGEventRepository;

const eventRepository: typeof EventRepository = new NodePGEventRepository();

const getAllEventsByOrganization = async (organizationId: typeof UUID) => {
  // const events = await EventRepository.findAll(organizationId);
  // return events;
};

const getEvent = async (organizationId: string, eventId: string) => {};
