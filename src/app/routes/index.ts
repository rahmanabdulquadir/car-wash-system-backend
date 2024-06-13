import express from 'express'
import { UserRoutes } from '../modules/user/user.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { SlotRoutes } from '../modules/slot/slot.route';

const router = express.Router()

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/",
    route: SlotRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
