import { config } from "dotenv";

config(); // loads .env automatically

export const {
  PORT,
  SERVER_URL,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN
} = process.env;
