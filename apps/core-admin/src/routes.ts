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

router.get('/users/mycreds', myCredential); //done //done

router.get('/users/me', fetchAccountDetails); //aaron not used //aaron not used
router.put('/users/me', updateAccountDetails); //aaron put request //aaron put request

router.get('/organizations', getUsersOrganizations); //aaron not used //aaron not used
router.get('/organizations/:orgId', getOrganizationStats); //aaron done //aaron done
router.post('/organizations', createNewOrganization);

router.get('/organizations/:orgId/members', validateOrganizationUser, getOrganizationMembers); // aaron done
router.post('/organizations/:orgId/members', validateOrganizationAdmin, addOrganizationMember);

router.get('/organizations/:orgId/events', getEvents); //aaron done //aaron done
router.get('/organizations/:orgId/events/:eventId', getEventStats); //midhun //midhun - done
router.post('/organizations/:orgId/events', createNewEvent); //midhun

router.get('/organizations/:orgId/events/:eventId/participants', getAllParticipants); //midhun //midhun - done
router.post('/organizations/:orgId/events/:eventId/participants', addNewParticipant);
router.put('/organizations/:orgId/events/:eventId/participants/:participantId', editParticipant);

router.get(
  '/organizations/:orgId/events/:eventId/participants/check-in',
  getAllParticipantsCheckInDetails,
); //midhun //midhun - done
router.get('/organizations/:orgId/events/:eventId/participants/:participantId', getParticipantById); //midhun //midhun - done

router.get(
  '/organizations/:orgId/events/:eventId/participants/check-in/:checkInKey',
  getParticipantBycheckInKey,
); //midhun //midhun - done

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

router.get('/organizations/:orgId/events/:eventId/attributes', getAllAttributes); // done
router.get('/organizations/:orgId/events/:eventId/attributes/:attributeId', getAttributeById); //done
router.get(
  '/organizations/:orgId/events/:eventId/attributes/:attributeId/participants',
  getAttributeParticipants,
); //not found
router.put('/organizations/:orgId/events/:eventId/attributes/:attributeId', editAttribute); //not found
router.post('/organizations/:orgId/events/:eventId/attributes', addNewAttribute); //done

router.get('/organizations/:orgId/events/:eventId/extras', getAllExtras); //done
router.get('/organizations/:orgId/events/:eventId/extras/:extraId', getExtraById); //done
router.post('/organizations/:orgId/events/:eventId/extras/:extraId/check-in', checkInExtra); //done
router.post('/organizations/:orgId/events/:eventId/extras', addNewExtra); //done

//mailer routes
router.post('/organizations/:orgId/newEmailProject', newMailProject); //done
router.post('/organizations/:orgId/updateEmailProject', updateMailProject); //done
router.get('/organizations/:orgId/getEmailProjects', getMailProjects); // done
router.get('/organizations/:orgId/getMailStatus', getMailStatus); //subru
router.post('/organizations/:orgId/addNewRecipient', addNewRecipient); //done
router.post('/organizations/:orgId/addNewRecipients', addNewRecipients); //done
router.post('/organizations/:orgId/events/:eventId/mailQR', sendMailWithQR); // done

// OTP routes
router.post('/organizations/sendOTP', sendOTP);
router.post('/organizations/verifyOTP', verifyOTP);
export default router;
