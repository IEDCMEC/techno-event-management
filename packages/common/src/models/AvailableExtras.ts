import UUID from '../UUID';

class AvailableExtras {
  public id: UUID;
  public organization_id: UUID;
  public event_id: UUID;
  public name: string;

  constructor(id: UUID, organization_id: UUID, event_id: UUID, name: string) {
    this.id = id;
    this.organization_id = organization_id;
    this.event_id = event_id;
    this.name = name;
  }
}

export default AvailableExtras;
