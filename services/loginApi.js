import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const loginAPI = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://2d9b-182-191-129-82.ngrok.io/",
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
