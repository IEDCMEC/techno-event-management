const Participant = require('common').Participant;
const UUID = require('common').UUID;
const NodePGParticipantRepository = require('pgdatabase').NodePGParticipantRepository;

const participantRepository: typeof NodePGParticipantRepository = new NodePGParticipantRepository();
const ParticipantCheckIn = require('common').ParticipantCheckIn;

const CheckInRepository = require('pgdatabase').CheckInRepository;

const checkInRepository: typeof CheckInRepository = new CheckInRepository();

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

const checkInParticipant = async (
  organizationId: typeof UUID,
  eventId: typeof UUID,
  participantId: typeof UUID,
  checkedInBy: typeof UUID,
) => {
  const previousCheckin = await checkInRepository.findByParticipantId(
    organizationId,
    eventId,
    participantId,
  );
  if (previousCheckin) {
    return false;
  }

  console.log(previousCheckin);

  const participantCheckIn: typeof ParticipantCheckIn = new ParticipantCheckIn(
    new UUID(),
    organizationId,
    eventId,
    participantId,
    true,
    new Date(),
    checkedInBy,
  );

  const checkInSucces = await checkInRepository.create(participantCheckIn);
  return checkInSucces;
};

export { getParticipantById, getParticipantByInviteId, getAllParticipants, checkInParticipant };
