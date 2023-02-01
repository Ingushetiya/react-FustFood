import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    items: [],
    status: 'loading'
}
export const getPizzas = createAsyncThunk('pizza/getPizza', async (params)=>{
    const {order, sortBy, category, searchValue, currentPage} = params
    const {data} = await axios.get(
        `https://63bb21d2cf99234bfa53c0bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
      ) 
      return data
})
const pizzasSlice = createSlice({
    name: 'pizza',
    initialState, 
    reducers:{
        setItems(state, action){

            state.items = action.payload
        }
    },
    extraReducers:{
        [getPizzas.pending]: (state)=>{
            state.status = 'loading'
            state.items = []
        },
        [getPizzas.fulfilled]: (state, action)=>{
            state.items = action.payload
            state.status = 'success'
        },
        [getPizzas.rejected]: (state) =>{
            state.status = 'error'
            state.items = []
        }
    }
})
export const selectPizzaData = (state) => state.pizzas.items
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer