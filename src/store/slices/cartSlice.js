import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    // addProduct(state, action){

    //     state.products.push(action.payload)
    //     state.totalPrice = state.products.reduce((sum, el)=>{
    //         return el.price + sum
    //     }, 0)
    // },
    addProduct(state, action) {
      const findProduct = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (findProduct) {
        findProduct.count++;
      }else{
        state.products.push({
            ...action.payload, 
            count: 1           
        })
      }
      state.totalPrice = state.products.reduce((sum, el) => {
        return el.price + sum;
      }, 0);
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (obj) => obj.id !== action.payload
      );
    },
    clearBasket(state, _) {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, clearBasket } = cartSlice.actions;
export default cartSlice.reducer;
