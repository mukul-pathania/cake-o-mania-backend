import bcrypt from 'bcrypt';
import User from '../models/User.js';
import EmailService from './emailservice.js';
import logger from '../util/logger.js';
import config from '../config/index.js';
import JWT from 'jsonwebtoken';

const getUserForPassportLocalStrategy = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (user && user.provider !== 'EMAIL') {
      return {
        message: `Your account was registered using ${user.provider}`,
        error: true,
        user: false,
      };
    }
    let match;
    if (user) match = await bcrypt.compare(password, user.encrypted_password);
    if (!match || !user)
      return {
        user: false,
        message: 'Incorrect username or password',
        error: true,
      };
    if (!user.confirmed_at)
      return {
        message: 'Verify your email before logging in',
        error: true,
        user: false,
      };
    return {
      user: user,
      message: 'User logged in successfully',
      error: false,
    };
  } catch (error) {
    return {
      user: false,
      message: 'An error occured while proccessing your request',
      error: true,
    };
  }
};

const signUpWithEmailPassword = async (
  firstName,
  lastName,
  email,
  mobileNo,
  password,
) => {
  try {
    if (
      firstName.length > 40 ||
      lastName.length > 40 ||
      email.length > 40 ||
      mobileNo.length > 40 ||
      password.length > 40
    )
      return {
        message: 'No field should have length greater than 40',
        error: true,
      };
    if (password.length < 6)
      return { error: true, message: 'Password must be atleast 6 characters' };
    const user = await User.findOne({ email: email });
    if (user?.email === email)
      return { error: true, message: 'This email is already registered' };
    const hash = await bcrypt.hash(password, 15);
    const created_user = await User.create({
      email,
      encrypted_password: hash,
      first_name: firstName,
      last_name: lastName,
      mobile_no: mobileNo,
      provider: 'EMAIL',
    });
    logger.info(`New user created ${created_user}`);
    await EmailService.sendSignUpEmail(created_user);
    return { error: false, message: 'User signed up successfully' };
  } catch (error) {
    logger.log('error', 'authservice:signupwithemailpassword %O', error);
    return {
      error: true,
      message: 'An error occured while processing your request',
    };
  }
};

const getUserForPassportGoogleSignUpStrategy = async (
  email,
  firstName,
  lastName,
) => {
  try {
    const user = await User.findOne({ email: email });
    if (user && user?.email === email)
      return {
        user: null,
        message: 'User with this email is already registered',
        error: true,
      };
    const createdUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      provider: 'GOOGLE',
      email: email,
    });
    return {
      user: createdUser,
      message: 'Signed up successfully',
      error: false,
    };
  } catch (error) {
    logger.log(
      'error',
      'authservice:getuserforpassportgooglesignupstrategy %O',
      error,
    );
    return {
      user: undefined,
      message: 'An error occured while processing your request',
      error: true,
    };
  }
};

const getUserForPassportGoogleLoginStrategy = async (email) => {
  try {
    const user = await User.findOne({ email: email, provider: 'GOOGLE' });
    if (!user)
      return {
        user: undefined,
        message:
          'Your google account is not connected with your cakeomania account',
        error: true,
      };
    return {
      user: user,
      message: 'Logged in successfully',
      error: false,
    };
  } catch (error) {
    logger.log(
      'error',
      'authservice:getuserforpassportgoogleloginstrategy %O',
      error,
    );

    return {
      user: undefined,
      message: 'An error occured while processing your request',
      error: true,
    };
  }
};

const generateAuthToken = (user) => {
  logger.info(
    'authservice:generateauthtoken Generating token for user: %s',
    user.id,
  );
  return JWT.sign({ username: user.username }, config.TOKEN_SECRET, {
    expiresIn: `${config.TOKEN_VALIDITY_MINUTES}m`,
  });
};

const generateAndWriteRefreshToken = async (user) => {
  logger.info(
    'authservice:generaterefreshtoken Generating token for user: %s',
    user.id,
  );
  const token = JWT.sign(
    { username: user.username },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: `${config.REFRESH_TOKEN_VALIDITY_DAYS}d`,
    },
  );
  try {
    await User.updateOne({ email: user.email }, { refresh_token: token });
  } catch (error) {
    logger.log('error', 'authservice:generaterefreshtoken %O', error);
  }
  return token;
};

const getUserByUserName = async (username) => {
  try {
    return await User.findOne({ username: username });
  } catch (error) {
    logger.log('error', 'userservice:auth:getuserbyusername %O', error);
    return null;
  }
};

export default {
  getUserForPassportLocalStrategy,
  getUserForPassportGoogleLoginStrategy,
  getUserForPassportGoogleSignUpStrategy,
  generateAndWriteRefreshToken,
  getUserByUserName,
  generateAuthToken,
  signUpWithEmailPassword,
};
