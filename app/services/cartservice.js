import Cart from '../models/Cart.js';

const getCartData = async (user) => {
  try {
    const dbdata = await Cart.find({ user: '61619d5d02cc6947f600e03c' });
    return dbdata;
  } catch (error) {
    return { message: error };
  }
};

const addToCart = async (item, user, total_price) => {
  console.log(item);
  const cart = new Cart({
    items: item,
    user: user,
    total_price: total_price,
  });

  try {
    const response = await cart.save();
    return { respose: response, user: user };
  } catch (error) {
    const response = { message: error };
    return response;
  }
};

const removeFromCart = async (id) => {
  const response = await Cart.deleteOne({ _id: '61619d5d02cc6947f600e03c' });
  return response;
};

export default { getCartData, addToCart, removeFromCart };
