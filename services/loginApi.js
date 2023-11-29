import { baseAPI } from "./base-api";
import { LOGIN } from "./tags";

export const loginAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: ({ email, pass }) => ({
        url: `/auth/login?email=${email}&password=${pass}`,
        method: "POST",
      }),
      invalidatesTags: [LOGIN],
    }),
  }),
});

export const { useUserLoginMutation } = loginAPI;
