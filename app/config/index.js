import dotenv from 'dotenv';

dotenv.config();

export default {
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URL,
};
