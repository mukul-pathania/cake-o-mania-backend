import cartService from '../services/cartservice.js';
import User from '../models/User.js';

const getCart = async (req, res) => {
  const user = req.params.user;
  const userdata = await User.findOne({
    email: user,
  });
  console.log(userdata._id);
  const data = await cartService.getCartData(userdata._id);
  return res.json({ data: data });
};

const addToCart = async (req, res) => {
  const { items, user, total_price } = req.body;
  console.log('user', user);
  const response = await cartService.addToCart(items, user, total_price);
  return res.json({ data_sent: response });
};

const removeFromCart = async (req, res) => {
  const { user, id } = req.body;
  const response = await cartService.removeFromCart(user, id);
  return res.json({ message: response });
};

export default { getCart, addToCart, removeFromCart };
