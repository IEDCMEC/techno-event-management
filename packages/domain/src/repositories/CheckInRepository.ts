import UUID from '../UUID';

interface CheckInRepository<T> {
  create(item: T): Promise<boolean>;

  find(organizationId: UUID, eventId: UUID, id: UUID): Promise<T>;

  findByParticipantId(organizationId: UUID, eventId: UUID, participantId: UUID): Promise<T>;

  findAll(organizationId: UUID, eventId: UUID): Promise<T[]>;

  update(domain: T): void;

  delete(item: T): Promise<boolean>;
}

export default CheckInRepository;
