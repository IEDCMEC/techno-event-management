import { Event } from 'common';

const pg = require('pgdatabase').pg;

type EventService = () => {
  addNewEventService: (organizationId: string, name: string) => Promise<Event>;
  getAllEventsService: (organizationId: string) => Promise<Event[]>;
  getEventService: (organizationId: string, eventId: string) => Promise<Event[]>;
};

const eventService: EventService = () => {
  return {
    addNewEventService: async (organizationId: string, name: string) => {
      try {
        await pg.query('BEGIN');
        let newEvent: Event = (
          await pg.query(`INSERT INTO event (organization_id, name) VALUES ($1, $2) RETURNING *`, [
            organizationId,
            name,
          ])
        ).rows[0];

        if (!newEvent) {
          throw new Error('Something went wrong');
        }

        await pg.query('COMMIT');
        return newEvent;
      } catch (err: any) {
        await pg.query('ROLLBACK');
        console.error(err);
        throw new Error('Something went wrong');
      }
    },

    getAllEventsService: async (organizationId: string) => {
      try {
        let events: Event[] = (
          await pg.query(`SELECT * FROM event WHERE organization_id = $1`, [organizationId])
        ).rows;

        if (!events) {
          throw new Error('Something went wrong');
        }

        return events;
      } catch (err: any) {
        console.error(err);
        throw new Error('Something went wrong');
      }
    },

    getEventService: async (organizationId: string, eventId: string) => {
      try {
        let event: Event[] = (
          await pg.query(`SELECT * FROM event WHERE organization_id = $1 AND id = $2`, [
            organizationId,
            eventId,
          ])
        ).rows[0];

        return event;
      } catch (err: any) {
        console.error(err);
        throw new Error('Something went wrong');
      }
    },
  };
};

export default eventService;
export type { EventService };
