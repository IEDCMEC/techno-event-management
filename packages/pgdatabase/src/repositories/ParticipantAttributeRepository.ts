import { pg } from '../pg';

const UUID = require('common').UUID;
const ParticipantAttributeRepository = require('common').ParticipantAttributeRepository;
const ParticipantAttribute = require('common').ParticipantAttribute;

class NodePGParticipantAttributeRepository
  implements InstanceType<typeof ParticipantAttributeRepository>
{
  public async create(participantAttribute: typeof ParticipantAttribute): Promise<boolean> {
    try {
      const result = await pg.query(
        'INSERT INTO participant_attribute(id, organization_id, event_id, attribute_id, participant_id, value) VALUES($1, $2, $3, $4, $5, $6)',
        [
          participantAttribute.id,
          participantAttribute.organization_id,
          participantAttribute.event_id,
          participantAttribute.attribute_id,
          participantAttribute.participant_id,
          participantAttribute.value,
        ],
      );

      if (!result) throw new Error('Cannot create participant attribute');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<typeof ParticipantAttribute> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM participant_attribute WHERE id = $1 AND organization_id = $2 AND event_id = $3',
          [id, organizationId, eventId],
        )
      ).rows[0];

      if (!result) throw new Error('Participant attribute details not found');

      return new ParticipantAttribute(
        result.id,
        result.organization_id,
        result.event_id,
        result.attribute_id,
        result.participant_id,
        result.value,
      );
    } catch (err: any) {
      return null as any;
    }
  }

  public async findAll(
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<(typeof ParticipantAttribute)[]> {
    throw new Error('Method not implemented.');
  }

  public async update(participantCheckIn: typeof ParticipantAttribute): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export default NodePGParticipantAttributeRepository;
