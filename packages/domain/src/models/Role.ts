import UUID from '../UUID';

class Role {
  public id: UUID;
  public name: string;

  constructor(id: UUID, name: string) {
    this.id = id;
    this.name = name;
  }
}
export default Role;
