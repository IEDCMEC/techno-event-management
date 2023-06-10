import { pg } from '../pg';

const UUID = require('common').UUID;
const Event = require('common').Event;

const AvailableRolesRepository = require('common').AvailableRolesRepository;

class NodePGAvailableRolesRepository implements InstanceType<typeof AvailableRolesRepository> {
  public async create(role: typeof AvailableRolesRepository): Promise<boolean> {
    try {
      const result = (await pg.query('INSERT INTO available_roles (name) VALUES ($1)', [role.name]))
        .rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }

  public async find(id: typeof UUID): Promise<typeof AvailableRolesRepository | null> {
    try {
      const result = (await pg.query('SELECT * FROM available_roles WHERE id = $1', [id])).rows[0];

      if (!result) return null;

      return result;
    } catch (err) {
      return null;
    }
  }

  public async findAll(): Promise<(typeof AvailableRolesRepository)[] | null> {
    try {
      const result = (await pg.query('SELECT * FROM available_roles')).rows[0];

      if (!result) return null;

      return result;
    } catch (err) {
      return null;
    }
  }

  public async update(role: typeof AvailableRolesRepository): Promise<typeof Event | boolean> {
    try {
      const result = (
        await pg.query('UPDATE available_roles SET name = $1 WHERE id = $2 ', [role.name, role.id])
      ).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }

  public async delete(id: typeof UUID): Promise<boolean> {
    try {
      const result = (await pg.query('DELETE FROM available_roles WHERE id = $1 ', [id])).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }
}

export default NodePGAvailableRolesRepository;
