const { Role, Subscription, User, Organization } = require('common');

const pg = require('pgdatabase').pg;

const organizationService = () => {
  const addNewOrganizationService = async (user: typeof User, name: string) => {
    try {
      await pg.query('BEGIN');
      let newOrganization: typeof Organization = (
        await pg.query(`INSERT INTO organization (name) VALUES ($1) RETURNING *`, [name])
      ).rows[0];

      if (!newOrganization) {
        throw new Error('Something went wrong');
      }

      await pg.query(
        `INSERT into organization_user(user_id, organization_id, role_id) VALUES($1, $2, (SELECT id FROM role WHERE name = '${Role.OWNER}')) RETURNING *`,
        [user.id, newOrganization.id],
      );

      await pg.query(
        `INSERT into organization_subscription(organization_id, subscription_id) VALUES($1, (SELECT id FROM subscription WHERE name = '${Subscription.FREE}')) RETURNING *`,
        [newOrganization.id],
      );

      newOrganization = (
        await pg.query(
          `SELECT 
            organization.id, organization.name
        FROM 
            organization
        JOIN 
            organization_user ON organization.id = organization_user.organization_id
        JOIN
            "user" ON "user".id = organization_user.user_id
        JOIN
            organization_subscription ON organization_subscription.organization_id = organization.id
        JOIN
            subscription ON subscription.id = organization_subscription.subscription_id
        WHERE organization_user.user_id = $1 AND organization.name = $2`,
          [user.id, newOrganization.name],
        )
      ).rows[0];

      await pg.query('COMMIT');
      return newOrganization;
    } catch (err: any) {
      await pg.query('ROLLBACK');
      console.error(err);
    }
  };

  return {
    addNewOrganizationService,
  };
};

export { organizationService };
