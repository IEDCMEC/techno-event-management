import UUID from '../UUID';
import AvailableAttributes from '../models/AvailableAttributes';

interface AvailableAttributesRepository {
  create(item: AvailableAttributes): Promise<AvailableAttributes | null>;

  find(id: UUID, organizationId: UUID, eventId: UUID): Promise<AvailableAttributes | null>;

  findAll(organizationId: UUID, eventId: UUID): Promise<AvailableAttributes[] | null>;

  update(item: AvailableAttributes): Promise<AvailableAttributes | boolean>;

  delete(id: UUID, organizationId: UUID, eventId: UUID): Promise<boolean>;
}

export default AvailableAttributesRepository;
