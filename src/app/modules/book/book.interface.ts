import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IBook {
  title: string;
  author: string;
  Genre: string;
  price: number;
  cover: string;
  description: string;
  publicationDate: string;
  user: Types.ObjectId | IUser;
}

export type BookModel = Model<IBook, object>;

export interface IBookFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  genre?: string;
  sortOrder?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  publicationYear?: number;
  searchTerm?: string;
}
