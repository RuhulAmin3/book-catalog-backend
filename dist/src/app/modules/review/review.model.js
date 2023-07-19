"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.reviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "user",
    },
    book: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "book",
    },
    review: {
        type: String,
        required: true,
    },
});
exports.Review = (0, mongoose_1.model)("review", exports.reviewSchema);
