import { Request, Response } from 'express';

import prisma from '../utils/database';

export const fetchAccountDetails = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // console.log(prisma.)
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ accountDetails: user });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
export const myCredential = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;
    // console.log(userId);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // console.log(prisma.)
    const userDetails = await prisma.organizationUser.findFirst({
      where: {
        userId: userId, // assuming userId is a unique identifier
      },
    });
    // console.log(userDetails);
    if (userDetails) {
      return res.status(200).json({ data: userDetails }); // Return the details of the user
    } else {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
export const updateAccountDetails = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (userId !== req?.auth?.payload?.sub) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { firstName, lastName } = req.body;

    const accountDetails = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
      },
    });

    return res.status(200).json({ accountDetails });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
