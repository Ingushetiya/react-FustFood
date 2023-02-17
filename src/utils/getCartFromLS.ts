import { calcTatlPrice } from './calcTotalPrice';
export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const products = data ? JSON.parse(data) : [];
  const totalPrice = calcTatlPrice(products);
  return {
    products,
    totalPrice,
  };
};
