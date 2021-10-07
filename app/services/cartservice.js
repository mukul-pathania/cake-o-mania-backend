import Cart from '../models/Cart.js';

const getCartData = async (user) => {
  try {
    const dbdata = await Cart.find({ user: user });
    return dbdata;
  } catch (error) {
    return { message: error };
  }
};

const addToCart = async (item, user, total_price) => {
  console.log('items : ', item);
  console.log('user : ', user);
  console.log('total_price : ', total_price);

  const cart = new Cart({
    items: item,
    user: user,
    total_price: total_price,
  });

  try {
    const response = await cart.save();
    return response;
  } catch (error) {
    const response = { message: error };
    return response;
  }
};

const removeFromCart = async (id) => {
  const response = await Cart.deleteOne({ _id: id });
  return response;
};

export default { getCartData, addToCart, removeFromCart };
