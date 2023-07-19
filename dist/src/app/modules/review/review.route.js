"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const userValidation_1 = require("../../middlewares/userValidation");
const router = express_1.default.Router();
router.get("/:id", review_controller_1.reviewController.getReviews);
router.post("/", (0, userValidation_1.userValidation)(), review_controller_1.reviewController.postReview);
exports.default = router;
