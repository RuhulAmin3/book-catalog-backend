import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { JwtDataType } from "../types/jwtTypes";

export const createToken = (
  data: JwtDataType,
  secret: Secret,
  expireTime: string
): string => {
  const token = jwt.sign(data, secret, { expiresIn: expireTime });
  return token;
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
