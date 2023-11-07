import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const loginAPI = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: ({ email, pass }) => ({
        url: `/auth/login?email=${email}&password=${pass}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useUserLoginMutation } = loginAPI;
export default loginAPI;
