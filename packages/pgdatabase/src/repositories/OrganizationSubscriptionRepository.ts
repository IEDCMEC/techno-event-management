import { pg } from '../pg';

const UUID = require('common').UUID;
const OrganizationSubscription = require('common').OrganizationSubscription;

const OrganizationSubscriptionRepository = require('common').OrganizationSubscriptionRepository;

class NodePGOrganizationSubscriptionRepository
  implements InstanceType<typeof OrganizationSubscriptionRepository>
{
  public async create(organizationSubscription: typeof OrganizationSubscription): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'INSERT INTO organization_subscription (organization_id, subscription_id) VALUES ($1, $2) RETURNING *',
          [organizationSubscription.organizationId, organizationSubscription.subscriptionId],
        )
      ).rows[0];

      if (!result) throw new Error('Organization subscription not created');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async find(
    id: typeof UUID,
    organizationId: typeof UUID,
  ): Promise<typeof OrganizationSubscription> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM organization_subscription WHERE id = $1 AND organization_id = $2',
          [id, organizationId],
        )
      ).rows[0];

      if (!result) throw new Error('Organization subscription not found');

      return new OrganizationSubscription(
        result.id,
        result.organization_id,
        result.subscription_id,
      );
    } catch (err: any) {
      return null as any;
    }
  }

  public async findAll(): Promise<(typeof OrganizationSubscription)[]> {
    try {
      const result = (await pg.query('SELECT * FROM organization_subscription')).rows;

      if (!result) throw new Error('No organization subscriptions found');

      return result.map(
        (row) => new OrganizationSubscription(row.id, row.organization_id, row.subscription_id),
      );
    } catch (err: any) {
      return null as any;
    }
  }

  public async update(organizationSubscription: typeof OrganizationSubscription): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'UPDATE organization_subscription SET organization_id = $1 AND subscription_id = $2 WHERE id = $3 RETURNING *',
          [
            organizationSubscription.organization_id,
            organizationSubscription.subscription_id,
            organizationSubscription.id,
          ],
        )
      ).rows[0];

      if (!result) throw new Error('Organization subscription not updated');

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async delete(id: typeof UUID, organizationId: typeof UUID): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'DELETE FROM organization_subscription WHERE id = $1 AND organization_id = $2 RETURNING *',
          [id],
        )
      ).rows[0];

      if (!result) throw new Error('Organization subscription not deleted');

      return true;
    } catch (err: any) {
      return false;
    }
  }
}

export default NodePGOrganizationSubscriptionRepository;
