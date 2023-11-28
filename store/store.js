import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import loginAPI from "../services/loginApi";
import ordersAPI from "../services/ordersApi";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [ordersAPI.reducerPath]: ordersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginAPI.middleware, ordersAPI.middleware),
});

export default store;
