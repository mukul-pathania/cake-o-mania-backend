import cartService from '../services/cartservice.js';
import authMiddleware from '../middleware/auth.middleware.js';
import authControllers from './auth.controllers.js';

const getCart = async (req, res) => {
  const { user } = req.body;
  const data = await cartService.getCartData(user);
  return res.json({ data: data });
};

const addToCart = async (req, res) => {
  const { item, total_price } = req.body;
  const {user} = req.user;
  const response = await cartService.addToCart(item, user, total_price);
  return res.json({ data_sent: response });
};

const removeFromCart = async (req, res) => {
  const productid = req.body._id;
  const response = await cartService.removeFromCart(productid);
  return res.json({ message: response });
};

export default { getCart, addToCart, removeFromCart };
