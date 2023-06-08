import UUID from '../UUID';

class ParticipantCheckIn {
  id: UUID;
  organization_id: UUID;
  event_id: UUID;
  participant_id: UUID;
  checked_in: boolean;
  check_in_time: Date;
  checked_in_by: UUID;

  constructor(
    id: UUID,
    organizationId: UUID,
    eventId: UUID,
    participantId: UUID,
    checkedIn: boolean,
    checkInTime: Date,
    checkedInBy: UUID,
  ) {
    this.id = id;
    this.organization_id = organizationId;
    this.event_id = eventId;
    this.participant_id = participantId;
    this.checked_in = checkedIn;
    this.check_in_time = checkInTime;
    this.checked_in_by = checkedInBy;
  }
}

export default ParticipantCheckIn;
