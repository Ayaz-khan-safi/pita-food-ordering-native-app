import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const ordersAPI = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://701b-116-71-182-193.ngrok.io/",
    prepareHeaders: async (headers) => {
      const token = await SecureStore.getItemAsync("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    allOrders: builder.query({
      query: () => ({
        url: "/orders/findAll?page=1&limit=100",
        method: "GET",
      }),
    }),
    findOneOrder: builder.query({
      query: ({id})=> ({
        url: `/orders/findOne/${id}`,
        method: 'GET'
      })
    })
  }),
});

export const { useAllOrdersQuery, useFindOneOrderQuery } = ordersAPI;
export default ordersAPI;
