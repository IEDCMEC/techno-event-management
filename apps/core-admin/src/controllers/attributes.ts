import { Request, Response } from 'express';

import prisma from '../utils/database';

export const getAllAttributes = async (req: Request, res: Response) => {
  try {
    const { orgId, eventId } = req?.params;

    let attributes = await prisma.attributes.findMany({
      where: {
        organizationId: orgId,
        eventId: eventId,
      },
      include: {
        participantAttributes: true,
      },
    });

    attributes = attributes.map((attribute: any) => {
      return {
        id: attribute.id,
        name: attribute.name,
        createdAt: attribute.createdAt,
        numberOfParticipantsWithAttributeAssigned: attribute.participantAttributes.length,
      };
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

    let attribute = await prisma.attributes.findFirst({
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

    attribute = {
      id: attribute.id,
      name: attribute.name,
      createdAt: attribute.createdAt,
      numberOfParticipantsWithAttributeAssigned: attribute.participantAttributes.length,
      participantAttributeDetails: attribute.participantAttributes.map(
        (participantAttribute: any) => {
          return {
            id: participantAttribute.id,
            value: participantAttribute.value,
            addedAt: participantAttribute.createdAt,
            firstName: participantAttribute.participant.firstName,
            lastName: participantAttribute.participant.lastName,
            email: participantAttribute.participant.email,
            phone: participantAttribute.participant.phone,
          };
        },
      ),
    };

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


// Temporary controllers

export const setPaymentStatus = async (req: Request, res: Response) => {
    try {
        const {orgId, eventId} = req?.params;
        const {participantId, paymentStatus} = req?.body;

        if (paymentStatus !== 'yes' && paymentStatus !== 'no') {
            return res.status(400).json({error: 'Invalid payment status'});
        }

        const attribute = await prisma.attributes.findFirst({
            where: {
                organizationId: orgId,
                eventId: eventId,
                name: 'Paid',
            },
        })

        if (!attribute) {
            return res.status(404).json({error: 'No attribute for payment status found'});
        }

        const participant = await prisma.participant.findFirst({
            where: {
                id: participantId,
                eventId,
                organizationId: orgId,
            },
        })

        if (!participant) {
            return res.status(404).json({error: 'Participant not found'});
        }

        const participantAttribute = await prisma.participantAttributes.findFirst({
            where: {
                participantId,
                attributeId: attribute.id,
            },
        });

        if (!participantAttribute) {
            return res.status(400).json({error: 'Payment attribute not assigned to participant'});
        }

        if (participantAttribute.value === paymentStatus) {
            return res.status(400).json({error: `Participant already payment status set as ${paymentStatus}`});
        }

        const updatedParticipantAttribute = await prisma.participantAttributes.update({
            where: {
                id: participantAttribute.id,
            },
            data: {
                value: paymentStatus,
            },
        });

        if (!updatedParticipantAttribute) {
            return res.status(500).json({error: 'Failed to update payment status'});
        }

        return res.status(200).json({updatedParticipantAttribute});

    } catch (err: any) {
        console.error(err);
        return res.status(500).json({error: 'Something went wrong'});
    }
}
