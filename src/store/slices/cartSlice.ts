import { RootState } from './../index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliseState {
  totalPrice: number;
  products: CartItem[];
}

const initialState: CartSliseState = {
  totalPrice: 0,
  products: [],
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
      state.totalPrice = state.products.reduce((sum, el) => {
        return el.price * el.count + sum;
      }, 0);
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

export const selectCart = (state: RootState) => state.cartSlice;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cartSlice.products.find((item) => item.id === id);

export const { addProduct, removeProduct, minusProduct, clearBasket } = cartSlice.actions;
export default cartSlice.reducer;
