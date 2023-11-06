import { baseAPI } from "./base-api";

export const loginAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, pass }) => ({
        url: `/auth/login?email=${email}&password=${pass}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginAPI;
