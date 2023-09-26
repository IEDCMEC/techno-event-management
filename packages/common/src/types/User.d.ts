import { v4 as UUID } from 'uuid';
import Organization from './Organization';
import Role from '../enums/Role';

type User = {
  id: typeof UUID;

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  roles: Role[];
  organizations?: Organization[];
  events?: Event[];
};

export default User;
