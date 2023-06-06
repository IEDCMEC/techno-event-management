import UUID from '../UUID';

class ParticipantTag {
  public id: UUID;
  public organization_id: UUID;
  public event_id: UUID;
  public participant_id: UUID;
  public tag_id: UUID;

  constructor(id: UUID, organization_id: UUID, event_id: UUID, participant_id: UUID, tag_id: UUID) {
    this.id = id;
    this.organization_id = organization_id;
    this.event_id = event_id;
    this.participant_id = participant_id;
    this.tag_id = tag_id;
  }
}

export default ParticipantTag;
