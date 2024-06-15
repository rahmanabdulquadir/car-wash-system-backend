import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { SlotRoutes } from '../modules/slot/slot.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/',
    route: ServiceRoutes,
  },
  {
    path: '/',
    route: SlotRoutes,
  },
  {
    path: '/',
    route: BookingRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
