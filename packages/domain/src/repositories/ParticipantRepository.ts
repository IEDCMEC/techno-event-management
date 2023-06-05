import UUID from '../UUID';

interface ParticipantRepository<Participant> {
  create(domain: Participant): void;

  find(organizationId: UUID, eventId: UUID, id: UUID): Promise<Participant>;

  findAll(organizationId: UUID, eventId: UUID): Promise<Participant[]>;

  update(domain: Participant): void;

  delete(organizationId: UUID, eventId: UUID, id: UUID): Promise<boolean>;
}

export default ParticipantRepository;
