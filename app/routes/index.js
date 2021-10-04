import { Router } from 'express';
import authRoutes from './auth.routes.js';
import cartRoutes from './cart.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);

export default router;
