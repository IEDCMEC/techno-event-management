import { pg } from '../pg';

const UUID = require('common').UUID;
const ParticipantExtrasRepository = require('common').ParticipantExtrasRepository;
const ParticipantExtras = require('common').ParticipantExtras;

class NodePGParticipantExtrasRepository
  implements InstanceType<typeof ParticipantExtrasRepository>
{
  public async create(participantExtra: typeof ParticipantExtras): Promise<boolean> {
    try {
      const result = await pg.query(
        'INSERT INTO participant_extras( id, organization_id, event_id, extra_id, participant_extra_id) VALUES ($1, $2, $3, $4, $5)',
        [
          participantExtra.id,
          participantExtra.organization_id,
          participantExtra.event_id,
          participantExtra.extra_id,
          participantExtra.participant_extra_id,
        ],
      );

      if (!result) throw new Error('Cannot find participant extras');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<typeof ParticipantExtras> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_extras_ WHERE organization_id = $1 AND event_id = $2 AND id = $3',
          [organizationId, eventId, id],
        )
      ).rows[0];

      if (!result) throw new Error('Participant extras not found');

      return new ParticipantExtras(
        result.id,
        result.organization_id,
        result.event_id,
        result.extra_id,
        result.participant_extra_id,
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async findAll(
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<(typeof ParticipantExtras)[]> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_extras WHERE organization_id = $1 AND event_id = $2',
          [organizationId, eventId],
        )
      ).rows;

      if (!result) throw new Error('Participant extras details not found');

      return result.map(
        (participantExtra: typeof ParticipantExtras) =>
          new ParticipantExtras(
            participantExtra.id,
            participantExtra.organization_id,
            participantExtra.event_id,
            participantExtra.extra_id,
            participantExtra.participant_extra_id,
          ),
      );
    } catch (err: any) {
      return [];
    }
  }

  public async update(participantExtras: typeof ParticipantExtras): Promise<void> {
    try {
      const result = await pg.query(
        'UPDATE participant_extras SET extra_id = $1, participant_extra_id = $2 WHERE id = $3 AND organization_id = $4 AND event_id = $5',
        [
          participantExtras.extra_id,
          participantExtras.participant_extra_id,
          participantExtras.id,
          participantExtras.organization_id,
          participantExtras.event_id,
        ],
      );

      if (!result) throw new Error('Error in updating participant extras');
    } catch (err: any) {
      throw new Error('Error in updating participant extras');
    }
  }

  public async delete(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<void> {
    try {
      const result = await pg.query(
        'DELETE FROM participant_extras WHERE id = $1 AND organization_id = $2 AND event_id = $3',
        [id, organizationId, eventId],
      );

      if (!result) throw new Error('Error in deleting participant extras');
    } catch (err: any) {
      throw new Error('Error in deleting participant extras');
    }
  }
}

export default NodePGParticipantExtrasRepository;
