export type Pizza = {
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
export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  search: string;
  category: string;
  currentPage: string;
};
