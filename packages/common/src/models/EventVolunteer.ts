import UUID from '../UUID';

class EventVounteer {
  public id: UUID;
  public organization_id: UUID;
  public event_id: UUID;
  public user_id: UUID;
  public organization_user_id: UUID;

  constructor(
    id: UUID,
    organization_id: UUID,
    event_id: UUID,
    user_id: UUID,
    organization_user_id: UUID,
  ) {
    this.id = id;
    this.organization_id = organization_id;
    this.event_id = event_id;
    this.user_id = user_id;
    this.organization_user_id = organization_user_id;
  }
}

export default EventVounteer;
