import { z } from "zod";

export const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "book name is required",
    }),
    author: z.string({
      required_error: "author name is required",
    }),
    Genre: z.string({
      required_error: "genre is required",
    }),
    description: z.string({
      required_error: "description is required",
    }),
    price: z.number({
      required_error: "price is required",
    }),
    cover: z.string({
      required_error: "cover is required",
    }),
    publicationDate: z.string({
      required_error: "publicationDate is required",
    }),
  }),
});
export const bookValidation = {
  createBookZodSchema,
};
