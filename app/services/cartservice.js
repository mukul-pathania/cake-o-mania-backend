import Cart from '../models/Cart.js';

const getCartData = async (reqdata) => {
  const { user } = reqdata;
  const dbdata = await Cart.find({ user: user });

  return dbdata;
};

const addToCart = async (data) => {
  const { item, user, total_price } = data;
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

const removeFromCart = async (data) => {
  const productid = data._id;
  console.log(productid);
  const response = await Cart.deleteOne({ _id: productid });
  return response;
};

export default { getCartData, addToCart, removeFromCart };
