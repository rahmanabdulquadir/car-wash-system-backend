import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";
import {
  getAllAvailableSlots,
  getSlotById,
  toggleSlotStatus,
} from "./slot.controller";
// "/slot/{pathname}"
const router = Router();
router.get("/availability", getAllAvailableSlots);
router.get("/availability/:id", getSlotById);
router.put(
  "/toggle-status/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  toggleSlotStatus
);
const slotRoutes2 = router;
export default slotRoutes2;