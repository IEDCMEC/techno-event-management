import { pg } from '../pg';

const UUID = require('common').UUID;
const Organization = require('common').Organization;

const OrganizationRepository = require('common').OrganizationRepository;

class NodePGOrganizationRepository implements InstanceType<typeof OrganizationRepository> {
  public async create(organization: typeof Organization): Promise<boolean> {
    try {
      const result = (
        await pg.query('INSERT INTO organization ( name) VALUES ($1) RETURNING *', [
          organization.name,
        ])
      ).rows[0];

      if (!result) throw new Error('Organization not created');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(id: typeof UUID): Promise<typeof Organization> {
    try {
      const result = (await pg.query('SELECT * FROM organization WHERE id = $1', [id])).rows[0];

      if (!result) throw new Error('Organization not found');

      return new Organization(result.id, result.name);
    } catch (err: any) {
      return null as any;
    }
  }

  public async findAll(): Promise<(typeof Organization)[]> {
    try {
      const result = (await pg.query('SELECT * FROM organization')).rows;

      if (!result) throw new Error('No organizations found');

      return result.map((row) => new Organization(row.id, row.name));
    } catch (err: any) {
      return null as any;
    }
  }

  public async update(organization: typeof Organization): Promise<boolean> {
    try {
      const result = (
        await pg.query('UPDATE organization SET name = $1 WHERE id = $2 RETURNING *', [
          organization.name,
          organization.id,
        ])
      ).rows[0];

      if (!result) throw new Error('Organization not updated');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async delete(id: typeof UUID): Promise<boolean> {
    try {
      const result = (await pg.query('DELETE FROM organization WHERE id = $1 RETURNING *', [id]))
        .rows[0];

      if (!result) throw new Error('Organization not deleted');

      return true;
    } catch (err: any) {
      return false;
    }
  }
}

export default NodePGOrganizationRepository;
