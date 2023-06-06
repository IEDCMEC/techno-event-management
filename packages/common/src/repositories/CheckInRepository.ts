import UUID from '../UUID';
import ParticipantCheckIn from '../models/ParticipantCheckIn';

interface CheckInRepository {
  create(item: ParticipantCheckIn): Promise<boolean>;

  find(organizationId: UUID, eventId: UUID, id: UUID): Promise<ParticipantCheckIn>;

  findByParticipantId(
    organizationId: UUID,
    eventId: UUID,
    participantId: UUID,
  ): Promise<ParticipantCheckIn>;

  findAll(organizationId: UUID, eventId: UUID): Promise<ParticipantCheckIn[]>;

  update(domain: ParticipantCheckIn): void;

  delete(item: ParticipantCheckIn): Promise<boolean>;
}

export default CheckInRepository;
