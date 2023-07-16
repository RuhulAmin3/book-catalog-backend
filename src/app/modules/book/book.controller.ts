import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { bookService } from "./book.service";
import { JwtPayload } from "jsonwebtoken";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.user as JwtPayload;
  const bookData = { ...data, user: id };
  const result = await bookService.createBook(bookData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "book created successfully",
    data: result,
  });
});
const getBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookService.getBook(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "single book retrieved successfully",
    data: result,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getAllBook();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "all book retrieved successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const user = req.user as JwtPayload;
  const { id } = req.params;
  const result = await bookService.updateBook(id, data, user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "book updated successfully",
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const { id } = req.params;
  const result = await bookService.deleteBook(id, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "book deleted successfully",
    data: result,
  });
});

export const bookController = {
  createBook,
  getBook,
  updateBook,
  deleteBook,
  getAllBook,
};
