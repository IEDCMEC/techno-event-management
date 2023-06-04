import Participant from 'domain/src/Participant';
import { ParticipantRepository } from '../../../../packages/pgdatabase/src/';

const participantRepository: ParticipantRepository = new ParticipantRepository();

const getAllParticipants = async () => {
  try {
    const participants: Participant[] = await participantRepository.findAll();
    return participants;
  } catch (err) {
    console.log(err);
  }
};

const getParticipantById = async (id: String) => {
  try {
    const participant: Participant = await participantRepository.find(id);
    return participant;
  } catch (err) {
    console.log(err);
  }
};

export { getAllParticipants, getParticipantById };
