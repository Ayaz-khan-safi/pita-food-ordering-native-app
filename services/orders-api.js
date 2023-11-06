import { baseAPI } from "./base-api";

export const ordersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/findAll",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = ordersAPI;
