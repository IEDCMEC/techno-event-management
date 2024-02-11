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

export const getOrganizationMembers = async (req: Request, res: Response) => {
  try {
    const organizationId = req.params.orgId;

    const organizationUsers = await prisma.organizationUser.findMany({
      where: {
        organizationId,
      },
    });
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: organizationUsers.map((ou: { userId: any }) => ou.userId),
        },
      },
    });

    return res.status(200).json({ organizationUsers, users });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const addOrganizationMember = async (req: Request, res: Response) => {
  try {
    const organizationId = req.params.orgId;

    const { email, role } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user.id;

    const organizationUserExists = await prisma.organizationUser.findFirst({
      where: {
        organizationId,
        userId,
      },
    });

    if (organizationUserExists) {
      return res.status(400).json({ error: 'User is already a member of this organization' });
    }

    const newOrganizationUser = await prisma.organizationUser.create({
      data: {
        organizationId,
        userId,
        role,
      },
    });

    if (!newOrganizationUser) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ newOrganizationUser });
  } catch (err: any) {
    console.error(err);
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'User is already a member of this organization' });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
