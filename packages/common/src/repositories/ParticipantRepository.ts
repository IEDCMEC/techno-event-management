import UUID from '../UUID';
import Participant from '../models/Participant';

interface ParticipantRepository {
  create(item: Participant): Promise<boolean>;

  find(id: UUID, organizationId: UUID, eventId: UUID): Promise<Participant | null>;

  findByInviteId(
    organizationId: UUID,
    eventId: UUID,
    inviteId: string,
  ): Promise<Participant | null>;

  findAll(organizationId: UUID, eventId: UUID): Promise<Participant[] | null>;

  update(item: Participant): Promise<Participant | boolean>;

  delete(item: Participant): Promise<boolean>;
}

export default ParticipantRepository;
