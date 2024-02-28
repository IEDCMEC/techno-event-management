import { Request, Response } from 'express';

import prisma from '../utils/database';

export const addNewExtra = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;
    const { name } = req?.body;

    const newExtra = await prisma.extras.create({
      data: {
        name,
        organizationId: orgId,
        eventId: eventId,
      },
    });

    return res.status(200).json({ newExtra });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllExtras = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;

    let extras = await prisma.extras.findMany({
      where: {
        organizationId: orgId,
        eventId: eventId,
      },
      include: {
        participantExtras: true,
        participantExtrasCheckIn: true,
      },
    });

    if (!extras) {
      return res.status(404).json({ error: 'No extras found' });
    }

    console.log(extras);

    extras = extras.map((extra: any) => {
      return {
        id: extra.id,
        name: extra.name,
        createdAt: extra.createdAt,
        numberOfParticipantsWithExtrasAssigned: extra.participantExtras.length,
        numberOfParticipantsWithExtrasCheckedIn: extra.participantExtrasCheckIn.length,
      };
    });

    return res.status(200).json({ extras });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getExtraById = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, extraId } = req?.params;

    let extra = await prisma.extras.findFirst({
      where: {
        organizationId: orgId,
        eventId,
        id: extraId,
      },
      include: {
        participantExtras: {
          include: {
            participant: true,
          },
        },
        participantExtrasCheckIn: {
          include: {
            checkedInByUser: {
              select: {
                email: true,
                firstName: true,
                lastName: true,
              },
            },
            participant: true,
          },
        },
      },
    });

    if (!extra) {
      return res.status(404).json({ error: 'No extras found' });
    }

    extra = {
      id: extra.id,
      name: extra.name,
      createdAt: extra.createdAt,
      numberOfParticipantsWithExtrasAssigned: extra.participantExtras.length,
      participantExtraDetails: extra.participantExtras?.map((participantExtra: any) => {
        return {
          id: participantExtra?.id,
          addedAt: participantExtra?.createdAt,
          firstName: participantExtra?.participant?.firstName,
          lastName: participantExtra?.participant?.lastName,
          checkedIn: {
            status: extra.participantExtrasCheckIn.some(
              (participantExtraCheckIn: any) =>
                participantExtraCheckIn.participantId === participantExtra.participantId,
            ),
            at: extra.participantExtrasCheckIn.find(
              (participantExtraCheckIn: any) =>
                participantExtraCheckIn.participantId === participantExtra.participantId,
            )?.checkedInAt,
            by: {
              email: extra.participantExtrasCheckIn.find(
                (participantExtraCheckIn: any) =>
                  participantExtraCheckIn.participantId === participantExtra.participantId,
              )?.checkedInByUser?.email,
              firstName: extra.participantExtrasCheckIn.find(
                (participantExtraCheckIn: any) =>
                  participantExtraCheckIn.participantId === participantExtra.participantId,
              )?.checkedInByUser?.firstName,
              lastName: extra.participantExtrasCheckIn.find(
                (participantExtraCheckIn: any) =>
                  participantExtraCheckIn.participantId === participantExtra.participantId,
              )?.checkedInByUser?.lastName,
            },
          },
        };
      }),
    };

    return res.status(200).json({ extra });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const checkInExtra = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;

    const { orgId, eventId, extraId } = req?.params;

    const { checkedInAt, participantId } = req?.body;

    if (!checkedInAt || !participantId) {
      return res.status(400).json({ error: 'checkedInAt and participantId is required' });
    }

    const participantHasBeenAssignedExtra = await prisma.participantExtras.findFirst({
      where: {
        participantId,
        extraId,
      },
    });

    if (!participantHasBeenAssignedExtra) {
      return res.status(400).json({ error: 'Participant has not been assigned this extra' });
    }

    const participantExtraAlreadyCheckedIn = await prisma.participantExtrasCheckIn.findFirst({
      where: {
        participantId,
        extraId,
      },
      include: {
        participant: true,
        checkedInByUser: true,
        extra: true,
      },
    });

    if (participantExtraAlreadyCheckedIn) {
      return res.status(400).json({
        error: `${participantExtraAlreadyCheckedIn?.participant?.firstName} ${participantExtraAlreadyCheckedIn?.participant?.lastName} has already been checked-in at ${participantExtraAlreadyCheckedIn.checkedInAt} by ${participantExtraAlreadyCheckedIn.checkedInByUser.email}`,
      });
    }

    let participantExtraCheckIn = await prisma.participantExtrasCheckIn.create({
      data: {
        participantId,
        extraId,
        checkedInBy: userId,
        checkedInAt,
      },
    });

    if (!participantExtraCheckIn) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    participantExtraCheckIn = await prisma.participantExtrasCheckIn.findFirst({
      where: {
        participantId,
        extraId,
      },
      include: {
        participant: true,
        extra: true,
      },
    });

    return res.status(200).json({
      participantExtraCheckIn,
      message: `${participantExtraCheckIn?.participant?.firstName} ${participantExtraCheckIn?.participant?.lastName} has been successfully checked-in for${participantExtraCheckIn.extra.name} at ${participantExtraCheckIn?.checkedInAt}`,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
