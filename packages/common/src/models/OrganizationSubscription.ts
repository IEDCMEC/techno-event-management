import UUID from '../UUID';

class OrganizationSubscription {
  public id: UUID;
  public organization_id: UUID;
  public subscription_id: UUID;

  constructor(id: UUID, organization_id: UUID, subscription_id: UUID) {
    this.id = id;
    this.organization_id = organization_id;
    this.subscription_id = subscription_id;
  }
}

export default OrganizationSubscription;
