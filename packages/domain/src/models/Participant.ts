import UUID from '../UUID';

class Participant {
  public id: UIDD;
  public organization_id: string;
  public event_id: string;
  public first_name: string;
  public last_name: string;
  public invite_id: string;

  constructor(
    id: UUID,
    organization_id: string,
    event_id: string,
    first_name: string,
    last_name: string,
    invite_id: string,
  ) {
    this.id = id;
    this.organization_id = organization_id;
    this.event_id = event_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.invite_id = invite_id;
  }
}

export default Participant;
