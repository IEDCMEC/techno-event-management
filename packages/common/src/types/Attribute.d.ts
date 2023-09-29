import { v4 as UUID } from 'uuid';
import Organization from './Organization';

type Attribute = {
  id: typeof UUID;
  organizationId: typeof UUID;
  eventId: typeof UUID;

  name: string;
  value: string;

  organization: Organization;
  event: Event;
};

export default Attribute;
