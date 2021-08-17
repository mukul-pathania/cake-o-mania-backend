import passportLocal from 'passport-local';
import User from '../models/User.js';
import UserService from '../services/UserService.js';

const SetUpPassportAuth = (passport) => {
  passport.use(
    new passportLocal.Strategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const response = await UserService.getUserForPassportLocalStrategy(
            email,
            password,
          );
          return done(null, response.user, {
            message: response.message,
          });
        } catch (error) {
          return done(null, false, {
            message: 'An error occured while processing your request',
          });
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
export default SetUpPassportAuth;
