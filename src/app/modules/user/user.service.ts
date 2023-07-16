import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IUser, LoginDataType, LoginResponseDataType } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "../../../utils/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createUser = async (
  userData: IUser
): Promise<LoginResponseDataType<IUser>> => {
  const result = await User.create(userData);
  if (!result) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "failed to create User");
  }

  const accessToken = createToken(
    {
      id: result._id as unknown as string,
      email: result.email,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expire_time as string
  );

  return { accessToken, data: result };
};

const loginUser = async (
  userData: LoginDataType
): Promise<LoginResponseDataType<IUser>> => {
  const { email, password } = userData;
  const user = new User();
  const isUserExist = await user.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user does not exist");
  }
  const passwordMatched = await User.isPasswordMatched(
    isUserExist?.password,
    password
  );

  if (!passwordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "wrong credentials");
  }

  const accessToken = createToken(
    {
      id: isUserExist._id as string,
      email: isUserExist.email,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expire_time as string
  );

  return { accessToken, data: isUserExist };
};

export const userService = {
  createUser,
  loginUser,
};
