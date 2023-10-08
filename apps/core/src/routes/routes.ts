import express, { Router } from 'express';

// Event
import eventController from '../controllers/event.controller';
import eventService from '../services/event.service';

const router: Router = express.Router();

// Event routes
router.post('/:organizationId/events', eventController(eventService).addNewEventController);

router.get('/:organizationId/events', eventController(eventService).getAllEventsController);

router.get('/:organizationId/events/:eventId', eventController(eventService).getEventController);

// router.get('/:organizationId/events/:eventId/participants', getAllEventParticipants);

// router.get(
//   '/:organizationId/events/:eventId/participants/:participantId',
//   authorize,
//   getEventParticipantById,
// );

// router.post('/:organizationId/events/:eventId/checkin', checkInEventParticipant);

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
