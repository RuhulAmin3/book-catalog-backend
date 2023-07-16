import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { IBook } from "../book/book.interface";

export interface IReview {
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
  review: string;
}

export type ReviewModel = Model<IReview, object>;
