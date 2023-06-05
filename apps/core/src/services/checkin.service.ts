import { UUID } from '../../../../packages/domain';

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

  const checkInSucces = await checkInRepository.checkInParticipant(
    organizationId,
    eventId,
    participantId,
    checkedInBy,
  );
  return checkInSucces;
};

export { checkInParticipant };
