"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../middlewares/validationRequest");
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const userValidation_1 = require("../../middlewares/userValidation");
const router = express_1.default.Router();
router.post("/", (0, validationRequest_1.validationRequest)(book_validation_1.bookValidation.createBookZodSchema), (0, userValidation_1.userValidation)(), book_controller_1.bookController.createBook);
router.get("/:id", book_controller_1.bookController.getBook);
router.patch("/:id", (0, validationRequest_1.validationRequest)(book_validation_1.bookValidation.updateBookZodSchema), (0, userValidation_1.userValidation)(), book_controller_1.bookController.updateBook);
router.delete("/:id", (0, userValidation_1.userValidation)(), book_controller_1.bookController.deleteBook);
router.get("/", book_controller_1.bookController.getAllBook);
exports.default = router;
