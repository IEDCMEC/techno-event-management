import ParticipantExtrasCheckIn from '../models/ParticipantExtrasCheckIn';
import UUID from '../UUID';

export interface ParticipantExtrasCheckInRepository {
  create(participantExtras: ParticipantExtrasCheckIn): Promise<boolean>;

  find(id: UUID, organizationId: UUID, eventId: UUID): Promise<ParticipantExtrasCheckIn[] | null>;

  findAll(organizationId: UUID, eventId: UUID): Promise<ParticipantExtrasCheckIn | null>;

  update(participantExtras: ParticipantExtrasCheckIn): Promise<ParticipantExtrasCheckIn>;

  delete(id: string): Promise<void>;
}

export default ParticipantExtrasCheckInRepository;
