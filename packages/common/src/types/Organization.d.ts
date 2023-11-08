import { v4 as UUID } from 'uuid';
import Subscription from '../enums/Subscription';
import User from './User';

type Organization = {
  id: typeof UUID;
  owner: typeof UUID;
  name: string;

  subscriptions?: Subscription[];
  events?: Event[];
  users?: User[];
};

export default Organization;
