import UUID from '../UUID';

class ParticipantExtras {
  public id: UUID;
  public organization_id: UUID;
  public event_id: UUID;
  public extra_id: UUID;
  public participant_id: UUID;

  constructor(
    id: UUID,
    organization_id: UUID,
    event_id: UUID,
    extra_id: UUID,
    participant_id: UUID,
  ) {
    this.id = id;
    this.organization_id = organization_id;
    this.event_id = event_id;
    this.extra_id = extra_id;
    this.participant_id = participant_id;
  }
}

export default ParticipantExtras;
