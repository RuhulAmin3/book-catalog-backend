"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    const responseObj = {
        success: true,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
        accessToken: data.accessToken,
        meta: data.meta,
    };
    res.status(data.statusCode).json(responseObj);
};
exports.sendResponse = sendResponse;
