import UUID from '../UUID';
import OrganizationSubscription from '../models/OrganizationSubscription';

interface OrganizationSubscriptionRepository {
  create(item: OrganizationSubscription): Promise<boolean>;

  find(id: UUID, organizationId: UUID): Promise<OrganizationSubscription | null>;

  findAll(): Promise<OrganizationSubscription[] | null>;

  update(item: OrganizationSubscription): Promise<OrganizationSubscription | boolean>;

  delete(item: OrganizationSubscription): Promise<boolean>;
}

export default OrganizationSubscriptionRepository;
