import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { Organization } from 'common/src';

const userController = (userService: UserService) => {
  return {
    getUserOrganizationsController: async (req: Request, res: Response) => {
      try {
        const user = req.body.user;

        if (!user || user === '' || user === undefined) {
          return res.status(400).json({ error: 'Authentication error' });
        }

        const organizations: Organization[] = await userService().getUserOrganizationsService(user);

        return res.status(200).json({ organizations: organizations });
      } catch (err) {
        console.log(err);
      }
    },
  };
};
export default userController;
