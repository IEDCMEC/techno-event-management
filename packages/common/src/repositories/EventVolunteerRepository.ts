import UUID from '../UUID';
import EventVolunteer from '../models/EventVolunteer';

interface EventVolunteerRepository {
  create(item: EventVolunteer): Promise<boolean>;

  find(id: UUID, organizationId: UUID, eventId: UUID): Promise<EventVolunteer | null>;

  findAll(organizationId: UUID, eventId: UUID): Promise<EventVolunteer[] | null>;

  update(item: EventVolunteer): Promise<EventVolunteer | boolean>;

  delete(item: EventVolunteer): Promise<boolean>;
}

export default EventVolunteerRepository;
