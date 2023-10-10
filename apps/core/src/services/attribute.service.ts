const pg = require('pgdatabase').pg;

type AttributeService = {
    addNewAttributeService: (
        organizationId: string,
        eventId: string,
        name: string,
    ) => Promise<any>;
};

const attributeService = (): AttributeService => {
    return {
        addNewAttributeService: async (
            organizationId: string,
            eventId: string,
            name: string,
        ) => {
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
    };
};
export default attributeService
export type {AttributeService};
