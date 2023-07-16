import { Response } from "express";

type ResponseType<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  accessToken?: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    skip: number;
  };
};

export const sendResponse = <T>(res: Response, data: ResponseType<T>) => {
  const responseObj = {
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    accessToken: data.accessToken,
    meta: data.meta,
  };
  res.status(data.statusCode).json(responseObj);
};
