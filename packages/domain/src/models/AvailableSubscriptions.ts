import UUID from '../UUID';

class AvailableSubscriptions {
  public id: UUID;
  public name: UUID;
  public price: number;

  constructor(id: UUID, name: UUID, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

export default AvailableSubscriptions;
