import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

export const validationRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        cookie: req.cookies,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      next(err);
    }
  };
