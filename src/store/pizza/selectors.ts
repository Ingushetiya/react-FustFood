import { RootState } from 'store';

export const selectPizzaData = (state: RootState) => state.pizzas;

export const statusState = (state: RootState) => state.pizzas;
