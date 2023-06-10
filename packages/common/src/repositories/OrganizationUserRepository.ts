import UUID from '../UUID';
import OrganizationUser from '../models/OrganizationUser';

interface OrganizationUserRepository {
  create(item: Event): Promise<boolean>;

  find(id: UUID, organizationId: UUID, userId: UUID): Promise<OrganizationUser | null>;

  findAll(organizationId: UUID, userId: UUID): Promise<OrganizationUser[] | null>;

  update(item: OrganizationUser): Promise<OrganizationUser | boolean>;

  delete(item: OrganizationUser): Promise<boolean>;
}

export default OrganizationUserRepository;
