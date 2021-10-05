// import config from './config/index.js';
import cartService from '../services/cartservice.js';

const getCart = async (req, res) => {
  const data = await cartService.getCartData(req.body);
  return res.json({ data: data });
};

const addToCart = async (req, res) => {
  const response = await cartService.addToCart(req.body);
  return res.json({ data_sent: response });
};

export default { getCart, addToCart };
