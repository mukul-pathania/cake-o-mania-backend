import { Router } from 'express';
const router = Router();
import cartControllers from '../controllers/cart.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';
import authControllers from '../controllers/auth.controllers.js';

router.get('/getcart', cartControllers.getCart);
router.post('/addtocart', authMiddleware.authCheckMiddleware, authControllers.verify, cartControllers.addToCart);
router.delete('/delete', cartControllers.removeFromCart);

export default router;
