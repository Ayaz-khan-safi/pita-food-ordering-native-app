import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers : {
    increment: (state)=> state + 1,
    decrement: (state)=> state - 1
  }
})

export const {increment, decrement} = counterSlice.actions
export const selectCounter = (state)=> state.counter
export default counterSlice.reducer