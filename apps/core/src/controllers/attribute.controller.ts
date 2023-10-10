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
  };
};

export default attributeController;
