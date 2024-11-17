import express, { Router } from 'express';
import {
  addOrganizationMember,
  createNewOrganization,
  getOrganizationMembers,
  getOrganizationStats,
  getUsersOrganizations,
} from './controllers/organizations';
import { createNewEvent, getEventStats, getEvents } from './controllers/events';
import {
  addNewParticipant,
  getAllParticipants,
  getParticipantById,
  checkInParticipant,
  getAllParticipantsCheckInDetails,
  getParticipantAttributes,
  setParticipantAttribute,
  checkOutParticipant,
  editParticipant,
  updateParticipantAttribute,
  getParticipantBycheckInKey,
} from './controllers/participants';
import {
  addNewAttribute,
  editAttribute,
  getAllAttributes,
  getAttributeById,
  getAttributeParticipants,
} from './controllers/attributes';
import { fetchAccountDetails, myCredential, updateAccountDetails } from './controllers/users';
import { validateOrganizationUser, validateOrganizationAdmin } from './middlewares/authorization';
import { addNewExtra, checkInExtra, getAllExtras, getExtraById } from './controllers/extras';
import { validateUUID } from './middlewares/validateParams';
import {
  addNewRecipient,
  addNewRecipients,
  getMailProjects,
  getMailStatus,
  newMailProject,
  sendMailWithQR,
  sendOTP,
  updateMailProject,
  verifyOTP,
} from './controllers/mail';

const router: Router = express.Router();

router.param('eventId', validateUUID);
router.param('attributeId', validateUUID);
router.param('participantId', validateUUID);
router.param('extraId', validateUUID);

router.get('/', (req: any, res: any) => {
  try {
    return res.send('Hello World!');
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
});

router.get('/users/mycreds', myCredential); //done

router.get('/users/me', fetchAccountDetails); //aaron not used
router.put('/users/me', updateAccountDetails); //aaron put request

router.get('/organizations', getUsersOrganizations); //aaron not used
router.get('/organizations/:orgId', getOrganizationStats); //aaron done
router.post('/organizations', createNewOrganization);

router.get('/organizations/:orgId/members', validateOrganizationUser, getOrganizationMembers); // aaron done
router.post('/organizations/:orgId/members', validateOrganizationAdmin, addOrganizationMember);

router.get('/organizations/:orgId/events', getEvents); //aaron done
router.get('/organizations/:orgId/events/:eventId', getEventStats); //midhun
router.post('/organizations/:orgId/events', createNewEvent); //midhun

router.get('/organizations/:orgId/events/:eventId/participants', getAllParticipants); //midhun
router.post('/organizations/:orgId/events/:eventId/participants', addNewParticipant);
router.put('/organizations/:orgId/events/:eventId/participants/:participantId', editParticipant);

router.get(
  '/organizations/:orgId/events/:eventId/participants/check-in',
  getAllParticipantsCheckInDetails,
); //midhun
router.get('/organizations/:orgId/events/:eventId/participants/:participantId', getParticipantById); //midhun

router.get(
  '/organizations/:orgId/events/:eventId/participants/check-in/:checkInKey',
  getParticipantBycheckInKey,
); //midhun

router.post('/organizations/:orgId/events/:eventId/participants/check-in', checkInParticipant);
router.post('/organizations/:orgId/events/:eventId/participants/check-out', checkOutParticipant);

router.get(
  '/organizations/:orgId/events/:eventId/participants/:participantId/attributes',
  getParticipantAttributes,
); //subru
router.post(
  '/organizations/:orgId/events/:eventId/participants/:participantId/attributes',
  setParticipantAttribute,
);
router.put(
  '/organizations/:orgId/events/:eventId/participants/:participantId/attributes/:attributeId',
  updateParticipantAttribute,
);

router.get('/organizations/:orgId/events/:eventId/attributes', getAllAttributes); //subru
router.get('/organizations/:orgId/events/:eventId/attributes/:attributeId', getAttributeById); //subru
router.get(
  '/organizations/:orgId/events/:eventId/attributes/:attributeId/participants',
  getAttributeParticipants,
); //subru
router.put('/organizations/:orgId/events/:eventId/attributes/:attributeId', editAttribute);
router.post('/organizations/:orgId/events/:eventId/attributes', addNewAttribute);

router.get('/organizations/:orgId/events/:eventId/extras', getAllExtras); //subru
router.get('/organizations/:orgId/events/:eventId/extras/:extraId', getExtraById); //subru
router.post('/organizations/:orgId/events/:eventId/extras/:extraId/check-in', checkInExtra);
router.post('/organizations/:orgId/events/:eventId/extras', addNewExtra);

//mailer routes
router.post('/organizations/:orgId/newEmailProject', newMailProject);
router.post('/organizations/:orgId/updateEmailProject', updateMailProject);
router.get('/organizations/:orgId/getEmailProjects', getMailProjects); //subru
router.get('/organizations/:orgId/getMailStatus', getMailStatus); //subru
router.post('/organizations/:orgId/addNewRecipient', addNewRecipient);
router.post('/organizations/:orgId/addNewRecipients', addNewRecipients);
router.post('/organizations/:orgId/events/:eventId/mailQR', sendMailWithQR);

// OTP routes
router.post('/organizations/sendOTP', sendOTP);
router.post('/organizations/verifyOTP', verifyOTP);
export default router;
