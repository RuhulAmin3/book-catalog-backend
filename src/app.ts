import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import globalRoutes from "./app/routes";
import httpStatus from "http-status";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", globalRoutes);

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.json("in the name of Allah");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "route not found",
    errorMessages: [{ path: req.originalUrl, message: "url not found" }],
  });
  next();
});
