import dotenv from 'dotenv';

dotenv.config();

export default {
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  SESSION_SECRET:
    process.env.SESSION_SECRET ||
    'asdufjuhtaewr98yh43noikgvrfa98y436890vfhnojihnga9-',
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URL,
};
