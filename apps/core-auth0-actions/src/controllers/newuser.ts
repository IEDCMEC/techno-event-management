import { Request, Response } from 'express';

import prisma from '../utils/database';

/**
 * Add new user to database on register. This is a must because Auth0 has no connection with our database. Not
 * performing this action will result in a mismatch between the user in Auth0 and the user in our database.
 * @param req
 * @param res
 */
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

    console.log(`User ${userId} with email ${email} created`);

    return res.status(200).send(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
};
