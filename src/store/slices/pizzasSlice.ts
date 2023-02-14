import { PayloadAction } from '@reduxjs/toolkit';
// import { CartItem } from './cartSlice';
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
export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}
interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  search: string;
  category: string;
  currentPage: string;
};
export const getPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/getPizza',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://63bb21d2cf99234bfa53c0bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);
const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(getPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCES;
    });
    builder.addCase(getPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },

  // [getPizzas.pending]: (state) => {
  //   state.status = 'loading';
  //   state.items = [];
  // },
  // [getPizzas.fulfilled]: (state, action) => {
  //   state.items = action.payload;
  //   state.status = 'success';
  // },
  // [getPizzas.rejected]: (state) => {
  //   state.status = 'error';
  //   state.items = [];
  // },
});
export const selectPizzaData = (state: RootState) => state.pizzas.items;
export const statusState = (state: RootState) => state.pizzas.status;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
