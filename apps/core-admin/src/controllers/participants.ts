import { Request, Response } from 'express';

import prisma from '../utils/database';

export const addNewParticipant = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;
    const { isBulk } = req?.query;

    if (isBulk === 'true') {
      //
      // Bulk participant addition
      //

      const { participants } = req?.body;

      if (!participants || participants.length === 0) {
        return res.status(400).json({ error: 'No participants provided' });
      }

      let attributesToBeAdded: string[] = [];

      for (const key in participants[0]) {
        if (key.startsWith('_')) {
          attributesToBeAdded.push(key.split('_')[1]);
        }
      }

      await prisma.$transaction(async (tx: typeof prisma) => {
        const attributesAlreadyPresent = await tx.attributes.findMany({
          where: {
            organizationId: orgId,
            eventId,
          },
        });

        const newAttributes = attributesToBeAdded.filter(
          (attribute) => !attributesAlreadyPresent.find((a: any) => a.name === attribute),
        );

        const newAttributesAdded = await tx.attributes.createMany({
          data: newAttributes.map((attribute) => {
            return {
              name: attribute,
              organizationId: orgId,
              eventId,
            };
          }),
        });

        const attributes = await tx.attributes.findMany({
          where: {
            organizationId: orgId,
            eventId,
          },
        });

        for (const p of participants) {
          const newParticipant = await tx.participant.create({
            data: {
              firstName: p.firstName,
              lastName: p.lastName,
              organizationId: orgId,
              eventId,
              participantAttributes: {
                create: attributes
                  .map((attribute: any) => ({
                    attributeId: attribute.id,
                    value: p[`_${attribute.name}`],
                  }))
                  .filter(
                    (attribute: any) => attribute.value !== undefined && attribute.value !== null,
                  ),
              },
            },
          });

          if (!newParticipant) {
            console.error('Error adding participant in bulk');
            return res.status(500).json({ error: 'Something went wrong' });
          }
        }

        return res.status(200).json({ success: true });
      });
    } else {
      //
      // Single participant addition
      //
      const { firstName, lastName, attributes } = req?.body;

      attributes.filter((attribute: any) => {
        if (!attribute.value) {
          return res.status(400).json({ error: 'All attributes must have a value' });
        }
      });

      const newParticipant = await prisma.participant.create({
        data: {
          firstName,
          lastName,
          organizationId: orgId,
          eventId,
          participantAttributes: {
            create: attributes.map((attribute: any) => {
              return {
                attributeId: attribute.id,
                value: attribute.value,
              };
            }),
          },
        },
      });

      if (!newParticipant) {
        return res.status(500).json({ error: 'Something went wrong' });
      }

      return res.status(200).json({ newParticipant });
    }
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const editParticipant = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, participantId } = req?.params;
    const { firstName, lastName } = req?.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    const updatedParticipant = await prisma.participant.update({
      where: {
        id: participantId,
      },
      data: {
        firstName,
        lastName,
      },
    });

    if (!updatedParticipant) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ updatedParticipant });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllParticipants = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;
    let participants = await prisma.participant.findMany({
      where: {
        organizationId: orgId,
        eventId,
      },
      include: {
        participantAttributes: true,
        participantCheckIn: true,
      },
    });

    if (!participants) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    participants = participants.map((participant: any) => {
      return {
        id: participant.id,
        addedAt: participant.createdAt,
        firstName: participant.firstName,
        lastName: participant.lastName,
        numberOfAttributesAssigned: participant.participantAttributes.length,
        checkedIn: participant.participantCheckIn.length > 0 ? true : false,
      };
    });

    return res.status(200).json({ participants });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllParticipantsCheckInDetails = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;

    let participants = await prisma.participant.findMany({
      where: {
        organizationId: orgId,
        eventId,
      },
      include: {
        participantCheckIn: {
          select: {
            id: true,
            checkedInAt: true,
            checkedInByUser: true,
          },
        },
      },
    });

    if (!participants) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    participants = participants.map((participant: any) => {
      return {
        id: participant.participantCheckIn.id ? participant.participantCheckIn.id : participant.id,
        participantId: participant.id,
        firstName: participant.firstName,
        lastName: participant.lastName,
        checkIn: {
          status: participant.participantCheckIn.length > 0 ? true : false,
          checkedInAt:
            participant.participantCheckIn.length > 0
              ? participant.participantCheckIn[0].checkedInAt
              : null,
          checkedInByFirstName:
            participant.participantCheckIn.length > 0
              ? participant.participantCheckIn[0].checkedInByUser.firstName
              : null,
          checkedInByLastName:
            participant.participantCheckIn.length > 0
              ? participant.participantCheckIn[0].checkedInByUser.lastName
              : null,
          checkedInByEmail:
            participant.participantCheckIn.length > 0
              ? participant.participantCheckIn[0].checkedInByUser.email
              : null,
        },
      };
    });

    return res.status(200).json({ participantsCheckIn: participants });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getParticipantById = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, participantId } = req?.params;

    let participant = await prisma.participant.findUnique({
      where: {
        id: participantId,
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
        participantAttributes: {
          include: {
            attribute: true,
          },
        },
      },
    });

    if (!participant) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    const attributes = await prisma.attributes.findMany({
      where: {
        organizationId: orgId,
        eventId,
      },
    });

    if (!attributes) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    attributes.forEach((attribute: any) => {
      const existingAttribute = participant?.participantAttributes?.find(
        (pa: any) => pa.attributeId === attribute.id,
      );

      if (!existingAttribute) {
        if (!participant.attributes) {
          participant.attributes = [];
        }

        participant.attributes.push({
          id: attribute.id,
          name: attribute.name,
          value: null,
        });
      } else {
        if (!participant.attributes) {
          participant.attributes = [];
        }

        participant.attributes.push({
          id: attribute.id,
          name: attribute.name,
          value: existingAttribute.value,
        });
      }
    });

    participant = {
      id: participant.id,
      addedAt: participant.createdAt,
      firstName: participant.firstName,
      lastName: participant.lastName,
      attributes: participant.attributes,
      numberOfAttributesAssigned: participant.participantAttributes.length,
      checkIn: {
        status: participant.participantCheckIn.length > 0 ? true : false,
        checkedInAt:
          participant.participantCheckIn.length > 0
            ? participant.participantCheckIn[0].checkedInAt
            : null,
        checkedInByFirstName:
          participant.participantCheckIn.length > 0
            ? participant.participantCheckIn[0].checkedInByUser.firstName
            : null,
        checkedInByLastName:
          participant.participantCheckIn.length > 0
            ? participant.participantCheckIn[0].checkedInByUser.lastName
            : null,
        checkedInByEmail:
          participant.participantCheckIn.length > 0
            ? participant.participantCheckIn[0].checkedInByUser.email
            : null,
      },
    };

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

    const participantAttributeExists = await prisma.participantAttributes.findFirst({
      where: {
        participantId,
        attributeId,
      },
    });

    if (participantAttributeExists) {
      const participantAttribute = await prisma.participantAttributes.update({
        where: {
          id: participantAttributeExists.id,
        },
        data: {
          value,
        },
      });

      if (!participantAttribute) {
        return res.status(500).json({ error: 'Something went wrong' });
      }

      return res.status(200).json({ participantAttribute });
    } else {
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
    }
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const updateParticipantAttribute = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, participantId, attributeId } = req?.params;
    const { value } = req?.body;

    const participantAttribute = await prisma.participantAttributes.update({
      where: {
        participantId_attributeId: {
          participantId,
          attributeId,
        },
      },
      data: {
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

    if (!checkedInAt) {
      return res.status(400).json({ error: 'checkedInAt is required' });
    }

    const participantAlreadyCheckedIn = await prisma.participantCheckIn.findFirst({
      where: {
        participantId,
        organizationId: orgId,
        eventId,
      },
      include: {
        participant: true,
        checkedInByUser: true,
      },
    });

    if (participantAlreadyCheckedIn) {
      return res.status(400).json({
        error: `${participantAlreadyCheckedIn?.participant?.firstName} ${participantAlreadyCheckedIn?.participant?.lastName} has already been checked-in at ${participantAlreadyCheckedIn.checkedInAt} by ${participantAlreadyCheckedIn.checkedInByUser.email}`,
      });
    }

    let participantCheckIn = await prisma.participantCheckIn.create({
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

    participantCheckIn = await prisma.participantCheckIn.findFirst({
      where: {
        participantId,
        organizationId: orgId,
        eventId,
      },
      include: {
        participant: true,
      },
    });

    return res.status(200).json({
      participantCheckIn,
      message: `${participantCheckIn?.participant?.firstName} ${participantCheckIn?.participant?.lastName} has been successfully checked-in at ${participantCheckIn?.checkedInAt}`,
    });
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
