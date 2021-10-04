// import config from './config/index.js';
import cartService from '../services/cartservice.js';

const getCart = async (req, res) => {
  const data = await cartService.getCartData();
  return res.json({ data: data });
};

const addToCart = async (req, res) => {
  const data = {
    item: {
      cake: 'DONUT',
      quantity: '5',
      message: 'None',
    },
    user: 'Mukul',
    total_price: '400',
  };

  const response = cartService.addToCart(data);
  return res.json({ data_sent: response });
};

export default { getCart, addToCart };
