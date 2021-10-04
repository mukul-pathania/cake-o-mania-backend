const getCartData = () => {
  const data = {
    object1: {
      items: {
        item1: {
          cake: 'CAKE',
          quantity: '1',
          message: 'Happy birthday Mofo',
        },
        item2: {
          cake: 'CAKE',
          quantity: '3',
          message: 'Happy birthday Bois',
        },
      },
      user: 'Rohit',
      total_price: '1240',
    },
  };

  return data;
};

const addToCart = (data) => {
  const { item, user, total_price } = data;
  console.log('items : ', item);
  console.log('user : ', user);
  console.log('total_price : ', total_price);
  return data;
};

export default { getCartData, addToCart };
