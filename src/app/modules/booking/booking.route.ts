// import express from 'express';
// import { BookingControllers } from './booking.controller';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.constant';


// const router = express.Router();

// router.post(
//   '/bookings', auth(USER_ROLE.customer), BookingControllers.createBooking,
// );
// router.get('/bookings',auth(USER_ROLE.admin), BookingControllers.getAllBookings);

// export const BookingRoutes = router;



import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";
import { createBookingIntoDB, getAllBookings } from "./booking.controller";

const router = Router();
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("user"),
  createBookingIntoDB
);
router.get("/", isAuthenticatedUser, authorizeRoles("admin"), getAllBookings);

const bookingRoutes = router;
export default bookingRoutes;
