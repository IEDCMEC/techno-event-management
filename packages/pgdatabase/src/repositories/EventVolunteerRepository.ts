import { pg } from '../pg';

const UUID = require('common').UUID;
const EventVolunteer = require('common').EventVolunteer;

const EventVolunteerRepository = require('common').EventVolunteerRepository;

class NodePGEventVolunteerRepository implements InstanceType<typeof EventVolunteerRepository> {
  public async create(eventVolunteer: typeof EventVolunteer): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'INSERT INTO event_volunteer (organization_id, event_id,user_id) VALUES ($1, $2, $3) RETURNING *',
          [eventVolunteer.organization_id, eventVolunteer.event_id, eventVolunteer.user_id],
        )
      ).rows[0];

      if (!result) throw new Error('Event not created');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
    userId: typeof UUID,
  ): Promise<typeof EventVolunteer> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM event_volunteer WHERE id = $1 AND organization_id = $2 AND event_id = $3 AND user_id = $4',
          [id, organizationId, eventId, userId],
        )
      ).rows[0];

      if (!result) throw new Error('Event not found');

      return new EventVolunteer(result.id, result.organization_id, result.event_id, result.user_id);
    } catch (err: any) {
      return null as any;
    }
  }

  public async findAll(organizationId: typeof UUID): Promise<(typeof EventVolunteer)[]> {
    try {
      const result = (
        await pg.query('SELECT * FROM event WHERE organization_id = $1', [organizationId])
      ).rows;

      if (!result) throw new Error('Event not found');

      return result.map(
        (row) => new EventVolunteer(row.id, row.organization_id, row.event_id, row.user_id),
      );
    } catch (err: any) {
      return null as any;
    }
  }

  public async update(item: typeof EventVolunteer): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async delete(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
    userId: typeof UUID,
  ): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'DELETE FROM event_volunteer WHERE id = $1 AND organization_id = $2 AND event_id = $3 AND user_id = $4',
          [id, organizationId, eventId, userId],
        )
      ).rows[0];

      if (!result) throw new Error('Event not found');

      return true;
    } catch (err: any) {
      return false;
    }
  }
}

export default NodePGEventVolunteerRepository;
