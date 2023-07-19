import express from "express";
import userRoutes from "../modules/user/user.route";
import bookRoutes from "../modules/book/book.route";
import reviewRoutes from "../modules/review/review.route";
const router = express.Router();

const moduleRoutes = [
  { path: "/user", route: userRoutes },
  { path: "/book", route: bookRoutes },
  { path: "/review", route: reviewRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
