const UUID = require('common').UUID;

const pg = require('pgdatabase').pg;

const addNewEventService = async (organizationId: typeof UUID, name: string) => {
  console.log({ organizationId, name });
  try {
    // const result = await eventRepository.create({ organization_id: organizationId, name });
    // if (!result) throw new Error('Event not created');
    // return result;
  } catch (err: any) {
    console.log(err);
  }
};

const getAllEventsByOrganization = async (organizationId: typeof UUID) => {
  // const events = await EventRepository.findAll(organizationId);
  // return events;
};

const getEvent = async (organizationId: string, eventId: string) => {};

export { addNewEventService, getAllEventsByOrganization, getEvent };
