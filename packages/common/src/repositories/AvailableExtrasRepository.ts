import UUID from '../UUID';
import AvailableExtras from '../models/AvailableExtras';

interface AvailableExtrasRepository {
  create(item: AvailableExtras): Promise<boolean>;

  find(organizationId: UUID, eventId: UUID): Promise<AvailableExtras>;

  findAll(AvailableExtras: UUID, eventId: UUID): Promise<AvailableExtras[]>;

  update(item: AvailableExtras): Promise<boolean>;

  delete(item: AvailableExtras): Promise<boolean>;
}

export default AvailableExtrasRepository;
