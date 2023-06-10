import ParticipantTag from '../models/ParticipantTag';
import UUID from '../UUID';

interface ParticipantTagRepository {
  create(item: ParticipantTag): Promise<boolean>;

  find(
    organizationId: UUID,
    eventId: UUID,
    tagId: UUID,
    participantId: UUID,
  ): Promise<ParticipantTag>;

  findAll(organizationId: UUID, eventId: UUID, participantId: UUID): Promise<ParticipantTag[]>;

  update(item: ParticipantTag): Promise<boolean>;

  delete(organizationId: UUID, eventId: UUID, tagId: UUID, participantId: UUID): Promise<boolean>;
}

export default ParticipantTagRepository;
