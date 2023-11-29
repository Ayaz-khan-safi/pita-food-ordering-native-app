import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import * as SecureStore from "expo-secure-store";
import { TAGS } from "./tags";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
  prepareHeaders: async (headers) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: TAGS,
  endpoints: () => ({}),
});
