import { pg } from '../pg';

const AvailableTags = require('common').AvailableTags;
const UUID = require('common').UUID;
const Event = require('common').Event;

const AvailableTagsRepository = require('common').AvailableTagsRepository;

class NodePGAvailableTagsRepository implements InstanceType<typeof AvailableTagsRepository> {
  public async create(tag: typeof AvailableTags): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'INSERT INTO available_tags (organization_id, event_id, tag) VALUES ($1, $2, $3)',
          [tag.organization_id, tag.event_id, tag.tag],
        )
      ).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }

  public async find(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<typeof AvailableTags | null> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM available_tagss WHERE id = $1 AND organization_id = $2 AND event_id = $3',
          [id, organizationId, eventId],
        )
      ).rows[0];

      if (!result) return null;

      return result;
    } catch (err) {
      return null;
    }
  }

  public async findAll(
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<(typeof AvailableTags)[] | null> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM available_tags WHERE organization_id = $1 AND event_id = $2',
          [organizationId, eventId],
        )
      ).rows[0];

      if (!result) return null;

      return result;
    } catch (err) {
      return null;
    }
  }

  public async update(tag: typeof AvailableTags): Promise<typeof AvailableTags | boolean> {
    try {
      const result = (
        await pg.query(
          'UPDATE available_tags SET tag = $1  WHERE id = $2 AND organization_id = $3 AND event_id = $4 RETURNING *',
          [tag.tag, tag.id, tag.organization_id, tag.event_id],
        )
      ).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }

  public async delete(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'DELETE FROM available_tags WHERE id = $1 AND organization_id = $2 AND event_id = $3',
          [id, organizationId, eventId],
        )
      ).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }
}

export default NodePGAvailableTagsRepository;
