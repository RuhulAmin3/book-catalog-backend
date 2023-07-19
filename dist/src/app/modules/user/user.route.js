"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validationRequest_1.validationRequest)(user_validation_1.userValidation.createUserZodSchema), user_controller_1.userController.createUser);
router.post("/login", (0, validationRequest_1.validationRequest)(user_validation_1.userValidation.loginUserZodSchema), user_controller_1.userController.loginUser);
exports.default = router;
