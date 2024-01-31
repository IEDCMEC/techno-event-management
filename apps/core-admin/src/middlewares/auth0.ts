import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { auth, claimCheck, InsufficientScopeError } from 'express-oauth2-jwt-bearer';

dotenv.config();

export const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

export const checkRequiredPermissions = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissionCheck = claimCheck((payload) => {
      const permissions = payload.permissions as string[];

      const hasPermissions = requiredPermissions.every((requiredPermission) =>
        permissions.includes(requiredPermission),
      );

      if (!hasPermissions) {
        throw new InsufficientScopeError();
      }

      return hasPermissions;
    });

    permissionCheck(req, res, next);
  };
};

export const decodeUserInfo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.auth?.payload?.sub;

    if (!userId) {
      console.error('User ID not found in the payload');
      return res.status(500).send('Internal Server Error');
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};
