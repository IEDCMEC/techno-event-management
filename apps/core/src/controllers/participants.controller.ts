import Participant from 'domain/src/models/Participant';

import {getParticipant, getAllEventParticipants} from '../services/participant.service';


const getAllParticipants = async (organizationId: string, eventId: string) => {
    try {
        const participants: Participant[] = await getAllEventParticipants(organizationId, eventId);
        return participants;
    } catch (err) {
        console.log(err);
    }
};

const getParticipantById = async (organizationId: string, eventId: string, id: string) => {
    try {
        const participant: Participant = await getParticipant(organizationId, eventId, id);
        return participant;
    } catch (err) {
        console.log(err);
    }
};

export {getAllParticipants, getParticipantById};
