import UUID from '../UUID';

class ParticipantAttribute {
  public id: UUID;
  public organization_id: UUID;
  public event_id: UUID;
  public attribute_id: UUID;
  public participant_id: UUID;
  public value: string;

  constructor(
    id: UUID,
    organization_id: UUID,
    event_id: UUID,
    attribute_id: UUID,
    participant_id: UUID,
    value: string,
  ) {
    this.id = id;
    this.organization_id = organization_id;
    this.event_id = event_id;
    this.attribute_id = attribute_id;
    this.participant_id = participant_id;
    this.value = value;
  }
}

export default ParticipantAttribute;
