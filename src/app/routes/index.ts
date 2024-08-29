import express from 'express';
import userRoute from '../modules/user/user.route';
import serviceRoutes from '../modules/service/service.route';
import slotRoutes from '../modules/slot/slot.route';
import bookingRoutes from '../modules/booking/booking.route';
import authRoute from '../modules/Auth/auth.route';
import paymentRoute from '../modules/payment/payment.route';
import bookingRoutes2 from '../modules/booking/booking.route2';
import slotRoutes2 from '../modules/slot/slot.route2';
import reviewRoutes from '../modules/review/review.route';

const router = express.Router();

// const moduleRoutes = [
//   {
//     path: '/auth',
//     route: UserRoutes,
//   },
//   {
//     path: '/auth',
//     route: AuthRoutes,
//   },
//   {
//     path: '/',
//     route: ServiceRoutes,
//   },
//   {
//     path: '/',
//     route: SlotRoutes,
//   },
//   {
//     path: '/',
//     route: BookingRoutes,
//   },
// ];

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/services',
    route: serviceRoutes,
  },
  {
    path: '/services',
    route: slotRoutes,
  },
  {
    path: '/slots',
    route: slotRoutes2,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/review',
    route: reviewRoutes,
  },
  {
    path: '/user',
    route: userRoute,
  },

  {
    path: '/',
    route: bookingRoutes2,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
