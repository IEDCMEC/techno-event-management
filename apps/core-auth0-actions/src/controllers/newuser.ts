import { Request, Response } from 'express';

import prisma from '../utils/database';

export const addNewUserToDatabaseOnRegister = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;

    if (!userId || !email) {
      return res.status(400).send('Invalid Request');
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
        id: userId,
      },
    });

    if (!newUser) {
      return res.status(500).send('Error creating user');
    }

    return res.status(200).send(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
};
