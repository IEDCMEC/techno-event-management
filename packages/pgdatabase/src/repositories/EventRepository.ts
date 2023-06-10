import { pg } from '../pg';

const UUID = require('common').UUID;
const Event = require('common').Event;

const EventRepository = require('common').EventRepository;

class NodePGEventRepository implements InstanceType<typeof EventRepository> {
  public async create(event: typeof Event): Promise<boolean> {
    try {
      const result = (
        await pg.query('INSERT INTO event (organization_id, name) VALUES ($1, $2) RETURNING *', [
          event.organization_id,
          event.name,
        ])
      ).rows[0];

      if (!result) throw new Error('Event not created');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(eventId: typeof UUID, organizationId: typeof UUID): Promise<typeof Event> {
    try {
      const result = (
        await pg.query('SELECT * FROM event WHERE organization_id = $1 AND id = $2', [
          eventId,
          organizationId,
        ])
      ).rows[0];

      if (!result) throw new Error('Event not found');

      return new Event(result.id, result.organization_id, result.name);
    } catch (err: any) {
      return null as any;
    }
  }

  public async findAll(organizationId: typeof UUID): Promise<(typeof Event)[]> {
    try {
      const result = (
        await pg.query('SELECT * FROM event WHERE organization_id = $1', [organizationId])
      ).rows;

      if (!result) throw new Error('Event not found');

      return result.map((row) => new Event(row.id, row.organization_id, row.name));
    } catch (err: any) {
      return null as any;
    }
  }

  public async update(item: typeof Event): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'UPDATE event SET name = $1 WHERE organization_id = $2 AND id = $3 RETURNING *',
          [item.name, item.organization_id, item.id],
        )
      ).rows[0];

      if (!result) throw new Error('Event not updated');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async delete(item: typeof Event): Promise<boolean> {
    try {
      const result = (
        await pg.query('DELETE FROM event WHERE organization_id = $1 AND id = $2 RETURNING *', [
          item.organization_id,
          item.id,
        ])
      ).rows[0];

      if (!result) throw new Error('Event not deleted');

      return true;
    } catch (err: any) {
      return false;
    }
  }
}

export default NodePGEventRepository;
