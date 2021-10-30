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

const addToCart = async (items, userid) => {
  console.log('CartItem :', items);
  try {
    const usercart = await Cart.findOne({ user: userid });
    if (!usercart) {
      const cart_total = get_cart_total(items);
      const cart = new Cart({
        items: items,
        user: userid,
        total_price: cart_total,
      });
      const response = await cart.save();
      return { respose: response, user: userid };
    } else {
      const cart_total = get_cart_total(items);
      items.forEach((item) => {
        usercart.items.push(item);
      });
      usercart.total_price += cart_total;
      usercart.save();
    }
  } catch (error) {
    const response = { message: error };
    return response;
  }
};

const removeFromCart = async (userid, id) => {
  try {
    const usercart = await Cart.findOne({ user: userid });
    usercart.items.forEach((item) => {
      if (item._id == id) {
        usercart.items.remove(item);
        console.log(item);
      }
    });
    const response = await usercart.save();
    return response;
  } catch (error) {
    const response = { message: error };
    return response;
  }
};

const get_cart_total = (items) => {
  let cart_total = 0;
  items.forEach((item) => {
    console.log(item);
    cart_total = cart_total + item.price_per_half_kg;
  });
  console.log(cart_total);
  return cart_total;
};

export default { getCartData, addToCart, removeFromCart };
