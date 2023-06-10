import { pg } from '../pg';

const UUID = require('common').UUID;
const ParticipantExtrasCheckInRepository = require('common').ParticipantExtrasCheckInRepository;
const ParticipantExtrasCheckIn = require('common').ParticipantExtrasCheckIn;

class NodePGParticipantExtrasCheckIn
  implements InstanceType<typeof ParticipantExtrasCheckInRepository>
{
  public async create(participantExtrasCheckIn: typeof ParticipantExtrasCheckIn): Promise<boolean> {
    try {
      const result = await pg.query(
        'INSERT INTO participant_extras_check_in( id, organization_id, event_id, participant_extra_id, checked_in, check_in_time, checked_in_by) VALUES ($1, $2, $3, $4,true, now(), $5)',
        [
          participantExtrasCheckIn.id,
          participantExtrasCheckIn.organization_id,
          participantExtrasCheckIn.event_id,
          participantExtrasCheckIn.participant_extra_id,
          participantExtrasCheckIn.checked_in_by,
        ],
      );

      if (!result) throw new Error('Error in checking in participant extra');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<typeof ParticipantExtrasCheckIn> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_extras_check_in WHERE organization_id = $1 AND event_id = $2 AND id = $3',
          [organizationId, eventId, id],
        )
      ).rows[0];

      if (!result) throw new Error('Checkin details not found');

      return new ParticipantExtrasCheckIn(
        result.id,
        result.organization_id,
        result.event_id,
        result.participant_id,
        result.checked_in,
        result.check_in_time,
        result.checked_in_by,
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async findAll(
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<(typeof ParticipantExtrasCheckIn)[]> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_extras_check_in WHERE organization_id = $1 AND event_id = $2',
          [organizationId, eventId],
        )
      ).rows;

      if (!result) throw new Error('Checkin details not found');

      return result.map(
        (row: {
          id: typeof UUID;
          organization_id: typeof UUID;
          event_id: typeof UUID;
          participant_extra_id: typeof UUID;
          checked_in: boolean;
          check_in_time: Date;
          checked_in_by: typeof UUID;
        }) =>
          new ParticipantExtrasCheckIn(
            row.id,
            row.organization_id,
            row.event_id,
            row.participant_extra_id,
            row.checked_in,
            row.check_in_time,
            row.checked_in_by,
          ),
      );
    } catch (err: any) {
      return [];
    }
  }

  public async update(participantExtrasCheckIn: typeof ParticipantExtrasCheckIn): Promise<void> {
    try {
      const result = await pg.query(
        'UPDATE participant_extras_check_in SET checked_in = $1, check_in_time = now(), checked_in_by = $2 WHERE id = $3 AND organization_id = $4 AND event_id = $5',
        [
          participantExtrasCheckIn.checked_in,
          participantExtrasCheckIn.checked_in_by,
          participantExtrasCheckIn.id,
          participantExtrasCheckIn.organization_id,
          participantExtrasCheckIn.event_id,
        ],
      );

      if (!result) throw new Error('Error in updating participant checkin');
    } catch (err: any) {
      throw new Error('Error in updating participant checkin');
    }
  }

  public async delete(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<void> {
    try {
      const result = await pg.query(
        'DELETE FROM participant_extras_check_in WHERE id = $1 AND organization_id = $2 AND event_id = $3',
        [id, organizationId, eventId],
      );

      if (!result) throw new Error('Error in deleting participant checkin');
    } catch (err: any) {
      throw new Error('Error in deleting participant checkin');
    }
  }
}

export default NodePGParticipantExtrasCheckIn;
