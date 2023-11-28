import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const loginAPI = createApi({
  reducerPath: "login",
  tagTypes: ["login"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://831e-182-191-132-2.ngrok.io/",
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: ({ email, pass }) => ({
        url: `/auth/login?email=${email}&password=${pass}`,
        method: "POST",
      }),
      invalidatesTags: ["login"],
    }),
  }),
});

export const { useUserLoginMutation } = loginAPI;
export default loginAPI;
