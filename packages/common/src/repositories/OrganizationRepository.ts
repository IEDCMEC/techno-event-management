import UUID from '../UUID';
import Organization from '../models/Organization';

interface OrganizationRepository {
  create(item: Event): Promise<boolean>;

  find(organizationId: UUID): Promise<Organization | null>;

  findAll(): Promise<Organization[] | null>;

  update(item: Organization): Promise<Organization | boolean>;

  delete(item: Organization): Promise<boolean>;
}

export default OrganizationRepository;
