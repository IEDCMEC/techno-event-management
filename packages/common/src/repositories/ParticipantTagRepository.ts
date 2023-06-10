import ParticipantTag from '../models/ParticipantTag';
import UUID from '../UUID';

interface ParticipantTagRepository {
  create(item: ParticipantTag): Promise<boolean>;

  find(id: UUID, organizationId: UUID, eventId: UUID): Promise<ParticipantTag | null>;

  findAll(
    organizationId: UUID,
    eventId: UUID,
    participantId: UUID,
  ): Promise<ParticipantTag[] | null>;

  update(item: ParticipantTag): Promise<ParticipantTag | boolean>;

  delete(id: UUID, organizationId: UUID, eventId: UUID): Promise<boolean>;
}

export default ParticipantTagRepository;
