import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import expressWinston from 'express-winston';
import winston from 'winston';
import cookieParser from 'cookie-parser';
import SetUpPassportAuth from './config/passport.js';
import config from './config/index.js';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import logger from './util/logger.js';

const PORT = config.PORT || 3000;

const startServer = () => {
  connectDB();
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: config.CORS_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
    }),
  );

  app.use(cookieParser());

  SetUpPassportAuth(passport);

  if (config.NODE_ENV != 'test') {
    app.use(
      expressWinston.logger({
        meta: false,
        transports: [new winston.transports.Console()],
        expressFormat: true,
      }),
    );
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());

  app.use('/', routes);

  app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
  });
  return app.listen(PORT, () =>
    logger.info(`Server running on port ${PORT} in ${config.NODE_ENV} mode`),
  );
};

export { startServer };
