import { CartSliseState, CartItem } from './types';
import { calcTatlPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const { products, totalPrice } = getCartFromLS();
const initialState: CartSliseState = {
  totalPrice,
  products,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const findProduct = state.products.find((item) => item.id === action.payload.id);
      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTatlPrice(state.products);
    },
    minusProduct(state, action: PayloadAction<string>) {
      const findProduct = state.products.find((item) => item.id === action.payload);
      if (findProduct) {
        findProduct.count--;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((obj) => obj.id !== action.payload);
    },
    clearBasket(state, action: PayloadAction<[]>) {
      state.products = action.payload;
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, minusProduct, clearBasket } = cartSlice.actions;
export default cartSlice.reducer;
