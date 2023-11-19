import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const ordersAPI = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://657d-116-71-186-216.ngrok.io",
    prepareHeaders: async (headers) => {
      const token = await SecureStore.getItemAsync("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    allOrders: builder.query({
      query: () => ({
        url: "/orders/findAll",
        method: "GET",
      }),
    }),
  }),
});

export const { useAllOrdersQuery } = ordersAPI;
export default ordersAPI;
