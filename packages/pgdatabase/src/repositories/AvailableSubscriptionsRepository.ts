import { pg } from '../pg';

const UUID = require('common').UUID;
const Event = require('common').Event;

const AvailableSubscriptionsRepository = require('common').AvailableSubscriptionsRepository;

class NodePGAvailableSubscriptionsRepository
  implements InstanceType<typeof AvailableSubscriptionsRepository>
{
  public async create(subscription: typeof AvailableSubscriptionsRepository): Promise<boolean> {
    try {
      const result = (
        await pg.query('INSERT INTO available_subscriptions (name, price) VALUES ($1, $2)', [
          subscription.name,
          subscription.price,
        ])
      ).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }

  public async find(id: typeof UUID): Promise<typeof AvailableSubscriptionsRepository | null> {
    try {
      const result = (await pg.query('SELECT * FROM available_subscriptions WHERE id = $1', [id]))
        .rows[0];

      if (!result) return null;

      return result;
    } catch (err) {
      return null;
    }
  }

  public async findAll(): Promise<(typeof AvailableSubscriptionsRepository)[] | null> {
    try {
      const result = (await pg.query('SELECT * FROM available_subscriptions')).rows[0];

      if (!result) return null;

      return result;
    } catch (err) {
      return null;
    }
  }

  public async update(
    subscription: typeof AvailableSubscriptionsRepository,
  ): Promise<typeof Event | boolean> {
    try {
      const result = (
        await pg.query(
          'UPDATE available_subscriptions SET name = $1 AND price = $2 WHERE id = $3',
          [subscription.name, subscription.price, subscription.id],
        )
      ).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }

  public async delete(id: typeof UUID): Promise<boolean> {
    try {
      const result = (await pg.query('DELETE FROM available_subscriptions WHERE id = $1 ', [id]))
        .rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }
}

export default NodePGAvailableSubscriptionsRepository;
