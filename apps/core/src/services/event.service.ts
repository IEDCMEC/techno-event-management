// @ts-ignore
import { Event } from 'common';
import { Participant } from 'common/src';

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
        console.error(err);
        throw new Error('Something went wrong');
      }
    },

    getAllEventsService: async (organizationId: string) => {
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
        console.error(err);
        throw new Error('Something went wrong');
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

        event.participants = participants;

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
