import UUID from '../UUID';
import Participant from '../models/Participant';

interface ParticipantRepository {
  create(item: Participant): Promise<boolean>;

  find(organizationId: UUID, eventId: UUID, id: UUID): Promise<Participant>;

  findByInviteId(organizationId: UUID, eventId: UUID, inviteId: string): Promise<Participant>;

  findAll(organizationId: UUID, eventId: UUID): Promise<Participant[]>;

  update(item: Participant): Promise<boolean>;

  delete(item: Participant): Promise<boolean>;
}

export default ParticipantRepository;
