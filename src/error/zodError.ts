import { ZodError } from "zod";
import {
  GenericErrorMessageType,
  GenericErrorResponseType,
} from "../types/error";

export const handleZodError = (err: ZodError): GenericErrorResponseType => {
  const errors: GenericErrorMessageType[] = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  const statusCode = 400;
  return {
    statusCode,
    message: "Zod validation Error",
    errorMessages: errors,
  };
};
