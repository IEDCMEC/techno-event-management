import UUID from '../UUID';

interface CheckInRepository<any> {
  create(domain: any): void;

  find(organizationId: UUID, eventId: UUID, id: UUID): Promise<any>;

  findAll(organizationId: UUID, eventId: UUID): Promise<any[]>;

  update(domain: any): void;

  delete(organizationId: UUID, eventId: UUID, id: UUID): Promise<boolean>;

  checkInParticipant(organizationId: UUID, eventId: UUID, participantId: UUID, checkedInBy: UUID): Promise<boolean>;
}

export default CheckInRepository;
