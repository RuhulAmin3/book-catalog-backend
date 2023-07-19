"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidation = exports.updateBookZodSchema = exports.createBookZodSchema = void 0;
const zod_1 = require("zod");
exports.createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "book name is required",
        }),
        author: zod_1.z.string({
            required_error: "author name is required",
        }),
        genre: zod_1.z.string({
            required_error: "genre is required",
        }),
        description: zod_1.z.string({
            required_error: "description is required",
        }),
        price: zod_1.z.number({
            required_error: "price is required",
        }),
        cover: zod_1.z.string({
            required_error: "cover is required",
        }),
        publicationDate: zod_1.z.string({
            required_error: "publicationDate is required",
        }),
    }),
});
exports.updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        cover: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
    }),
});
exports.bookValidation = {
    createBookZodSchema: exports.createBookZodSchema,
    updateBookZodSchema: exports.updateBookZodSchema,
};
