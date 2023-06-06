import UUID from '../UUID';

class AvailableTags {
  public id: UUID;
  public organization_id: UUID;
  public event_id: UUID;
  public tag: string;

  constructor(id: UUID, organization_id: UUID, event_id: UUID, tag: string) {
    this.id = id;
    this.organization_id = organization_id;
    this.event_id = event_id;
    this.tag = tag;
  }
}

export default AvailableTags;
