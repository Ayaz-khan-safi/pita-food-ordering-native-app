import { baseAPI } from "./base-api";
import { ORDERS } from "./tags";

export const ordersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    allOrders: builder.query({
      query: () => ({
        url: "/orders/findAll?page=1&limit=100",
        method: "GET",
      }),
      providesTags: [ORDERS],
    }),
    findOneOrder: builder.query({
      query: ({ id }) => ({
        url: `/orders/findOne/${id}`,
        method: "GET",
      }),
      providesTags: [ORDERS],
    }),
  }),
});

export const { useAllOrdersQuery, useFindOneOrderQuery } = ordersAPI;
