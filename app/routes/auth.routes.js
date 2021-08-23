import { Router } from 'express';
import authControllers from '../controllers/auth.controllers.js';

const router = Router();

router.post('/signup', authControllers.signUpWithEmailPassword);

router.post('/login', authControllers.loginWithEmailPassword);

router.get('/logout', authControllers.logout);

router.get('/verify', authControllers.verify);

export default router;
