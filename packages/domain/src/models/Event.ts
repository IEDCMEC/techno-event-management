import UUID from '../UUID';

class Event {
  public id: UUID;
  public organization_id: UUID;
  public name: string;

  constructor(id: UUID, organization_id: UUID, name: string) {
    this.id = id;
    this.organization_id = organization_id;
    this.name = name;
  }
}

export default Event;
