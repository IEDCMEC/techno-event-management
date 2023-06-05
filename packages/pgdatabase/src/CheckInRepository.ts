import UUID from 'domain/src/UUID';
import { Participant } from '../../domain/src/';
import { pg } from './pg';
import CheckInRepository from '../../pgdatabase/src/ParticipantRepository';
import ParticipantCheckIn from '../../domain/src/models/ParticipantCheckIn';
import organization from 'domain/src/models/Organization';
import event from 'domain/src/models/Event';
import participant from 'domain/src/models/Participant';

class NodePGCheckInRepository implements CheckInRepository<ParticipantCheckIn> {
  public async create(participant: Participant): Promise<void> {
    throw new Error('Method not implemented');
  }

  public async find(organizationId: UUID, eventId: UUID, id: UUID): Promise<ParticipantCheckIn> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_check_in WHERE organization_id = $1 AND event_id = $2 AND id = $3',
          [organizationId, eventId, id],
        )
      ).rows[0];

      if (!result) throw new Error('Checkin details not found');

      return new ParticipantCheckIn(
        result.id,
        result.organization_id,
        result.event_id,
        result.participant_id,
        result.checked_in,
        result.check_in_time,
        result.checked_in_by,
      );
    } catch (err: any) {}
  }

  public async findByParticipantId(
    organizationId: UUID,
    eventId: UUID,
    participantId: UUID,
  ): Promise<ParticipantCheckIn> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_check_in WHERE organization_id = $1 AND event_id = $2 AND participant_id = $3',
          [organizationId, eventId, participantId],
        )
      ).rows[0];

      if (!result) throw new Error('Checkin details not found');

      return new ParticipantCheckIn(
        result.id,
        result.organization_id,
        result.event_id,
        result.participant_id,
        result.checked_in,
        result.check_in_time,
        result.checked_in_by,
      );
    } catch (err: any) {}
  }

  public async findAll(organizationId: UUID, eventId: UUID): Promise<ParticipantCheckIn[]> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_check_in WHERE organization_id = $1 AND event_id = $2',
          [organizationId, eventId],
        )
      ).rows;

      if (!result) throw new Error('Checkin details not found');

      return result.map(
        (row) =>
          new ParticipantCheckIn(
            row.id,
            row.organization_id,
            row.event_id,
            row.participant_id,
            row.checked_in,
            row.check_in_time,
            row.checked_in_by,
          ),
      );
    } catch (err: any) {}
  }

  public async update(participantCheckIn: ParticipantCheckIn): Promise<void> {
    throw new Error('Method not implemented');
  }

  public async delete(organizationId: UUID, eventId: UUID, id: UUID): Promise<boolean> {
    throw new Error('Method not implemented');
  }

  public async checkInParticipant(
    organizationId: UUID,
    eventId: UUID,
    participantId: UUID,
    checkedInBy: UUID,
  ): Promise<boolean> {
    try {
      const result = await pg.query(
        'INSERT INTO participant_check_in( organization_id, event_id, participant_id, checked_in, check_in_time, checked_in_by) VALUES ($1, $2, $3, true, now(), $4)',
        [organizationId, eventId, participantId, checkedInBy],
      );

      if (!result) throw new Error('Error in checking in participant');

      return true;
    } catch (err: any) {}
  }
}

export default NodePGCheckInRepository;
