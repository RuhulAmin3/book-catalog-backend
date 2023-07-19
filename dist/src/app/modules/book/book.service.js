"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const book_model_1 = require("./book.model");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(data);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "failed to create book");
    }
    return result;
});
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "book not found");
    }
    return book;
});
const getAllBook = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({});
    return result;
});
const updateBook = (id, data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    const { id: userId } = user;
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "book not found");
    }
    if (book.user != userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "you cannot update this book. you can only update your book");
    }
    const updatedBook = yield book_model_1.Book.findByIdAndUpdate(id, data, { new: true });
    return updatedBook;
});
const deleteBook = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    const { id: userId } = user;
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "book not found");
    }
    if (book.user != userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "you cannot delete this book. you can only delete your book");
    }
    yield book_model_1.Book.findByIdAndDelete(id);
});
exports.bookService = {
    createBook,
    getBook,
    updateBook,
    deleteBook,
    getAllBook,
};
