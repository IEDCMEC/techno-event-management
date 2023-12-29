import express, { Router, Request, Response } from 'express';

const { createUser } = require('../passport/helper');
const passport = require('passport');
require('../passport/index')(passport);

const router: Router = express.Router();

// Get all participants
router.post(
  '/signup',
  passport.authenticate('local-signup', { session: false }),
  async (req: any, res, next) => {
    try {
      if (
        !req.body?.firstName ||
        req.body?.firstName === '' ||
        req.body?.firstName === null ||
        req.body?.firstName === undefined
      )
        throw new Error('First name is required');

      if (
        !req.body?.lastName ||
        req.body?.lastName === '' ||
        req.body?.lastName === null ||
        req.body?.lastName === undefined
      )
        throw new Error('Last name is required');

      if (
        !req.user?.email ||
        req.user?.email === '' ||
        req.user?.email === null ||
        req.user?.email === undefined
      )
        throw new Error('Email is required');

      if (
        !req.user?.password ||
        req.user?.password === '' ||
        req.user?.password === null ||
        req.user?.password === undefined
      )
        throw new Error('Password is required');

      const user = await createUser(
        req.user?.email,
        req.user?.password,
        req.body?.firstName,
        req.body?.lastName,
      );
      return res.status(201).json({
        message: 'Successfully created new user',
      });
    } catch (err: any) {
      console.error(err.message);
      return res.status(400).json({ error: err.message });
    }
  },
);

router.post(
  '/login',

  passport.authenticate('local-login', { session: false }),
  (req: any, res, next) => {
    try {
      res.json({ message: 'Succefully logged in', token: req.user.token });
    } catch (err: any) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }
  },
);
export { router as authrouter };
