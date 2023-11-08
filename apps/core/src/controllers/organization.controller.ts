import { Request, Response } from 'express';
import { OrganizationService } from '../services/organization.service';
import { Organization } from 'common/src';

const organizationController = (organizationService: OrganizationService) => {
  return {
    addNewOrganizationController: async (req: Request, res: Response) => {
      try {
        const organizationName = req.body.organization.name;
        const user = req.body.user;

        if (!user || user === '' || user === undefined) {
          return res.status(400).json({ error: 'Authentication error' });
        }

        if (!organizationName || organizationName === '' || organizationName === undefined) {
          return res.status(400).json({ error: 'Organization name is required' });
        }

        const newOrganization: Organization = await organizationService().addNewOrganizationService(
          user,
          organizationName,
        );

        return res.status(201).json({ organization: newOrganization });
      } catch (err) {
        console.log(err);
      }
    },
  };
};
export default organizationController;
