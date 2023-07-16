import express from "express";
import { reviewController } from "./review.controller";
const router = express.Router();

router.get("/:id", reviewController.getReviews);
router.post("/", reviewController.postReview);
