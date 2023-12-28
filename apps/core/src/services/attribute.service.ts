const { pg } = require('pgdatabase');

type AttributeService = () => {
  addNewAttributeService: (organizationId: string, eventId: string, name: string) => Promise<any>;

  getParticipantsAllAttributesService: (
    organizationId: string,
    eventId: string,
    participantId: string,
  ) => Promise<any>;

  getParticipantAttributeService: (
    organizationId: string,
    eventId: string,
    participantId: string,
    attributeId: string,
  ) => Promise<any>;
};

const attributeService: AttributeService = () => {
  return {
    addNewAttributeService: async (organizationId: string, eventId: string, name: string) => {
      try {
        let newAttribute = (
          await pg.query(
            `INSERT INTO attribute(organization_id, event_id, name) VALUES($1, $2, $3) RETURNING *`,
            [organizationId, eventId, name],
          )
        ).rows[0];

        if (!newAttribute) throw new Error('Something went wrong');

        return newAttribute;
      } catch (err: any) {
        console.error(err);
        throw new Error('Something went wrong');
      }
    },
    getParticipantsAllAttributesService: async (
      organizationId: string,
      eventId: string,
      participantId: string,
    ) => {
      try {
        let participantAttributes = (
          await pg.query(
            `SELECT 
                            * 
                         FROM 
                            participant_attribute 
                         JOIN
                            attribute
                         ON
                            attribute.id = participant_attribute.attribute_id
                         WHERE attribute.organization_id = $1 AND attribute.event_id = $2 AND participant_id = $3`,
            [organizationId, eventId, participantId],
          )
        ).rows;

        return participantAttributes;
      } catch (err: any) {
        console.error(err);
        throw new Error('Something went wrong');
      }
    },
    getParticipantAttributeService: async (
      organizationId: string,
      eventId: string,
      participantId: string,
      attributeId: string,
    ) => {
      try {
        let participantAttribute = (
          await pg.query(
            `SELECT 
                            * 
                         FROM 
                            participant_attribute 
                         JOIN
                            attribute
                         ON
                            attribute.id = participant_attribute.attribute_id
                         WHERE attribute.organization_id = $1 AND attribute.event_id = $2 AND participant_id = $3 AND attribute_id = $4`,
            [organizationId, eventId, participantId, attributeId],
          )
        ).rows[0];

        return participantAttribute;
      } catch (err: any) {
        console.error(err);
        throw new Error('Something went wrong');
      }
    },
  };
};
export default attributeService;
export type { AttributeService };
