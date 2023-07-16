import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IReview } from "./review.interface";
import { Review } from "./review.model";

const postReview = async (data: IReview): Promise<IReview> => {
  const result = await Review.create(data);
  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, "failed to create review");
  return result;
};

const getReviews = async (id: string): Promise<IReview[]> => {
  const reviews = await Review.find({ book: id });
  return reviews;
};

export const reviewService = {
  postReview,
  getReviews,
};
