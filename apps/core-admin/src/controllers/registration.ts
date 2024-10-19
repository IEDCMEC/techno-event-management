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

export const addFormResponse = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;
    const data = req?.body;

    const defaultKeys = ['firstName', 'lastName', 'email', 'phone'];
    const defaultData: { [key: string]: string } = {};
    const attrData: { attributeId: string; value: string }[] = [];

    for (const key in data) {
      if (defaultKeys.includes(key)) {
        defaultData[key] = data[key];
      } else {
        attrData.push({
          attributeId: key,
          value: data[key],
        });
      }
    }

    const newRegistrant = await prisma.registrant.create({
      data: {
        firstName: defaultData['firstName'],
        lastName: defaultData['lastName'] || null,
        email: defaultData['email'],
        phone: defaultData['phone'] || null,
        eventId: eventId,
        organizationId: orgId,
        registrantAttributes: {
          create: attrData,
        },
      },
    });

    return res.status(200).json({ newRegistrant });
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
      { name: 'First Name', id: 'firstName' },
      { name: 'Last Name', id: 'lastName' },
      { name: 'Email', id: 'email' },
      { name: 'Phone Number', id: 'phone' },
    ];

    ExtraAttributes = ExtraAttributes.map((attribute: any) => {
      return {
        name: attribute.name,
        id: attribute.id,
      };
    });

    const attributes = defaultAttributes.concat(ExtraAttributes);

    if (!attributes) {
      return res.status(404).json({ error: 'No attributes found' });
    }

    return res.status(200).json({ attributes });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
