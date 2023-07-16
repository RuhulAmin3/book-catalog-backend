import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { userService } from "./user.service";
import config from "../../../config";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await userService.createUser(userData);
  const { accessToken, data } = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.env !== "development",
  });

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user created successfully",
    data,
    accessToken,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await userService.loginUser(userData);
  const { accessToken, data } = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.env !== "development",
  });

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user loggedin successful",
    data,
    accessToken,
  });
});

export const userController = {
  createUser,
  loginUser,
};
