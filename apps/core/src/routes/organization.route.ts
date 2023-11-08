import express, { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = express.Router();

import organizationController from '../controllers/organization.controller';
import organizationService from '../services/organization.service';

router.post(
  '/organization',
  authorize,
  organizationController(organizationService).addNewOrganizationController,
);

export { router as organizationRouter };
