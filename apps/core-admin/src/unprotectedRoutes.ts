import express, { Router } from 'express';
import {
  orgAndEventVerification,
  getFormAttributes,
  addFormResponse,
} from './controllers/registration';

const router: Router = express.Router();

router.get('/', (req: any, res: any) => {
  try {
    return res.send('Hello World!');
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
});

router.get('/:orgId/event/:eventId/verify', orgAndEventVerification);
router.get('/:orgId/event/:eventId/attributes', getFormAttributes);
router.post('/:orgId/event/:eventId/submit', addFormResponse);

export default router;
