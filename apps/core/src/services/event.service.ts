// @ts-ignore
import { Event } from 'common';
import { Participant, User, Organization } from 'common/src';

// @ts-ignore
import { pg } from 'pgdatabase';

type EventService = () => {
  addNewEventService: (organizationId: string, name: string) => Promise<Event>;
  getAllEventsService: (user: User, organizationId: string) => Promise<Event[]>;
  getEventService: (organizationId: string, eventId: string) => Promise<Event[]>;
};

const eventService: EventService = () => {
  return {
    addNewEventService: async (organizationId: string, name: string) => {
      try {
        const r = await pg.query('SELECT * FROM event WHERE organization_id = $1 AND name = $2', [
          organizationId,
          name,
        ]);

        if (r?.rows?.length > 0) {
          throw new Error('Event already exists');
        }

        await pg.query('BEGIN');
        let newEvent: Event = (
          await pg.query(
            `INSERT INTO event (organization_id, name) VALUES ($1, $2) RETURNING id, organization_id as "organizationId", name`,
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
        console.error(err.message);
        throw err;
      }
    },

    getAllEventsService: async (user: User, organizationId: string) => {
      try {
        let events: Event[] = (
          await pg.query(
            `SELECT id, organization_id as "organizationId", name FROM event WHERE organization_id = $1`,
            [organizationId],
          )
        ).rows;

        if (!events) {
          throw new Error('Something went wrong');
        }

        return events;
      } catch (err: any) {
        console.error(err.message);
        throw err;
      }
    },

    getEventService: async (organizationId: string, eventId: string) => {
      try {
        let event: Event = (
          await pg.query(
            `SELECT id, organization_id as "organizationId", name FROM event WHERE organization_id = $1 AND id = $2`,
            [organizationId, eventId],
          )
        ).rows[0];

        let participants: Participant[] = (
          await pg.query(
            `SELECT id, event_id as "eventId", first_name as "firstName", last_name as "lastName" FROM participant WHERE event_id = $1`,
            [eventId],
          )
        ).rows;

        event = {
          ...event,
          participants: participants,
        };

        return event;
      } catch (err: any) {
        console.error(err.message);
        throw err;
      }
    },
  };
};

export default eventService;
export type { EventService };
