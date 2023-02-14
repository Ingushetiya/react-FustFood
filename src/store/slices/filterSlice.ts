import { RootState } from './../index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortPropertyEnum {
  RAITING_DESC = 'raiting',
  RAITING_ASK = '-raiting',
  TITLE_DESC = 'title',
  TITLE_ASK = '-title',
  PRICE_DESC = 'price',
  PRICE_ASK = '-price',
}
export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};
interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RAITING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});
export const selectSort = (state: RootState) => state.filterSlice.sort;
export const currentPageState = (state: RootState) => state.filterSlice.currentPage;
export const categoryIdState = (state: RootState) => state.filterSlice.categoryId;
export const searchValueState = (state: RootState) => state.filterSlice.searchValue;
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
