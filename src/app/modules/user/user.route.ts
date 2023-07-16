import express from "express";
import { userController } from "./user.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { userValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/signup",
  validationRequest(userValidation.createUserZodSchema),
  userController.createUser
);
router.post(
  "/login",
  validationRequest(userValidation.loginUserZodSchema),
  userController.loginUser
);

export default router;
