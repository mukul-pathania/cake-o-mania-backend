import { Router } from 'express';
import cartControllers from '../controllers/cart.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = Router();

router.use(authMiddleware.authCheckMiddleware);
router.get('/getcart', cartControllers.getCart);
router.post('/addtocart', cartControllers.addToCart);
router.post('/delete', cartControllers.removeFromCart);

export default router;
