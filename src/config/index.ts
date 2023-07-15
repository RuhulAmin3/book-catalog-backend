import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_DEV,
  dbUrl: process.env.DB_URL,
  port: process.env.PORT,
};
