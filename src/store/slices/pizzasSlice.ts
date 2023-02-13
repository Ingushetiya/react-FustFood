import { CartItem } from './cartSlice';
import { RootState } from './../index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};
interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'succes' | 'error';
}
const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

type FetchPizzasArgs = Record<string, string>;

export const getPizzas = createAsyncThunk('pizza/getPizza', async (params: FetchPizzasArgs) => {
  const { order, sortBy, category, searchValue, currentPage } = params;
  const { data } = await axios.get(
    `https://63bb21d2cf99234bfa53c0bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`,
  );
  return data as CartItem[];
});
const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [getPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [getPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [getPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});
export const selectPizzaData = (state: RootState) => state.pizzas.items;
export const statusState = (state: RootState) => state.pizzas.status;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
