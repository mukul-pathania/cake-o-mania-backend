import { Router } from 'express';
import authRoutes from './auth.routes.js';
import cakeRoutes from './cakeroutes.js';

const router = Router();

router.use('/auth', authRoutes);

router.use('/api', cakeRoutes);

export default router;
