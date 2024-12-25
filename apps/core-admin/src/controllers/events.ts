import { Request, Response } from 'express';

import prisma from '../utils/database';
import { count } from 'console';

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

    let events = await prisma.event.findMany({
      where: {
        organizationId: orgId,
      },
      include: {
        Participant: true,
        attributes: true,
        extras: true,
        ParticipantCheckin: true,
        address: true,
      },
    });

    events = events.map((event: any) => {
      return {
        id: event.id,
        name: event.name,
        description: event.description,
        createdAt: event.createdAt,
        addressDetails: event.address,
        startTime: event.startTime,
        endTime: event.endTime,
        type: event.type,
        isShortlisting: event.isShortlisting,
        isRegistrationClosed: event.isRegistrationClosed,
        numberOfParticipants: event.Participant.length,
        numberOfAttributes: event.attributes.length,
        numberOfExtras: event.extras.length,
        numberOfParticipantsCheckedIn: event.ParticipantCheckin.length,
      };
    });

    return res.status(200).json({ events });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getEventStats = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;
    const { orgId, eventId } = req?.params;

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

    let event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        Participant: true,
        attributes: true,
        extras: true,
        ParticipantCheckin: true,
        address: true,
      },
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if (event.venueId) {
      let address = await prisma.address.findUnique({
        where: {
          venueId: event.venueId,
        },
      });
      event = {
        id: event.id,
        name: event.name,
        description: event.description,
        createdAt: event.createdAt,
        numberOfParticipants: event.Participant.length,
        numberOfAttributes: event.attributes.length,
        numberOfExtras: event.extras.length,
        numberOfParticipantsCheckedIn: event.ParticipantCheckin.length,
        venueDetails: address,
      };

      return res.status(200).json({ event });
    }
    event = {
      id: event.id,
      name: event.name,
      description: event.description,
      createdAt: event.createdAt,
      numberOfParticipants: event.Participant.length,
      numberOfAttributes: event.attributes.length,
      numberOfExtras: event.extras.length,
      numberOfParticipantsCheckedIn: event.ParticipantCheckin.length,
    };

    return res.status(200).json({ event });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const createNewEvent = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;
    const {
      id,
      name,
      startDate,
      endDate,
      desc,
      type,
      venue,
      street,
      city,
      state,
      country,
      pincode,
      locationUrl,
    } = req.body;
    const { orgId } = req?.params;
    console.log(req.body, orgId, id);
    // return res.status(400).send({ message: 'debugging' });
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
    const newAddress = await prisma.address.create({
      data: {
        name: venue,
        street: street,
        city: city,
        state: state,
        country: country,
        pinCode: parseInt(pincode),
        locationUrl: locationUrl,
      },
    });
    if (newAddress) {
      const newEvent = await prisma.event.create({
        data: {
          name: name,
          organizationId: orgId,
          startTime: new Date(startDate),
          endTime: new Date(endDate),
          description: desc,
          type: type,
          venueId: newAddress.id,
        },
      });

      if (!newEvent) {
        return res.status(500).json({ error: 'Something went wrong' });
      }

      return res.status(200).json(newEvent);
    } else {
      return res.status(400).json({ error: 'Error creating event address' });
    }
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({ error: 'Something went wrong' });
  }
};
