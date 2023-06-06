import { v4 as uuidv4 } from 'uuid';

class UUID extends String {
  constructor() {
    const uuid = uuidv4();
    super(uuid);
  }
}

export default UUID;
