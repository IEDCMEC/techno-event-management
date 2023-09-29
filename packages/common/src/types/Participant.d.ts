import { v4 as UUID } from 'uuid';
import Attribute from './Attribute';
import Extra from './Extra';
import Organization from './Organization';

type Participant = {
  id: typeof UUID;
  organizationId: typeof UUID;
  eventId: typeof UUID;

  firstName: string;
  lastName: string;

  organization: Organization;
  event: Event;

  attributes?: Attribute[];
  extras?: Extra[];
};

export default Participant;
