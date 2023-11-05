import { Request, Response } from 'express';
import { AttributeService } from '../services/attribute.service';

const attributeController = (attributeService: AttributeService) => {
  return {
    addNewAttributeController: async (req: Request, res: Response) => {
      try {
        const organizationId = req?.params?.organizationId;
        const eventId = req?.params?.eventId;
        const name = req?.body?.attribute?.name;

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        if (!eventId || eventId === '' || eventId === undefined) {
          return res.status(400).json({ error: 'Event ID is required' });
        }

        if (!name || name === '' || name === undefined) {
          return res.status(400).json({ error: 'Attribute name is required' });
        }

        const newAttribute = await attributeService().addNewAttributeService(
          organizationId,
          eventId,
          name,
        );

        return res.status(201).json({ attribute: newAttribute });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    },
    getParticipantsAllAttributesController: async (req: Request, res: Response) => {
      try {
        const organizationId = req?.params?.organizationId;
        const eventId = req?.params?.eventId;
        const participantId = req?.params?.participantId;

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        if (!eventId || eventId === '' || eventId === undefined) {
          return res.status(400).json({ error: 'Event ID is required' });
        }

        if (!participantId || participantId === '' || participantId === undefined) {
          return res.status(400).json({ error: 'Participant ID is required' });
        }

        const participantAttributes = await attributeService().getParticipantsAllAttributesService(
          organizationId,
          eventId,
          participantId,
        );

        return res.status(200).json({ attributes: participantAttributes });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    },
    getParticipantAttributeController: async (req: Request, res: Response) => {
      try {
        const organizationId = req?.params?.organizationId;
        const eventId = req?.params?.eventId;
        const participantId = req?.params?.participantId;
        const attributeId = req?.params?.attributeId;

        if (!organizationId || organizationId === '' || organizationId === undefined) {
          return res.status(400).json({ error: 'Organization ID is required' });
        }

        if (!eventId || eventId === '' || eventId === undefined) {
          return res.status(400).json({ error: 'Event ID is required' });
        }

        if (!participantId || participantId === '' || participantId === undefined) {
          return res.status(400).json({ error: 'Participant ID is required' });
        }

        if (!attributeId || attributeId === '' || attributeId === undefined) {
          return res.status(400).json({ error: 'Attribute ID is required' });
        }

        const participantAttribute = await attributeService().getParticipantAttributeService(
          organizationId,
          eventId,
          participantId,
          attributeId,
        );

        return res.status(200).json({ attribute: participantAttribute });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    },
  };
};

export default attributeController;
