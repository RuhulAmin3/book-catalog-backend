import express from "express";
import { reviewController } from "./review.controller";
import { userValidation } from "../../middlewares/userValidation";
const router = express.Router();

router.get("/:id", reviewController.getReviews);
router.post("/", userValidation(), reviewController.postReview);

export default router;
