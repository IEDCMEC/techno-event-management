import { Request, Response } from 'express';

import prisma from '../utils/database';

/**
 * Get user's permissions under an organization. This gets executed when the user logs in and Auth0 action for log in is
 * triggered.
 * @param req
 * @param res
 */
export const getUserPermissions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send('Invalid Request');
    }

    const userPermissions = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
      select: {
        id: true,
        OrganizationUser: {
          select: {
            role: true,
            organizationId: true,
          },
        },
      },
    });

    if (!userPermissions) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json({ userPermissions });
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
};
