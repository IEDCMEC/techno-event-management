import UUID from '../UUID';
import Event from '../models/Event';

interface EventRepository {
  create(item: Event): Promise<boolean>;

  find(organizationId: UUID): Promise<Event>;

  findAll(organizationId: UUID): Promise<Event[]>;

  update(item: Event): Promise<boolean>;

  delete(item: Event): Promise<boolean>;
}

export default EventRepository;
