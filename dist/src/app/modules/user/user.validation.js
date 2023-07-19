"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: "firstName is required",
        }),
        lastName: zod_1.z.string({
            required_error: "last name is required",
        }),
        password: zod_1.z
            .string({
            required_error: "password is required",
        })
            .min(6, { message: "password must be at least 6 characters long" }),
        email: zod_1.z
            .string({
            required_error: "email is required",
        })
            .email({ message: "invalid email address" }),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "email is required",
        })
            .email({ message: "invalid email address" }),
        password: zod_1.z
            .string({
            required_error: "password is required",
        })
            .min(6, { message: "password must be at least 6 character long" }),
    }),
});
exports.userValidation = {
    createUserZodSchema,
    loginUserZodSchema,
};
