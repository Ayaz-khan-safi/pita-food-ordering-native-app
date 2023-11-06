import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import { baseAPI } from "../services/base-api";
import { loginAPI } from "../services/login-Api";
import { ordersAPI } from "../services/orders-api";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [ordersAPI.reducerPath]: ordersAPI.reducer,
  },
});

export default store;
