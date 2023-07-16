import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (data: IBook): Promise<IBook> => {
  const result = await Book.create(data);
  if (!result) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "failed to create book");
  }
  return result;
};
const getBook = async (id: string) => {
  const result = await Book.findById(id);
  return result;
};

export const bookService = { createBook, getBook };
