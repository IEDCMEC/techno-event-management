import { v4 as UUID } from 'uuid';
import Attribute from './Attribute';
import Extra from './Extra';
import Organization from './Organization';
import Participant from './Participant';
import User from './User';

type Event = {
  id: typeof UUID;
  organizationId: typeof UUID;

  name: string;

  organization: Organization;
  volunteers?: User[];
  participants?: Participant[];
  attrbutes?: Attribute[];
  extras?: Extra[];
};

export default Event;
