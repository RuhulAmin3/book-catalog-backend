"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const validationError_1 = require("../../error/validationError");
const zod_1 = require("zod");
const zodError_1 = require("../../error/zodError");
const castError_1 = require("../../error/castError");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const globalErrorHandler = (err, req, res, next) => {
    config_1.default.env === "development" && console.log("global error handler", err);
    let statusCode = 500;
    let message = "something went wrong";
    let errorMessages = [];
    console.log(err);
    if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        // validation Error handler
        const simplifiedError = (0, validationError_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, castError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message) ? [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }] : [];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message) ? [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }] : [];
    }
    // generic error format send for frontend;
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== "production" ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
