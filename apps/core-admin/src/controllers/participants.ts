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
      let extrasToBeAdded: string[] = [];

      for (const key in participants[0]) {
        if (key.startsWith('_')) {
          attributesToBeAdded.push(key.split('_')[1]);
        } else if (key.startsWith('&')) {
          extrasToBeAdded.push(key.split('&')[1]);
        }
      }

      const attributesAlreadyPresent = await prisma.attributes.findMany({
        where: {
          organizationId: orgId,
          eventId,
        },
      });

      const extrasAlreadyPresent = await prisma.extras.findMany({
        where: {
          organizationId: orgId,
          eventId,
        },
      });

      const newAttributes = attributesToBeAdded.filter(
        (attribute) => !attributesAlreadyPresent.find((a: any) => a.name === attribute),
      );

      const newExtras = extrasToBeAdded.filter(
        (extra) => !extrasAlreadyPresent.find((e: any) => e.name === extra),
      );

      const newAttributesAdded = await prisma.attributes.createMany({
        data: newAttributes.map((attribute) => {
          return {
            name: attribute,
            organizationId: orgId,
            eventId,
          };
        }),
      });

      const newExtrasAdded = await prisma.extras.createMany({
        data: newExtras.map((extra) => {
          return {
            name: extra,
            organizationId: orgId,
            eventId,
          };
        }),
      });

      const attributes = await prisma.attributes.findMany({
        where: {
          organizationId: orgId,
          eventId,
        },
      });

      const extras = await prisma.extras.findMany({
        where: {
          organizationId: orgId,
          eventId,
        },
      });

      let participantsNotAdded: any[] = [];

      for (const p of participants) {
        await prisma.$transaction(async (tx: typeof prisma) => {
          const newParticipant = await tx.participant.create({
            data: {
              firstName: p.firstName,
              lastName: p.lastName,
              organizationId: orgId,
              eventId,
              email: p.email,
              phone: p.phone,
              checkInKey: p.checkInKey,

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
              participantExtras: {
                create: extras
                  .filter((extra: any) => p[`&${extra.name}`] === true)
                  .map((extra: any) => ({
                    extraId: extra.id,
                  })),
              },
            },
          });

          if (!newParticipant) {
            participantsNotAdded.push(p);
            // //console.log(`Participant ${p.firstName} ${p.lastName} not added`);
          } else {
            // //console.log(`Participant ${p.firstName} ${p.lastName} added`);
          }
        });
      }

      if (participantsNotAdded.length > 0) {
        return res.status(200).json({
          participantsNotAdded,
          success: false,
          message: 'Some participants were not added',
        });
      }

      return res
        .status(200)
        .json({ success: true, message: 'All participants added successfully' });
    } else {
      //
      // Single participant addition
      //
      const { firstName, lastName, attributes, phone, email, checkInKey } = req?.body;

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
          email,
          phone,
          checkInKey,
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
    if (err.code === 'P2002') {
      return res
        .status(400)
        .json({ error: 'An email present in CSV data already exists in the event' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const editParticipant = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, participantId } = req?.params;
    const { firstName, lastName, phone, email, checkInKey, attributes } = req?.body;

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
        phone,
        email,
        checkInKey,
      },
    });

    const awaitAttributes = attributes?.map(async (attribute: any) => {
      try {
        const participantAttribute = await prisma.participantAttributes.updateMany({
          where: {
            attributeId: attribute.id,
            participantId: participantId,
          },
          data: {
            value: attribute.value,
          },
        });
        if (participantAttribute.count === 0) {
          const newParticipantAttribute = await prisma.participantAttributes.create({
            data: {
              participantId,
              attributeId: attribute.id,
              value: attribute.value,
            },
          });
          return newParticipantAttribute;
        }
        return participantAttribute;
      } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
      }
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
        participantExtras: true,
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
        phone: participant.phone,
        email: participant.email,
        checkInKey: participant.checkInKey,
        numberOfAttributesAssigned: participant.participantAttributes.length,
        numnerOfExtrasAssigned: participant.participantExtras.length,
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
        phone: participant.phone,
        email: participant.email,
        checkInKey: participant.checkInKey,
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
        participantExtras: {
          include: {
            extra: true,
          },
        },
        participantExtrasCheckIn: {
          select: {
            checkedInAt: true,
            checkedInByUser: true,
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

    const extras = await prisma.extras.findMany({
      where: {
        organizationId: orgId,
        eventId,
      },
    });

    if (!extras) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    extras.forEach((extra: any) => {
      const existingExtra = participant?.participantExtras?.find(
        (pe: any) => pe.extraId === extra.id,
      );

      if (!existingExtra) {
        if (!participant.extras) {
          participant.extras = [];
        }

        participant.extras.push({
          id: extra.id,
          name: extra.name,
          assigned: false,
          checkedIn: false,
        });
      } else {
        if (!participant.extras) {
          participant.extras = [];
        }

        participant.extras.push({
          id: extra.id,
          name: extra.name,
          assigned: true,
          checkIn: {
            status: participant.participantExtrasCheckIn.length > 0 ? true : false,
            at:
              participant.participantExtrasCheckIn.length > 0
                ? participant.participantExtrasCheckIn[0].checkedInAt
                : null,
            by: {
              email:
                participant.participantExtrasCheckIn.length > 0
                  ? participant.participantExtrasCheckIn[0].checkedInByUser.email
                  : null,
              firstName:
                participant.participantExtrasCheckIn.length > 0
                  ? participant.participantExtrasCheckIn[0].checkedInByUser.firstName
                  : null,
              lastName:
                participant.participantExtrasCheckIn.length > 0
                  ? participant.participantExtrasCheckIn[0].checkedInByUser.lastName
                  : null,
            },
          },
        });
      }
    });

    participant = {
      id: participant.id,
      addedAt: participant.createdAt,
      firstName: participant.firstName,
      lastName: participant.lastName,
      attributes: participant.attributes,
      extras: participant.extras,
      email: participant.email,
      phone: participant.phone,
      checkInKey: participant.checkInKey,
      numberOfAttributesAssigned: participant.participantAttributes.length,
      numberOfExtrasAssigned: participant.participantExtras.length,
      numberOfExtrasCheckedIn: participant.participantExtrasCheckIn.length,
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

export const getParticipantBycheckInKey = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId, checkInKey } = req?.params;

    let participant = await prisma.participant.findFirst({
      where: {
        organizationId: orgId,
        eventId,
        checkInKey,
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
        participantExtras: {
          include: {
            extra: true,
          },
        },
        participantExtrasCheckIn: {
          select: {
            checkedInAt: true,
            checkedInByUser: true,
          },
        },
      },
    });

    if (!participant) {
      return res.status(400).json({ error: 'Participant not found' });
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

    const extras = await prisma.extras.findMany({
      where: {
        organizationId: orgId,
        eventId,
      },
    });

    if (!extras) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    extras.forEach((extra: any) => {
      const existingExtra = participant?.participantExtras?.find(
        (pe: any) => pe.extraId === extra.id,
      );

      if (!existingExtra) {
        if (!participant.extras) {
          participant.extras = [];
        }

        participant.extras = [];
        participant.extras.push({
          id: extra.id,
          name: extra.name,
          assigned: false,
          checkedIn: false,
        });

        return;
      } else {
        if (!participant.extras) {
          participant.extras = [];
        }

        participant.extras.push({
          id: extra.id,
          name: extra.name,
          assigned: true,
          checkIn: {
            status: participant.participantExtrasCheckIn.length > 0 ? true : false,
            at:
              participant.participantExtrasCheckIn.length > 0
                ? participant.participantExtrasCheckIn[0].checkedInAt
                : null,
            by: {
              email:
                participant.participantExtrasCheckIn.length > 0
                  ? participant.participantExtrasCheckIn[0].checkedInByUser.email
                  : null,
              firstName:
                participant.participantExtrasCheckIn.length > 0
                  ? participant.participantExtrasCheckIn[0].checkedInByUser.firstName
                  : null,
              lastName:
                participant.participantExtrasCheckIn.length > 0
                  ? participant.participantExtrasCheckIn[0].checkedInByUser.lastName
                  : null,
            },
          },
        });
      }
    });

    participant = {
      id: participant.id,
      addedAt: participant.createdAt,
      firstName: participant.firstName,
      lastName: participant.lastName,
      attributes: participant.attributes,
      extras: participant.extras,
      email: participant.email,
      phone: participant.phone,
      checkInKey: participant.checkInKey,
      numberOfAttributesAssigned: participant.participantAttributes.length,
      numberOfExtrasAssigned: participant.participantExtras.length,
      numberOfExtrasCheckedIn: participant.participantExtrasCheckIn.length,
      checkIn: {
        status: participant.participantCheckIn.length > 0 ? true : false,
        at:
          participant.participantCheckIn.length > 0
            ? participant.participantCheckIn[0].checkedInAt
            : null,
        by: {
          email:
            participant.participantCheckIn.length > 0
              ? participant.participantCheckIn[0].checkedInByUser.email
              : null,
          firstName:
            participant.participantCheckIn.length > 0
              ? participant.participantCheckIn[0].checkedInByUser.firstName
              : null,
          lastName:
            participant.participantCheckIn.length > 0
              ? participant.participantCheckIn[0].checkedInByUser.lastName
              : null,
        },
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

    const { orgId, eventId } = req?.params;

    const { checkedInAt, checkInKey, assignedKey } = req?.body;

    if (!checkedInAt || !checkInKey) {
      return res.status(400).json({ error: 'checkInAt and checkInKey is required' });
    }

    const participantAlreadyCheckedIn = await prisma.participant.findFirst({
      where: {
        organizationId: orgId,
        eventId,
        checkInKey,
      },
      include: {
        participantCheckIn: {
          include: {
            checkedInByUser: true,
          },
        },
      },
    });

    if (assignedKey && participantAlreadyCheckedIn) {
      const updatedParticipant = await prisma.participant.update({
        where: {
          id: participantAlreadyCheckedIn.id,
        },
        data: {
          assignedKey: assignedKey,
        },
      });
    }

    if (!participantAlreadyCheckedIn) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    if (participantAlreadyCheckedIn.participantCheckIn.length > 0) {
      return res.status(400).json({
        error: `${participantAlreadyCheckedIn?.firstName} ${participantAlreadyCheckedIn?.lastName} has already been checked-in at ${participantAlreadyCheckedIn.participantCheckIn[0].checkedInAt} by ${participantAlreadyCheckedIn.participantCheckIn[0].checkedInByUser.email}`,
      });
    }

    let participantCheckIn = await prisma.participantCheckIn.create({
      data: {
        participantId: participantAlreadyCheckedIn.id,
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
        participantId: participantAlreadyCheckedIn.id,
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

    const { orgId, eventId } = req?.params;

    const { checkInKey } = req?.body;

    if (!checkInKey) {
      return res.status(400).json({ error: 'checkInKey is required' });
    }

    const isparticipantCheckedIn = await prisma.participant.findFirst({
      where: {
        organizationId: orgId,
        eventId,
        checkInKey,
      },
      include: {
        participantCheckIn: {
          include: {
            checkedInByUser: true,
          },
        },
      },
    });

    if (isparticipantCheckedIn.participantCheckIn.length == 0) {
      return res.status(400).json({
        error: `${isparticipantCheckedIn?.firstName} ${isparticipantCheckedIn?.lastName} is not checked in`,
      });
    }

    let participantCheckOut = await prisma.participantCheckIn.delete({
      where: {
        id: isparticipantCheckedIn.participantCheckIn[0].id,
      },
    });

    if (!participantCheckOut) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({
      message: `${isparticipantCheckedIn?.firstName} ${isparticipantCheckedIn?.lastName} has been successfully checked-out`,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
