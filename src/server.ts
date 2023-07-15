import mongoose from "mongoose";
import config from "./config";
import { app } from "./app";
import { Server } from "http";

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

let server: Server;
async function connectDb() {
  try {
    await mongoose.connect(config.dbUrl as string);
    console.log("database connected successfully");
    server = app.listen(config.port, () => {
      console.log("server is running on port", config.port);
    });
  } catch (err) {
    console.log(err);
  }
}

process.on("unhandledRejection", (err) => {
  if (server) {
    server.close(() => {
      console.log(err);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

connectDb();

process.on("SIGTERM", (err) => {
  console.log("signterm is received", err);
  if (server) {
    server.close();
  }
});
