// import express from 'express'
// import validateRequest from '../../middlewares/validateRequest';
// import {  createSlotHandler, getAvailableSlotsHandler } from './slot.controller';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.constant';


// const router = express.Router();

// router.post('/services/slots', auth(USER_ROLE.admin), createSlotHandler);
// router.get('/slots/availability', getAvailableSlotsHandler);


// export const SlotRoutes = router;



import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";
import { createSlotsIntoDB, getAllSlots } from "./slot.controller";

const router = Router();
router.post(
  "/slots",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createSlotsIntoDB
);

router.get(
  "/get/all",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllSlots
);
const slotRoutes = router;
export default slotRoutes;