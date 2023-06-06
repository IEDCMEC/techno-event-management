import UUID from '../UUID';

class Organization {
  public id: UUID;
  public name: string;

  constructor(id: UUID, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default Organization;
