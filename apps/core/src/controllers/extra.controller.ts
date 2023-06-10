const getAllEventExtras = () => {
  return { message: 'Get all extras' };
};

const getEventExtraById = () => {
  return { message: 'Get extra by id' };
};

const eventParticipantExtraCheckIn = () => {
  return { message: 'Extra check in' };
};

const getEventParticipantExtraCheckInStatus = () => {
  return { message: 'Get extra check in status' };
};

export {
  getAllEventExtras,
  getEventExtraById,
  eventParticipantExtraCheckIn,
  getEventParticipantExtraCheckInStatus,
};
