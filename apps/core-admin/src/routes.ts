import express, { Router } from 'express';
import { createNewOrganization, getUsersOrganizations } from './controllers/organizations';
import { createNewEvent, getEvents } from './controllers/events';
const router: Router = express.Router();

router.get('/', (req: any, res: any) => {
  try {
    return res.send('Hello World!');
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
});

router.get('/organizations', getUsersOrganizations);
router.post('/organizations', createNewOrganization);

router.get('/organizations/:orgId/events', getEvents);
router.post('/organizations/:orgId/events', createNewEvent);

export default router;
