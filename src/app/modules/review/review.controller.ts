import { sendResponse } from "./../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { IReview } from "./review.interface";
import httpStatus from "http-status";
import { reviewService } from "./review.service";

const postReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await reviewService.postReview(data);

    sendResponse<IReview>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "review added successful",
      data: result,
    });
  }
);

const getReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await reviewService.getReviews(id);
    sendResponse<IReview[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "review retrieved successful",
      data: result,
    });
  }
);

export const reviewController = {
  postReview,
  getReviews,
};
