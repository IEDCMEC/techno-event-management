import { Request, Response } from 'express';

import prisma from '../utils/database';

export const getAllAttributes = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;

    const attributes = await prisma.attributes.findMany({
      where: {
        organizationId: orgId,
        eventId: eventId,
      },
    });

    if (!attributes) {
      return res.status(404).json({ error: 'No attributes found' });
    }

    return res.status(200).json({ attributes });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAttributeById = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, attributeId } = req?.params;

    const attribute = await prisma.attributes.findFirst({
      where: {
        organizationId: orgId,
        eventId,
        id: attributeId,
      },
      include: {
        participantAttributes: {
          include: {
            participant: true,
          },
        },
      },
    });

    if (!attribute) {
      return res.status(404).json({ error: 'No attributes found' });
    }

    return res.status(200).json({ attribute });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const editAttribute = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, attributeId } = req?.params;
    const { name } = req?.body;

    if (!name) return res.status(400).json({ error: 'Name is required' });

    const updatedAttribute = await prisma.attributes.update({
      where: {
        id: attributeId,
      },
      data: {
        name,
      },
    });

    return res.status(200).json({ updatedAttribute });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const addNewAttribute = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;
    const { name } = req?.body;

    const newAttribute = await prisma.attributes.create({
      data: {
        name,
        organizationId: orgId,
        eventId: eventId,
      },
    });

    return res.status(200).json({ newAttribute });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAttributeParticipants = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, attributeId } = req?.params;

    const participants = await prisma.participant.findMany({
      where: {
        eventId,
        organizationId: orgId,
      },
      include: {
        participantAttributes: {
          where: {
            attributeId,
          },
        },
      },
    });

    return res.status(200).json({ participants });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
