import UUID from '../UUID';
import Event from '../models/Event';

interface EventRepository {
  create(item: Event): Promise<boolean>;

  find(id: UUID, organizationId: UUID): Promise<Event | null>;

  findAll(organizationId: UUID): Promise<Event[] | null>;

  update(item: Event): Promise<Event | boolean>;

  delete(item: Event): Promise<boolean>;
}

export default EventRepository;
