import UUID from '../UUID';
import AvailableTags from '../models/AvailableTags';

interface AvailableTagsRepository {
  create(item: AvailableTags): Promise<boolean>;

  find(organizationId: UUID, eventId: UUID): Promise<AvailableTags>;

  findAll(organizationId: UUID, eventId: UUID): Promise<AvailableTags[]>;

  update(item: AvailableTags): Promise<boolean>;

  delete(item: AvailableTags): Promise<boolean>;
}

export default AvailableTagsRepository;
