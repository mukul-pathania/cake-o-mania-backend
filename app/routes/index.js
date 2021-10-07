import { Router } from 'express';
import authRoutes from './auth.routes.js';
import cartRoutes from './cart.routes.js';
import searchRoutes from './search.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/search', searchRoutes);

export default router;
