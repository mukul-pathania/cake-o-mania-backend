import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
  });
  return app.listen(PORT, () =>
    console.log(
      `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`,
    ),
  );
};

export { startServer };
