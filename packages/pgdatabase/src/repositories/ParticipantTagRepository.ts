import { pg } from '../pg';

const UUID = require('common').UUID;
const ParticipantTagRepository = require('common').ParticipantTagRepository;
const ParticipantTag = require('common').ParticipantTag;

class NodePGParticipantTagRepository implements InstanceType<typeof ParticipantTagRepository> {
  public async create(participantTag: typeof ParticipantTag): Promise<boolean> {
    try {
      const result = await pg.query(
        'INSERT INTO participant_tag( id, organization_id, event_id, tag_id, participant_id) VALUES ($1, $2, $3, $4, $5)',
        [
          participantTag.id,
          participantTag.organization_id,
          participantTag.event_id,
          participantTag.tag_id,
          participantTag.participant_id,
        ],
      );

      if (!result) throw new Error('Cannot create participant tag');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<typeof ParticipantTag> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_tag WHERE organization_id = $1 AND event_id = $2 AND id = $3',
          [organizationId, eventId, id],
        )
      ).rows[0];

      if (!result) throw new Error('Participant tag not found');

      return new ParticipantTag(
        result.id,
        result.organization_id,
        result.event_id,
        result.tag_id,
        result.participant_id,
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async findAll(
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<(typeof ParticipantTag)[]> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_tag WHERE organization_id = $1 AND event_id = $2',
          [organizationId, eventId],
        )
      ).rows;

      if (!result) throw new Error('Participant tags not found');

      return result.map(
        (row: typeof ParticipantTag) =>
          new ParticipantTag(
            row.id,
            row.organization_id,
            row.event_id,
            row.tag_id,
            row.participant_id,
          ),
      );
    } catch (err: any) {
      return [];
    }
  }

  public async update(participantExtras: typeof ParticipantTag): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default NodePGParticipantTagRepository;
