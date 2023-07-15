import mongoose from "mongoose";
import {
  GenericErrorMessageType,
  GenericErrorResponseType,
} from "../types/error";

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): GenericErrorResponseType => {
  const errors: GenericErrorMessageType[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessages: errors,
  };
};
