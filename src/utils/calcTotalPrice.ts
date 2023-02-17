import { CartItem } from 'store/cart/types';

export const calcTatlPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
