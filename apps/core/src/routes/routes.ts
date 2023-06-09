import express, { Router, Request, Response } from 'express';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.get('/:organizationId/events', authorize, async (req: Request, res: Response) => {
  return res.json({ message: 'Get all events' });
});

router.get('/:organizationId/events/:eventId', authorize, async (req: Request, res: Response) => {
  return res.json({ message: 'Get event by id' });
});

router.get(
  '/:organizationId/events/:eventId/participants',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Get all participants' });
  },
);

router.get(
  '/:organizationId/events/:eventId/participants/:participantId',

  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Get participant by id' });
  },
);

router.post(
  '/:organizationId/events/:eventId/checkin',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Check in participant' });
  },
);

router.get(
  '/:organizationId/events/:eventId/checkin/status',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Check in participant' });
  },
);

router.get(
  '/:organizationId/events/:eventId/extras',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Get all extras' });
  },
);

router.get(
  '/:organizationId/events/:eventId/extras/:extraId',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Get extras by id' });
  },
);

router.post(
  '/:organizationId/events/:eventId/extras/:extraId/checkin',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Get extras by id' });
  },
);

router.get(
  '/:organizationId/events/:eventId/attributes',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Get all attributes' });
  },
);

router.get(
  '/:organizationId/events/:eventId/attributes/:attrubuteId',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Get attribute by id' });
  },
);

router.get(
  '/:organizationId/events/:eventId/users',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Get all users' });
  },
);

router.get(
  '/:organizationId/events/:eventId/users/:userId',
  authorize,
  async (req: Request, res: Response) => {
    return res.json({ message: 'Get users by id' });
  },
);

export { router };
