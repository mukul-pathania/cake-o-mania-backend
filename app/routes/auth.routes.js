import { Router } from 'express';
import authControllers from '../controllers/auth.controllers.js';
import passport from 'passport';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.post('/signup', authControllers.signUpWithEmailPassword);

router.post('/login', authControllers.loginWithEmailPassword);

router.get('/logout', authControllers.logout);

router.get(
  '/verify',
  authMiddleware.authCheckMiddleware,
  authControllers.verify,
);

router.get(
  '/google/signup',
  passport.authenticate('googleSignup', {
    session: false,
    scope: ['profile', 'email'],
  }),
);

router.get('/google/signup/callback', authControllers.googleSignUpCallback);

router.get(
  '/google/login',
  passport.authenticate('googleLogin', {
    session: false,
    scope: ['profile', 'email'],
  }),
);

router.get('/google/login/callback', authControllers.googleLoginCallback);

export default router;
