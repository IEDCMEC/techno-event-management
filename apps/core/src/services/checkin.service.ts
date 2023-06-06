const UUID = require('common').UUID;
const ParticipantCheckIn = require('common').ParticipantCheckIn;

const CheckInRepository = require('pgdatabase').CheckInRepository;

const checkInRepository: typeof CheckInRepository = new CheckInRepository();

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

export { checkInParticipant };
