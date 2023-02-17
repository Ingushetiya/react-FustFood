import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './type';

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
