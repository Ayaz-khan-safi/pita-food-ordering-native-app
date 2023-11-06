import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://fb87-154-192-17-28.ngrok.io/",
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});
