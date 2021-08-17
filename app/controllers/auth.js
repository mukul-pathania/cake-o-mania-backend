import passport from 'passport';
import UserService from '../services/UserService.js';

const loginWithEmailPassword = (req, res) => {
  passport.authenticate('local', function (err, user, message) {
    if (err || !user) {
      return res.json({ ...message, error: true });
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err);
        return res.json({ message: 'Failed to log you in', error: true });
      }
      return res.json({ ...message });
    });
  })(req, res);
};

const signUpWithEmailPassword = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.json({
        error: true,
        message: 'Please provide all three of username, email and password',
      });

    const response = await UserService.signUpWithEmailPassword(
      username,
      email,
      password,
    );

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: 'An error occured while processing your request',
    });
  }
};

const logout = (req, res) => {
  req.logOut();
  res.json({ message: 'Logged out successfully' });
};

const verify = (req, res) => {
  if (req.user)
    return res
      .json({
        message: 'You are authenticated',
        isAuthenticated: true,
        username: req.user.username,
        email: req.user.email,
        error: false,
      })
      .status(200);
  else
    return res.status(401).json({
      message: 'You are not authenticated',
      isAuthenticated: false,
      error: false,
    });
};

export default {
  loginWithEmailPassword,
  signUpWithEmailPassword,
  logout,
  verify,
};
