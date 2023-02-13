import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzas from './slices/pizzasSlice';
export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzas,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
