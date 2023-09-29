const UUID = require('common').UUID;
const Event = require('common').Event;

const pg = require('pgdatabase').pg;

const eventService = () => {
  const addNewEventService = async (organizationId: typeof UUID, name: string) => {
    try {
      await pg.query('BEGIN');
      let newEvent: typeof Event = (
        await pg.query(
          `INSERT INTO event (organization_id, name) VALUES ($1, $2) RETURNING organization_id as organizationId`,
          [organizationId, name],
        )
      ).rows[0];

      if (!newEvent) {
        throw new Error('Something went wrong');
      }

      await pg.query('COMMIT');
      return newEvent;
    } catch (err: any) {
      await pg.query('ROLLBACK');
      console.error(err);
    }
  };

  const getAllEventsByOrganization = async (organizationId: typeof UUID) => {
    // const events = await EventRepository.findAll(organizationId);
    // return events;
  };

  const getEvent = async (organizationId: string, eventId: string) => {};

  return {
    addNewEventService,
    getAllEventsByOrganization,
    getEvent,
  };
};

export { eventService };
