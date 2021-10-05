import { Router } from 'express';
const router = Router();
import cartControllers from '../controllers/cart.controllers.js';

router.get('/getcart', cartControllers.getCart);
router.post('/addtocart', cartControllers.addToCart);

export default router;
