import { Request, Response } from 'express';

import prisma from '../utils/database';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;
    const orgId = req?.params?.orgId;

    const organization = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    if (organization?.organizationUsers?.some((ou: any) => ou.userId === userId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const events = await prisma.event.findMany({
      where: {
        organizationId: orgId,
      },
    });

    return res.status(200).json({ events });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const createNewEvent = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;
    const { id, name } = req.body;
    const { orgId } = req?.params;

    const organization = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    if (organization?.organizationUsers?.some((ou: any) => ou.userId === userId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const newEvent = await prisma.event.create({
      data: {
        name,
        organizationId: orgId,
      },
    });

    if (!newEvent) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json(newEvent);
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({ error: 'Something went wrong' });
  }
};
