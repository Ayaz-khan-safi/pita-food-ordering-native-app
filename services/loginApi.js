import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const loginAPI = createApi({
  reducerPath: "login",
  tagTypes: ["login"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://b10a-154-192-17-28.ngrok.io/",
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
