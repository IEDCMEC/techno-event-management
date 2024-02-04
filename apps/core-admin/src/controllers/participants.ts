import { Request, Response } from 'express';

import prisma from '../utils/database';

export const addNewParticipant = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;
    const { firstName, lastName } = req?.body;

    const newParticipant = await prisma.participant.create({
      data: {
        firstName,
        lastName,
        organizationId: orgId,
        eventId,
      },
    });

    if (!newParticipant) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ newParticipant });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllParticipants = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;
    const participants = await prisma.participant.findMany({
      where: {
        organizationId: orgId,
        eventId,
      },
    });

    if (!participants) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ participants });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllParticipantsCheckInDetails = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;

    const participantsCheckIn = await prisma.participant.findMany({
      where: {
        organizationId: orgId,
        eventId,
      },
      include: {
        participantCheckIn: {
          select: {
            checkedInAt: true,
            checkedInByUser: true,
          },
        },
      },
    });

    if (!participantsCheckIn) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ participantsCheckIn });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getParticipantById = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, participantId } = req?.params;
    const participant = await prisma.participant.findUnique({
      where: {
        id: participantId,
      },
      include: {
        participantCheckIn: {
          select: {
            checkedInAt: true,
            checkedInByUser: true,
          },
        },
        participantAttributes: true,
      },
    });

    if (!participant) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ participant });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getParticipantAttributes = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, participantId } = req?.params;
    const participantAttributes = await prisma.participantAttributes.findMany({
      where: {
        participantId,
      },
      include: {
        participant: true,
        attribute: true,
      },
    });

    if (!participantAttributes) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ participantAttributes });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const setParticipantAttribute = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, participantId } = req?.params;
    const { attributeId, value } = req?.body;

    const participantAttribute = await prisma.participantAttributes.create({
      data: {
        participantId,
        attributeId,
        value,
      },
    });

    if (!participantAttribute) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ participantAttribute });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const checkInParticipant = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;

    const { orgId, eventId, participantId } = req?.params;

    const { checkedInAt } = req?.body;

    const participantAlreadyCheckedIn = await prisma.participantCheckIn.findFirst({
      where: {
        participantId,
        organizationId: orgId,
        eventId,
      },
    });
    const participant = await prisma.participant.findUnique({
      where: {
        id: participantId,
      },
    });

    if (participantAlreadyCheckedIn) {
      return res
        .status(400)
        .json({ error: participant.firstName + participant.lastName + ' already checked in' });
    }

    const participantCheckIn = await prisma.participantCheckIn.create({
      data: {
        participantId,
        organizationId: orgId,
        eventId,
        checkedInBy: userId,
        checkedInAt,
      },
    });

    if (!participantCheckIn) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ participantCheckIn, participant });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const checkOutParticipant = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;

    const { orgId, eventId, participantId } = req?.params;

    const { checkedOutAt } = req?.body;

    const participantAlreadyCheckedOut = await prisma.participantCheckIn.findFirst({
      where: {
        participantId,
        organizationId: orgId,
        eventId,
      },
    });

    if (!participantAlreadyCheckedOut) {
      return res.status(400).json({ error: 'Participant already checked out' });
    }

    const participantCheckOut = await prisma.participantCheckIn.delete({
      where: {
        participantId,
      },
    });

    if (!participantCheckOut) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ participantCheckOut });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
