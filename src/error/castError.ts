import mongoose from "mongoose";
import { GenericErrorMessageType } from "../types/error";

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: GenericErrorMessageType[] = [
    {
      path: err.path,
      message: "invalid id",
    },
  ];
  const message = "Invalid Id";
  const statusCode = 400;
  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};
