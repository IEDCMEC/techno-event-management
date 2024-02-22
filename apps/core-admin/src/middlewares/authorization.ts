import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

const validateUser = async (userId: any, organizationId: any) => {
  if (!userId) {
    console.error('User ID not found in the payload');
    throw new Error('Internal Server Error');
  }

  if (!organizationId) {
    console.error('Organization ID not found in the payload');
    throw new Error('Internal Server Error');
  }

  const organizationUser = await prisma.organizationUser.findFirst({
    where: {
      userId: userId,
      organizationId: organizationId,
    },
  });

  if (!organizationUser) {
    throw new Error('Forbidden');
  }

  return organizationUser;
};

export const validateOrganizationUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req?.auth?.payload?.sub;
  const orgId = req?.params?.orgId;
  try {
    await validateUser(userId, orgId);
    next();
  } catch (err: any) {
    console.error(err);
    return res.status(403).json({ error: err.message });
  }
};
export const validateOrganizationAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req?.auth?.payload?.sub;
  const orgId = req?.params?.orgId;
  try {
    const organizationUser = await validateUser(userId, orgId);
    if (organizationUser.role !== 'ADMIN') {
      throw new Error('Forbidden');
    }
    next();
  } catch (err: any) {
    console.error(err);
    return res.status(403).json({ error: err.message });
  }
};
