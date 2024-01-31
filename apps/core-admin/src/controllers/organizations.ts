import { Request, Response } from 'express';

import prisma from '../utils/database';

export const createNewOrganization = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;
    const { id, name } = req.body;

    const newOrganization = await prisma.organization.create({
      data: {
        id,
        name,
        OrganizationUser: {
          create: {
            userId,
            role: 'ADMIN',
          },
        },
      },
    });

    if (!newOrganization) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json(newOrganization);
  } catch (err: any) {
    console.error(err);
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Organization with the same id already exists' });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getUsersOrganizations = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;

    const organizations = await prisma.organization.findMany({
      where: {
        OrganizationUser: {
          some: {
            userId,
          },
        },
      },
    });

    return res.status(200).json({ organizations });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
