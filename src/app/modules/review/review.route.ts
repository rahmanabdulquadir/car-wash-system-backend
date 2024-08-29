import { Router } from "express";
import { createReview, getReviews } from "./review.controller";
import { isAuthenticatedUser } from "../../middlewares/auth";
const router = Router();
router.get("/get", getReviews);
router.post("/create", isAuthenticatedUser,createReview);
const reviewRoutes = router;
export default reviewRoutes;