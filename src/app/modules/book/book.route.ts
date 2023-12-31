import express from "express";
import { validationRequest } from "../../middlewares/validationRequest";
import { bookController } from "./book.controller";
import { bookValidation } from "./book.validation";
import { userValidation } from "../../middlewares/userValidation";
const router = express.Router();

router.post(
  "/",
  validationRequest(bookValidation.createBookZodSchema),
  userValidation(),
  bookController.createBook
);
router.get("/:id", bookController.getBook);
router.patch(
  "/:id",
  validationRequest(bookValidation.updateBookZodSchema),
  userValidation(),
  bookController.updateBook
);
router.delete("/:id", userValidation(), bookController.deleteBook);
router.get("/", bookController.getAllBook);

export default router;
