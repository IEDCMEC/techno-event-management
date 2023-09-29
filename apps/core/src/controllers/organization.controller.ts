import { Request, Response } from 'express';

const organizationController = (organizationService: any) => {
  const addNewOrganizationController = async (req: Request, res: Response) => {
    try {
      const organizationName = req.body.organization.name;
      const user = req.body.user;

      if (!user || user === '' || user === undefined) {
        return res.status(400).json({ error: 'Authentication error' });
      }

      if (!organizationName || organizationName === '' || organizationName === undefined) {
        return res.status(400).json({ error: 'Organization name is required' });
      }

      const newOrganization = await organizationService().addNewOrganizationService(
        user,
        organizationName,
      );

      res.status(201).json({ organization: newOrganization });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addNewOrganizationController,
  };
};

export { organizationController };
