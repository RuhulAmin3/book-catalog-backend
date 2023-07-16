import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import { verifyToken } from "../../utils/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

export const userValidation =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "you are unauthorized user"
        );
      }
      const verifiedToken = verifyToken(token, config.jwt.jwt_secret as Secret);
      req.user = verifiedToken;
      next();
    } catch (err) {
      next(err);
    }
  };
