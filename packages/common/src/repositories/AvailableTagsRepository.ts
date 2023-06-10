import UUID from '../UUID';
import AvailableTags from '../models/AvailableTags';

interface AvailableTagsRepository {
  create(item: AvailableTags): Promise<boolean>;

  find(id: UUID, organizationId: UUID, eventId: UUID): Promise<AvailableTags | null>;

  findAll(organizationId: UUID, eventId: UUID): Promise<AvailableTags[] | null>;

  update(item: AvailableTags): Promise<AvailableTags | boolean>;

  delete(item: AvailableTags): Promise<boolean>;
}

export default AvailableTagsRepository;
