import UUID from '../UUID';

class ParticipantExtrasCheckIn {
  public id: UUID;
  public organization_id: UUID;
  public event_id: UUID;
  public participant_extra_id: UUID;
  public checked_in: boolean;
  public check_in_time: Date;
  public checked_in_by: UUID;

  constructor(
    id: UUID,
    organization_id: UUID,
    event_id: UUID,
    participant_extra_id: UUID,
    checked_in: boolean,
    check_in_time: Date,
    checked_in_by: UUID,
  ) {
    this.id = id;
    this.organization_id = organization_id;
    this.event_id = event_id;
    this.participant_extra_id = participant_extra_id;
    this.checked_in = checked_in;
    this.check_in_time = check_in_time;
    this.checked_in_by = checked_in_by;
  }
}

export default ParticipantExtrasCheckIn;
