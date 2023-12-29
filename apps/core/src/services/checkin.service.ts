// @ts-ignore
import { Participant } from 'common';

const { pg } = require('pgdatabase');

type CheckinService = () => {
  checkinParticipantService: (
    organizationId: string,
    eventId: string,
    participantId: string,
    checkinTime: Date,
    checkedInBy: string,
  ) => Promise<Participant>;
  getParticipantCheckinDetailsService: (
    organizationId: string,
    eventId: string,
    participantId: string,
  ) => Promise<Participant>;
};

const checkinService: CheckinService = () => {
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
            ` INSERT INTO participant_check_in (organization_id, event_id, participant_id, checked_in, check_in_time, checked_in_by) 
              VALUES ($1, $2, $3, true, $4, $5) 
              RETURNING organization_id as "organizationId",
              event_id as "eventId", 
              participant_id as "participantId", 
              checked_in as "checkedIn", 
              check_in_time as "checkinTime", 
              checked_in_by as "checkedInBy"`,
            [organizationId, eventId, participantId, checkinTime, checkedInBy],
          )
        ).rows[0];

        if (!newParticipantCheckin) throw new Error('Something went wrong');

        await pg.query('COMMIT');
        return newParticipantCheckin;
      } catch (err: any) {
        await pg.query('ROLLBACK');
        console.error(err.message);
        throw err;
      }
    },
    getParticipantCheckinDetailsService: async (
      organizationId: string,
      eventId: string,
      participantId: string,
    ) => {
      try {
        let participant: Participant = (
          await pg.query(
            `SELECT * FROM participant WHERE organization_id = $1 AND event_id = $2 AND id = $3`,
            [organizationId, eventId, participantId],
          )
        ).rows[0];

        if (!participant) throw new Error('Participant not found');

        let participantCheckinDetails = (
          await pg.query(
            `SELECT 
                participant_check_in.organization_id as "organizationId",
                participant_check_in.event_id as "eventId",
                participant_id as "participantId",
                checked_in as "checkedIn",
                check_in_time as "checkinTime",
                checked_in_by as "checkedInBy",
                participant.first_name as "firstName",
                participant.last_name as "lastName",
                "user".first_name as "checkedInByFirstName",
                "user".last_name as "checkedInByLastName",
                "user".email as "checkedInByEmail" 
            FROM 
                participant_check_in 
            JOIN
                participant
            ON
                participant_check_in.participant_id = participant.id
            JOIN
                "user"
            ON
                participant_check_in.checked_in_by = "user".id
            WHERE 
                participant_check_in.organization_id = $1 AND participant_check_in.event_id = $2 AND participant_id = $3`,
            [organizationId, eventId, participantId],
          )
        ).rows[0];

        if (!participantCheckinDetails)
          participantCheckinDetails = {
            checkedIn: false,
          };

        return participantCheckinDetails;
      } catch (err: any) {
        console.error(err.message);
        throw err;
      }
    },
  };
};
export default checkinService;
export type { CheckinService };
