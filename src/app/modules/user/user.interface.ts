import { Model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export type IUserMethods = {
  isUserExist: (email: string) => Promise<IUser | null>;
} & IUser;

export type UserModel = {
  isPasswordMatched: (
    savedPassword: string,
    givenPassword: string
  ) => Promise<Boolean>;
} & Model<IUser, object, IUserMethods>;

export type LoginDataType = {
  email: string;
  password: string;
};

export type LoginResponseDataType<T> = {
  accessToken: string;
  data: T;
};
