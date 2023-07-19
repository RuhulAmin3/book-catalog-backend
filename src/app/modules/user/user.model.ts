import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExist = async function (email): Promise<IUser | null> {
  const user = await User.findOne({ email });
  return user;
};

userSchema.statics.isPasswordMatched = async function (
  savedPassword,
  givenPassword
): Promise<boolean> {
  return savedPassword === givenPassword;
};

userSchema.pre("save", async function (next) {
  const user = await User.findOne({ email: this.email });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, "user already exist");
  }
  next();
});

export const User = model<IUser, UserModel>("user", userSchema);
