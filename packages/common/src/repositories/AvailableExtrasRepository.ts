import UUID from '../UUID';
import AvailableExtras from '../models/AvailableExtras';

interface AvailableExtrasRepository {
  create(item: AvailableExtras): Promise<boolean>;

  find(id: UUID, organizationId: UUID, eventId: UUID): Promise<AvailableExtras | null>;

  findAll(AvailableExtras: UUID, eventId: UUID): Promise<AvailableExtras[] | null>;

  update(item: AvailableExtras): Promise<AvailableExtras | boolean>;

  delete(item: AvailableExtras): Promise<boolean>;
}

export default AvailableExtrasRepository;
