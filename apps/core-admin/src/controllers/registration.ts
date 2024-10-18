import { Request, Response } from 'express';

import prisma from '../utils/database';

export const orgAndEventVerification = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;

    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if (event.organizationId != orgId) {
      return res.status(404).json({ error: "Organisation and event don't match" });
    }
    return res.status(200).json({ msg: 'Event corresponds to the given org and both exists' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getFormAttributes = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;

    let ExtraAttributes = await prisma.attributes.findMany({
      where: {
        organizationId: orgId,
        eventId: eventId,
      },
      include: {
        participantAttributes: true,
      },
    });

    const defaultAttributes = [
      { name: 'First Name', colName: 'firstName', to: 'participant', value:"" },
      { name: 'Last Name', colName: 'lastName', to: 'participant', value:"" },
      { name: 'Email', colName: 'email', to: 'participant', value:"" },
      { name: 'Phone Number', colName: 'phone', to: 'participant', value:"" },
    ];

    ExtraAttributes = ExtraAttributes.map((attribute: any) => {
      return {
        name: attribute.name,
        id: attribute.id,
        to: 'participantAttributes',
        value:""
      };
    });

    const attributes = defaultAttributes.concat(ExtraAttributes)

    if (!attributes) {
      return res.status(404).json({ error: 'No attributes found' });
    }

    return res.status(200).json({ attributes });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
