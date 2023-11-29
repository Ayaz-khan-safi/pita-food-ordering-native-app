import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import { baseAPI } from "../services/base-api";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export default store;
