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
      providesTags: [ORDERS],
    }),
    findOneOrder: builder.query({
      query: ({ id }) => ({
        url: `/orders/findOne/${id}`,
        method: "GET",
      }),
      providesTags: [ORDERS],
    }),
    orderUpdate: builder.mutation({
      query: ({id, ...updateOrder}) => ({
        url: `/orders/update/${id}`,
        method: "PATCH",
        body: JSON.stringify(updateOrder),
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
