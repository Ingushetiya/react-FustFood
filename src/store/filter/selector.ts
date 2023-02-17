import { RootState } from '../index';

export const selectSort = (state: RootState) => state.filterSlice;
export const currentPageState = (state: RootState) => state.filterSlice;
export const categoryIdState = (state: RootState) => state.filterSlice;
export const searchValueState = (state: RootState) => state.filterSlice;
