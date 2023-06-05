import UUID from 'domain/src/UUID';
import {Participant} from '../../domain/src/';
import {ParticipantRepository} from 'domain/src/';
import {pg} from './pg';

class NodePGParticipantRepository implements ParticipantRepository<Participant> {
    public async create(participant: Participant): Promise<void> {
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
        } catch (err: any) {
        }
    }

    public async find(organizationId: UUID, eventId: UUID, id: UUID): Promise<Participant> {
        console.log('find', organizationId, eventId, id);
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
        }
    }

    public async findAll(organizationId: UUID, eventId: UUID): Promise<Participant[]> {
        try {
            const result = (
                await pg.query(
                    'SELECT * FROM participant WHERE organization_id = $1 AND event_id = $2',
                    [organizationId, eventId],
                )
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
        }
    }

    public async update(participant: Participant): Promise<void> {
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
        } catch (err: any) {
        }
    }

    public async delete(organizationId: UUID, eventId: UUID, id: UUID): Promise<boolean> {
        try {
            const result = (
                await pg.query(
                    'DELETE FROM participant WHERE organization_id = $1 AND event_id = $2 AND id = $3 RETURNING *',
                    [organizationId, eventId, id],
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
