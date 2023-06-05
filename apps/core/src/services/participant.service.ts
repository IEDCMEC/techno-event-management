import { Participant, UUID } from '../../../../packages/domain';
import ParticipantRepository from '../../../../packages/pgdatabase/src/ParticipantRepository';

const participantRepository: ParticipantRepository = new ParticipantRepository();

// const addParticiant = async (organizationId: UUID, eventId: UUID, name: UUID) => {};

const getAllParticipants = async (organizationId: UUID, eventId: UUID) => {
  try {
    const participants: Participant[] = await participantRepository.findAll(
      organizationId,
      eventId,
    );
    return participants;
  } catch (err) {
    console.log(err);
  }
};

const getParticipantById = async (organizationId: UUID, eventId: UUID, participantId: UUID) => {
  const participant: Participant = await participantRepository.find(
    organizationId,
    eventId,
    participantId,
  );
  return participant;
};
// const getParticipantByTag = async (organizationId: UUID, eventId: UUID, tag: UUID) => {};
// const getParticipantAttributes = async (
//   organizationId: UUID,
//   eventId: UUID,
//   participantId: UUID,
// ) => {};
// const getParticipantExtras = async (organizationId: UUID, eventId: UUID, participantId: UUID) => {};
// const getParticipantCheckInStatus = async (
//   organizationId: UUID,
//   eventId: UUID,
//   participantId: UUID,
// ) => {};

// const checkInParticipant = async (organizationId: UUID, eventId: UUID, participantId: UUID) => {};

export { getParticipantById, getAllParticipants };
