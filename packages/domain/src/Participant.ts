class Participant {
  public first_name: string
  public last_name: string
  public tag: string

  constructor(first_name: string, last_name: string, tag: string) {
    this.first_name = first_name
    this.last_name = last_name
    this.tag = tag
  }

  public getFirstName(): string {
    return this.first_name
  }

  public getLastName(): string {
    return this.last_name
  }

  public getTag(): string {
    return this.tag
  }
}

export default Participant
