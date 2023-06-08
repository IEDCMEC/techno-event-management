import UUID from '../UUID';

class ParticipantCheckIn {
  id: UUID;
  organizationId: UUID;
  eventId: UUID;
  participantId: UUID;
  checkedIn: boolean;
  checkInTime: Date;
  checkedInBy: UUID;

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
    this.organizationId = organizationId;
    this.eventId = eventId;
    this.participantId = participantId;
    this.checkedIn = checkedIn;
    this.checkInTime = checkInTime;
    this.checkedInBy = checkedInBy;
  }
}

export default ParticipantCheckIn;
