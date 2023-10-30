import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import { api } from "../api/apiSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(api.middleware),
})

export default store