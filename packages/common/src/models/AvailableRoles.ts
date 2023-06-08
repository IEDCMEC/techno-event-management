import UUID from '../UUID';

class AvailableRoles {
  public id: UUID;
  public name: string;

  constructor(id: UUID, name: string) {
    this.id = id;
    this.name = name;
  }
}
export default AvailableRoles;
