import UUID from '../UUID';

class OrganizationUser {
  public id: UUID;
  public user_id: UUID;
  public organization_id: UUID;
  public role_id: UUID;

  constructor(id: UUID, user_id: UUID, organization_id: UUID, role_id: UUID) {
    this.id = id;
    this.user_id = user_id;
    this.organization_id = organization_id;
    this.role_id = role_id;
  }
}

export default OrganizationUser;
