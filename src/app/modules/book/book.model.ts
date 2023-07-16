import { Schema, Types, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    Genre: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>("book", bookSchema);
