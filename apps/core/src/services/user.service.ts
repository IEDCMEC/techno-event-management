const { User, Organization } = require('common');

const { pg } = require('pgdatabase');

type UserService = () => {
  getUserOrganizationsService: (user: typeof User) => Promise<(typeof Organization)[]>;
};

const userService: UserService = () => {
  return {
    getUserOrganizationsService: async (user: typeof User): Promise<(typeof Organization)[]> => {
      try {
        let organizations: (typeof Organization)[] = (
          await pg.query(
            `
                        SELECT 
                            organization_id as id, organization.name as name, role.name as role
                        FROM 
                            organization_user JOIN organization
                        ON
                            organization_user.organization_id = organization.id
                        JOIN
                            role
                        ON
                            organization_user.role_id = role.id
                        WHERE
                            organization_user.user_id = $1`,
            [user.id],
          )
        ).rows;

        // for (let i = 0; i < organizations.length; i++) {
        //   const organization = organizations[i];

        //   const events = (
        //     await pg.query(`SELECT * FROM event WHERE organization_id = $1`, [organization.id])
        //   ).rows;

        //   organization.events = events;
        //   organizations[i] = organization;
        // }

        return organizations;
      } catch (err: any) {
        console.error(err);
        throw err;
      }
    },
  };
};

export { UserService };
export default userService;
