import { Model } from "mongoose";

interface IUserName {
  firstName: string;
  lastName: string;
}

export interface IUser {
  name: IUserName;
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
