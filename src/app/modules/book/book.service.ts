import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import { JwtPayload } from "jsonwebtoken";

const createBook = async (data: IBook): Promise<IBook> => {
  const result = await Book.create(data);
  if (!result) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "failed to create book");
  }
  return result;
};

const getBook = async (id: string): Promise<IBook> => {
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "book not found");
  }
  return book;
};

const getAllBook = async (): Promise<IBook[] | []> => {
  const result = await Book.find({});
  return result;
};

const updateBook = async (
  id: string,
  data: IBook,
  user: JwtPayload
): Promise<IBook | null> => {
  const book = await Book.findById(id);
  const { id: userId } = user;
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "book not found");
  }
  if (book.user != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "you cannot update this book. you can only update your book"
    );
  }
  const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true });
  return updatedBook;
};

const deleteBook = async (id: string, user: JwtPayload): Promise<void> => {
  const book = await Book.findById(id);
  const { id: userId } = user;
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "book not found");
  }
  if (book.user != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "you cannot delete this book. you can only delete your book"
    );
  }
};

export const bookService = {
  createBook,
  getBook,
  updateBook,
  deleteBook,
  getAllBook,
};
