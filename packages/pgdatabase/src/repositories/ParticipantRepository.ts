import { pg } from '../pg';

const UUID = require('common').UUID;
const Participant = require('common').Participant;
const ParticipantRepository = require('common').ParticipantRepository;

class NodePGParticipantRepository implements InstanceType<typeof ParticipantRepository> {
  public async create(participant: typeof Participant): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'INSERT INTO participant (organization_id, event_id, first_name, last_name, tag) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [
            participant.id,
            participant.organization_id,
            participant.event_id,
            participant.first_name,
            participant.last_name,
            participant.invite_id,
          ],
        )
      ).rows[0];

      if (!result) throw new Error('Participant not created');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(
    organizationId: typeof UUID,
    eventId: typeof UUID,
    id: typeof UUID,
  ): Promise<typeof Participant> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant WHERE organization_id = $1 AND event_id = $2 AND id = $3',
          [organizationId, eventId, id],
        )
      ).rows[0];

      if (!result) throw new Error('Participant not found');

      return new Participant(
        result.id,
        result.organization_id,
        result.event_id,
        result.first_name,
        result.last_name,
        result.invite_id,
      );
    } catch (err: any) {
      return null as any;
    }
  }

  public async findByInviteId(
    organizationId: typeof UUID,
    eventId: typeof UUID,
    inviteId: string,
  ): Promise<typeof Participant> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant WHERE organization_id = $1 AND event_id = $2 AND invite_id = $3',
          [organizationId, eventId, inviteId],
        )
      ).rows[0];
      return new Participant(
        result.id,
        result.organization_id,
        result.event_id,
        result.first_name,
        result.last_name,
        result.invite_id,
      );
    } catch (err: any) {
      return null as any;
    }
  }

  public async findAll(
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<(typeof Participant)[]> {
    try {
      const result = (
        await pg.query('SELECT * FROM participant WHERE organization_id = $1 AND event_id = $2', [
          organizationId,
          eventId,
        ])
      ).rows;

      if (!result) throw new Error('Participants not found');

      return result.map(
        (row) =>
          new Participant(
            row.id,
            row.organization_id,
            row.event_id,
            row.first_name,
            row.last_name,
            row.invite_id,
          ),
      );
    } catch (err: any) {
      return [];
    }
  }

  public async update(participant: typeof Participant): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'UPDATE participant SET first_name = $1, last_name = $2, tag = $3 WHERE organization_id = $4 AND event_id = $5 AND id = $6 RETURNING *',
          [
            participant.id,
            participant.first_name,
            participant.last_name,
            participant.invite_id,
            participant.organization_id,
            participant.event_id,
          ],
        )
      ).rows[0];

      if (!result) throw new Error('Participant not updated');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async delete(participant: typeof Participant): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'DELETE FROM participant WHERE organization_id = $1 AND event_id = $2 AND id = $3 RETURNING *',
          [participant.organization_id, participant.event_id, participant.id],
        )
      ).rows[0];

      if (!result) throw new Error('Participant not deleted');
      return true;
    } catch (err: any) {
      return false;
    }
  }
}

export default NodePGParticipantRepository;
