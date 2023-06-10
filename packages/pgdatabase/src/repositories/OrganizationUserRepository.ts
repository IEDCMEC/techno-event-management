import { pg } from '../pg';

const UUID = require('common').UUID;
const OrganizationUserRepository = require('common').OrganizationUserRepository;
const OrganizationUser = require('common').OrganizationUser;

class NodePGOrganizationUserRepository implements InstanceType<typeof OrganizationUserRepository> {
  public async create(organizationUser: typeof OrganizationUser): Promise<boolean> {
    try {
      const result = await pg.query(
        'INSERT INTO organization_user(id,user_id,organization_id,  role_id) VALUES($1, $2, $3, $4)',
        [
          organizationUser.id,
          organizationUser.user_id,
          organizationUser.organization_id,
          organizationUser.role_id,
        ],
      );

      if (!result) throw new Error('Cannot create organization user');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(
    id: typeof UUID,
    userId: typeof UUID,
    organizationId: typeof UUID,
  ): Promise<typeof OrganizationUser> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM organization_user WHERE id = $1 AND user_id = $2 AND organization_id = $3',
          [id, userId, organizationId],
        )
      ).rows[0];

      if (!result) throw new Error('Organization user not found');

      return new OrganizationUser(
        result.id,
        result.user_id,
        result.organization_id,
        result.role_id,
      );
    } catch (err: any) {
      return null as any;
    }
  }

  public async findAll(organizationId: typeof UUID): Promise<(typeof OrganizationUser)[]> {
    try {
      const result = (
        await pg.query('SELECT * FROM organization_user WHERE organization_id = $1', [
          organizationId,
        ])
      ).rows;

      if (!result) throw new Error('Organization users not found');

      return result.map(
        (row: any) => new OrganizationUser(row.id, row.user_id, row.organization_id, row.role_id),
      );
    } catch (err: any) {
      return null as any;
    }
  }

  public async update(participantCheckIn: typeof OrganizationUser): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(
    id: typeof UUID,
    userId: typeof UUID,
    organizationId: typeof UUID,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export default NodePGOrganizationUserRepository;
