import UUID from '../UUID';
import ParticipantAttribute from '../models/ParticipantAttribute';

interface ParticipantAttributesRepository {
  create(item: Event): Promise<boolean>;

  find(id: UUID, organizationId: UUID, eventId: UUID): Promise<ParticipantAttribute | null>;

  findAll(organizationId: UUID, eventId: UUID): Promise<ParticipantAttribute[] | null>;

  update(item: ParticipantAttribute): Promise<boolean>;

  delete(item: ParticipantAttribute): Promise<boolean>;
}

export default ParticipantAttributesRepository;
