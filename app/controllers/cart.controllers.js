import cartService from '../services/cartservice.js';

const getCart = async (req, res) => {
  const { _id: userid } = req.user;
  const data = await cartService.getCartData(userid);
  return res.json({ data });
};

const addToCart = async (req, res) => {
  const { items, total_price } = req.body;
  const { _id: userid } = req.user;
  console.log('user', req.user);
  const response = await cartService.addToCart(items, userid, total_price);
  return res.json({ data_sent: response });
};

const removeFromCart = async (req, res) => {
  const { user, id } = req.body;
  const response = await cartService.removeFromCart(user, id);
  return res.json({ message: response });
};

export default { getCart, addToCart, removeFromCart };
