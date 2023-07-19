"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    const errors = [
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
exports.handleCastError = handleCastError;
