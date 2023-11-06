import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import loginAPI from "../services/login-api";
import ordersAPI from "../services/orders-api";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [ordersAPI.reducerPath]: ordersAPI.reducer,
  },
  middleware: getDefaultMiddleware().concat(loginAPI.middleware, ordersAPI.middleware),
});

export default store;
