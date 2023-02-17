import { getPizzas } from './asyncActions';
import { Pizza, Status, PizzaSliceState } from './type';

import { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

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

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
