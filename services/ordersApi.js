import { baseAPI } from "./base-api";
import { ORDERS } from "./tags";

export const ordersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    findSpecificOrders: builder.query({
      query: (params) => {
        const { page, limit, statusOrder } = params;
        return {
          url: `/orders/findAll${`?page=${page}&limit=${limit}&orderStatus=${statusOrder}`} `,
          method: "GET",
        };
      },
      providesTags: [ORDERS],
    }),
    allOrders: builder.query({
      query: () => ({
        url: `/orders/findAll`,
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    findOneOrder: builder.query({
      query: ({ id }) => ({
        url: `/orders/findOne/${id}`,
        method: "GET",
      }),
      providesTags: [ORDERS],
    }),
    orderUpdate: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/update/${id}`,
        method: "PATCH",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [ORDERS],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAllOrdersQuery,
  useFindSpecificOrdersQuery,
  useFindOneOrderQuery,
  useOrderUpdateMutation,
} = ordersAPI;
