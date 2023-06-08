const Participant = require('common').Participant;
const UUID = require('common').UUID;
const NodePGParticipantRepository = require('pgdatabase').NodePGParticipantRepository;

const participantRepository: typeof NodePGParticipantRepository = new NodePGParticipantRepository();

// const addParticiant = async (organizationId: UUID, eventId: UUID, name: UUID) => {};

const getAllParticipants = async (
  organizationId: typeof UUID,
  eventId: typeof UUID,
): Promise<(typeof Participant)[]> => {
  try {
    const participants: (typeof Participant)[] = await participantRepository.findAll(
      organizationId,
      eventId,
    );
    return participants;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getParticipantById = async (
  organizationId: typeof UUID,
  eventId: typeof UUID,
  participantId: typeof UUID,
) => {
  const participant: typeof Participant = await participantRepository.find(
    organizationId,
    eventId,
    participantId,
  );
  return participant;
};

const getParticipantByInviteId = async (
  organizationId: typeof UUID,
  eventId: typeof UUID,
  inviteId: string,
) => {
  const participant: typeof Participant = await participantRepository.findByInviteId(
    organizationId,
    eventId,
    inviteId,
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

export { getParticipantById, getParticipantByInviteId, getAllParticipants };
