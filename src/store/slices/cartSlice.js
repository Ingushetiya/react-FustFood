import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const findProduct = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = state.products.reduce((sum, el) => {
        return (el.price * el.count) + sum;
      }, 0);
    },
    minusProduct(state, action) {
      const findProduct = state.products.find(
        (item) => item.id === action.payload
      );
      if (findProduct) {
        findProduct.count--;
      }
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (obj) => obj.id !== action.payload
      );
    },
    clearBasket(state, action) {
      state.products = action.payload;
      state.totalPrice = 0
    },
  },
});

export const selectCart = (state) => state.cartSlice
export const selectCartItemById = (id) => (state) => state.cartSlice.products.find(item => item.id === id)

export const { addProduct, removeProduct, minusProduct, clearBasket } = cartSlice.actions;
export default cartSlice.reducer;
