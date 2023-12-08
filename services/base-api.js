import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import * as SecureStore from "expo-secure-store";
import { TAGS } from "./tags";
import { EXPO_DEFAULT_BASE_URL } from "@env";

const baseQuery = fetchBaseQuery({
  // baseUrl: EXPO_DEFAULT_BASE_URL,
  baseUrl: "https://1f37-115-186-189-40.ngrok.io",
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
