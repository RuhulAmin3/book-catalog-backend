import { Schema, Types, model } from "mongoose";
import { IReview } from "./review.interface";

export const reviewSchema = new Schema<IReview>({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
  book: {
    type: Types.ObjectId,
    required: true,
    ref: "book",
  },
  review: {
    type: String,
    required: true,
  },
});

export const Review = model<IReview>("review", reviewSchema);
