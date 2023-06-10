import UUID from '../UUID';
import AvailableAttributes from '../models/AvailableAttributes';

interface AvailableAttributesRepository {
  create(item: AvailableAttributes): Promise<boolean>;

  find(organizationId: UUID, eventId: UUID): Promise<AvailableAttributes>;

  findAll(organizationId: UUID, eventId: UUID): Promise<AvailableAttributes[]>;

  update(item: AvailableAttributes): Promise<boolean>;

  delete(item: AvailableAttributes): Promise<boolean>;
}

export default AvailableAttributesRepository;
