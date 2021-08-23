import bcrypt from 'bcrypt';
import User from '../models/User.js';

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

const signUpWithEmailPassword = async (username, email, password) => {
  try {
    if (username.length > 40 || email.length > 40 || password.length > 40)
      return {
        message: 'No field should have length greater than 40',
        error: true,
      };
    if (username.length < 4)
      return {
        error: true,
        message: 'Username must contain atleast 4 characters',
      };
    if (password.length < 6)
      return { error: true, message: 'Password must be atleast 6 characters' };
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user?.email === email)
      return { error: true, message: 'This email is already registered' };
    if (user?.username === username)
      return { error: true, message: 'This username is already taken' };
    const hash = await bcrypt.hash(password, 15);
    const created_user = await User.create({
      email,
      encrypted_password: hash,
      username,
      provider: 'EMAIL',
    });
    console.log(created_user);
    // EmailService.sendSignUpEmail(created_user);
    return { error: false, message: 'User signed up successfully' };
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
    };
  }
};

export default { getUserForPassportLocalStrategy, signUpWithEmailPassword };
