import { pg } from '../pg';

const UUID = require('common').UUID;
const User = require('common').User;

const UserRepository = require('common').UserRepository;

class NodePGUserRepository implements InstanceType<typeof UserRepository> {
  public async create(user: typeof User): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'INSERT INTO "user" ( name, email, password) VALUES ($1, $2, $3) RETURNING *',
          [user.name, user.email, user.password],
        )
      ).rows[0];

      if (!result) throw new Error('User not created');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(id: typeof UUID): Promise<typeof User> {
    try {
      const result = (await pg.query('SELECT * FROM "user" WHERE id = $1', [id])).rows[0];

      if (!result) throw new Error('User not found');

      return new User(result.id, result.name, result.email, result.password);
    } catch (err: any) {
      return null as any;
    }
  }

  public async findAll(): Promise<(typeof User)[]> {
    try {
      const result = (await pg.query('SELECT * FROM "user"')).rows;

      if (!result) throw new Error('No user found');

      return result.map((row) => new User(row.id, row.name, row.email, row.password));
    } catch (err: any) {
      return null as any;
    }
  }

  public async update(user: typeof User): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'UPDATE "user" SET name = $1 AND email = $2 AND password = $3 WHERE id = $4 RETURNING *',
          [user.name, user.email, user.password, user.id],
        )
      ).rows[0];

      if (!result) throw new Error('User not updated');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async delete(id: typeof UUID): Promise<boolean> {
    try {
      const result = (await pg.query('DELETE FROM "user" WHERE id = $1 RETURNING *', [id])).rows[0];

      if (!result) throw new Error('User not deleted');

      return true;
    } catch (err: any) {
      return false;
    }
  }
}

export default NodePGUserRepository;
