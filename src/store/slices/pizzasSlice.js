import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    items: []
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
        [getPizzas.pending]: (state, action)=>{
            console.log("Идет отравка запроса");
        },
        [getPizzas.fulfilled]: (state, action)=>{
            
        },
        [getPizzas.rejected]: (state, action) =>{

        }
    }
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer