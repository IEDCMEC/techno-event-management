import { v4 as UUID } from 'uuid';
import Organization from './Organization';
import User from './User';

type Extra = {
  id: typeof UUID;
  organizationId: typeof UUID;
  eventId: typeof UUID;

  name: string;
  checkedIn: boolean;
  checkInTime: Date;
  checkedInBy: User;

  organization: Organization;
  event: Event;
};

export default Extra;
