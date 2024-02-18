import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  dbURI: process.env.DATABASE_URI,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
