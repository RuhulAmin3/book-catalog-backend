import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "firstName is required",
    }),
    lastName: z.string({
      required_error: "last name is required",
    }),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6, { message: "password must be at least 6 characters long" }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "invalid email address" }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "invalid email address" }),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6, { message: "password must be at least 6 character long" }),
  }),
});

export const userValidation = {
  createUserZodSchema,
  loginUserZodSchema,
};
