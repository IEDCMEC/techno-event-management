import express, { Router } from 'express';

// Event
import eventController from '../controllers/event.controller';
import eventService from '../services/event.service';

// Participant
import participantController from '../controllers/participant.controller';
import participantService from '../services/participant.service';
import checkinController from '../controllers/checkin.controller';
import checkinService from '../services/checkin.service';

// Attribute
import attributeController from '../controllers/attribute.controller';
import attributeService from '../services/attribute.service';

const router: Router = express.Router();

// Event routes
router.post('/:organizationId/events', eventController(eventService).addNewEventController);

router.get('/:organizationId/events', eventController(eventService).getAllEventsController);

router.get('/:organizationId/events/:eventId', eventController(eventService).getEventController);

// Participant routes
router.post(
  '/:organizationId/events/:eventId/participants',
  participantController(participantService).addNewParticipantController,
);

router.get(
  '/:organizationId/events/:eventId/participants',
  participantController(participantService).getAllParticipantsController,
);

router.get(
  '/:organizationId/events/:eventId/participants/:participantId',
  participantController(participantService).getParticipantController,
);

// Checkin routes
router.post(
  '/:organizationId/events/:eventId/checkin/participants/:participantId',
  checkinController(checkinService).checkinParticipantController,
);
router.get(
  '/:organizationId/events/:eventId/checkin/participants/:participantId',
  checkinController(checkinService).getParticipantCheckinDetailsController,
);

// Attribute routes
router.post(
  '/:organizationId/events/:eventId/attributes',
  attributeController(attributeService).addNewAttributeController,
);

router.get(
  '/:organizationId/events/:eventId/participants/:participantId/attributes',
  attributeController(attributeService).getParticipantsAllAttributesController,
);

router.get(
  '/:organizationId/events/:eventId/participants/:participantId/attributes/:attributeId',
  attributeController(attributeService).getParticipantAttributeController,
);

// router.get(
//   '/:organizationId/events/:eventId/checkin/status',
//   authorize,
//   getEventParticipantCheckInStatus,
// );

// router.get('/:organizationId/events/:eventId/extras', getAllEventExtras);
//
// router.get('/:organizationId/events/:eventId/extras/:extraId', getEventExtraById);
//
// router.post(
//     '/:organizationId/events/:eventId/extras/:extraId/checkin',
//     getEventParticipantExtraCheckInStatus,
// );
//
// router.get(
//     '/:organizationId/events/:eventId/extras/:extraId/checkin/status',
//     getEventParticipantExtraCheckInStatus,
// );
//
// router.get('/:organizationId/events/:eventId/attributes', getAllEventAttributes);
//
// router.get(
//     '/:organizationId/events/:eventId/attributes/:attrubuteId',
//     getEventAttributeById,
// );
//
// router.get('/:organizationId/events/:eventId/volunteers', getEventVolunteers);
//
// router.get('/:organizationId/events/:eventId/volunteers/:userId', getEventVolunteerById);
//
// router.get('/:organizationId/members', getOrganizationMembers);
//
// router.get('/:organizationId/members/:userId', getOrganizationMemberById);

export { router };
