import Cart from '../models/Cart.js';
import Cake from '../models/Cake.js';
const getCartData = async (userid) => {
  try {
    const dbdata = await Cart.findOne({ user: userid }).populate('cake');
    if (!dbdata) return { error: true, message: 'No items in cart' };
    const cakeIds = dbdata.items.map((item) => item._id);
    const cakes = await Cake.find({ _id: { $in: cakeIds } });
    let cakedata = {};
    cakes.forEach((cake) => {
      cakedata[cake._id] = cake;
    });
    return { cart: dbdata, cakes: cakedata };
  } catch (error) {
    return { message: error };
  }
};

const addToCart = async (item, userid, total_price) => {
  console.log('CartItem :', item);

  try {
    const usercart = await Cart.findOne({ user: userid });
    if (!usercart) {
      const cart = new Cart({
        items: item,
        user: userid,
        total_price: total_price,
      });
      const response = await cart.save();
      return { respose: response, user: userid };
    } else {
      usercart.items.push(item);
      usercart.total_price += total_price;
      usercart.save();
    }
  } catch (error) {
    const response = { message: error };
    return response;
  }
};

const removeFromCart = async (user, id) => {
  const response = await Cart.deleteOne({ user: user, 'items.0._id': id });
  return response;
};

export default { getCartData, addToCart, removeFromCart };
