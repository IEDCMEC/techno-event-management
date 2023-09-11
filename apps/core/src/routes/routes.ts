import express, { Router, Request, Response } from 'express';
import { authorize } from '../middlewares/auth.middleware';
import {
  checkInEventParticipant,
  getAllEventParticipants,
  getEventParticipantById,
  getEventParticipantCheckInStatus,
} from '../controllers/participant.controller';
import { addNewEvent, getAllEvents, getEventById } from '../controllers/events.controller';
import {
  getAllEventExtras,
  getEventExtraById,
  getEventParticipantExtraCheckInStatus,
} from '../controllers/extra.controller';
import { getAllEventAttributes, getEventAttributeById } from '../controllers/attribute.controller';
import { getEventVolunteerById, getEventVolunteers } from '../controllers/volunteer.controller';
import {
  getOrganizationMemberById,
  getOrganizationMembers,
} from '../controllers/member.controller';

const router: Router = express.Router();

router.post('/:organizationId/events', addNewEvent);

router.get('/:organizationId/events', authorize, getAllEvents);

router.get('/:organizationId/events/:eventId', authorize, getEventById);

router.get('/:organizationId/events/:eventId/participants', authorize, getAllEventParticipants);

router.get(
  '/:organizationId/events/:eventId/participants/:participantId',
  authorize,
  getEventParticipantById,
);

router.post('/:organizationId/events/:eventId/checkin', authorize, checkInEventParticipant);

router.get(
  '/:organizationId/events/:eventId/checkin/status',
  authorize,
  getEventParticipantCheckInStatus,
);

router.get('/:organizationId/events/:eventId/extras', authorize, getAllEventExtras);

router.get('/:organizationId/events/:eventId/extras/:extraId', authorize, getEventExtraById);

router.post(
  '/:organizationId/events/:eventId/extras/:extraId/checkin',
  authorize,
  getEventParticipantExtraCheckInStatus,
);

router.get(
  '/:organizationId/events/:eventId/extras/:extraId/checkin/status',
  authorize,
  getEventParticipantExtraCheckInStatus,
);

router.get('/:organizationId/events/:eventId/attributes', authorize, getAllEventAttributes);

router.get(
  '/:organizationId/events/:eventId/attributes/:attrubuteId',
  authorize,
  getEventAttributeById,
);

router.get('/:organizationId/events/:eventId/volunteers', authorize, getEventVolunteers);

router.get('/:organizationId/events/:eventId/volunteers/:userId', authorize, getEventVolunteerById);

router.get('/:organizationId/members', authorize, getOrganizationMembers);

router.get('/:organizationId/members/:userId', authorize, getOrganizationMemberById);

export { router };
