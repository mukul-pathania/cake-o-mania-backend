import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import SetUpPassportAuth from './config/passport.js';
import config from './config/index.js';
import connectDB from './config/db.js';
import routes from './routes/index.js';

const PORT = config.PORT || 3000;

const startServer = () => {
  connectDB();
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin:
        config.NODE_ENV === 'development'
          ? `http://localhost:${PORT}`
          : config.CORS_ORIGIN,
      credentials: true,
    }),
  );

  SetUpPassportAuth(passport);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', routes);

  app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
  });
  return app.listen(PORT, () =>
    console.log(`Server running on port ${PORT} in ${config.NODE_ENV} mode`),
  );
};

export { startServer };
