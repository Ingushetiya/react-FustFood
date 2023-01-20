import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    searchValue: '',
    categoryId: 0,
    currentpage: 1,
    sort: {
        name:"популярности", 
        sortProperty: "raiting"
   }
}

 const filterSlice = createSlice({
    name: "filters",
    initialState, 
    reducers: {
        setCategoryId (state, action){
            state.categoryId = action.payload
        },        
        setSort (state, action) {
            state.sort = action.payload
        }, 
        setCurrentPage (state, action){
            state.currentpage = action.payload
        }, 
        setfiltter(state, action){
            state.currentpage = Number(action.payload.currentpage)
            state.categoryId = Number(action.payload.categoryId)
            state.sort = action.payload.sort           
        }
    }
})
export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions
export default filterSlice.reducer