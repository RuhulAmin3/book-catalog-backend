import { ErrorRequestHandler } from "express";
import config from "../../config";
import { GenericErrorMessageType } from "../../types/error";
import { handleValidationError } from "../../error/validationError";
import { ZodError } from "zod";
import { handleZodError } from "../../error/zodError";
import { handleCastError } from "../../error/castError";
import ApiError from "../../error/ApiError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === "development" && console.log("global error handler", err);

  let statusCode = 500;
  let message = "something went wrong";
  let errorMessages: GenericErrorMessageType[] = [];
  console.log(err);
  if (err?.name === "ValidationError") {
    // validation Error handler
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err?.message ? [{ path: "", message: err?.message }] : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message ? [{ path: "", message: err?.message }] : [];
  }

  // generic error format send for frontend;
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
