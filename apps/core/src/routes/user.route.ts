import express, { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = express.Router();

import userController from '../controllers/user.controller';
import userService from '../services/user.service';

router.get(
  '/users/organizations',
  authorize,
  userController(userService).getUserOrganizationsController,
);

export { router as userRouter };
