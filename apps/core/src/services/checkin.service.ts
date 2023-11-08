import { Participant } from 'common';

const pg = require('pgdatabase').pg;

type CheckinService = () => {
  checkinParticipantService: (
    organizationId: string,
    eventId: string,
    participantId: string,
    checkinTime: Date,
    checkedInBy: string,
  ) => Promise<Participant>;
};

const checkinService = (): CheckinService => {
  return {
    checkinParticipantService: async (
      organizationId: string,
      eventId: string,
      participantId: string,
      checkinTime: Date,
      checkedInBy: string,
    ) => {
      try {
        let participant: Participant = (
          await pg.query(
            `SELECT * FROM participant WHERE organization_id = $1 AND event_id = $2 AND id = $3`,
            [organizationId, eventId, participantId],
          )
        ).rows[0];

        if (!participant) throw new Error('Participant not found');

        let participantCheckin = (
          await pg.query(
            `SELECT * FROM participant_check_in WHERE organization_id = $1 AND event_id = $2 AND participant_id = $3`,
            [organizationId, eventId, participantId],
          )
        ).rows[0];

        if (participantCheckin) throw new Error('Participant already checked in');

        await pg.query('BEGIN');
        let newParticipantCheckin = (
          await pg.query(
            `INSERT INTO participant_check_in (organization_id, event_id, participant_id, checked_in, check_in_time, checked_in_by) VALUES ($1, $2, $3, true, $4, $5) RETURNING *`,
            [organizationId, eventId, participantId, checkinTime, checkedInBy],
          )
        ).rows[0];

        if (!newParticipantCheckin) throw new Error('Something went wrong');

        await pg.query('COMMIT');
        return newParticipantCheckin;
      } catch (err: any) {
        await pg.query('ROLLBACK');
        console.error(err);
        throw new Error('Something went wrong');
      }
    },
  };
};
export default checkinService;
export type { CheckinService };
