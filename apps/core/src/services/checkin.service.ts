import { UUID } from '../../../../packages/domain/src';
import { ParticipantCheckIn } from '../../../../packages/domain/src';

import CheckInRepository from '../../../../packages/pgdatabase/src/CheckInRepository';

const checkInRepository: CheckInRepository = new CheckInRepository();

const checkInParticipant = async (
  organizationId: UUID,
  eventId: UUID,
  participantId: UUID,
  checkedInBy: UUID,
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

  const participantCheckIn: ParticipantCheckIn = new ParticipantCheckIn(
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
