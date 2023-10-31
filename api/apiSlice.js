import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from 'expo-secure-store';

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gateway-dev.personnellibrary.co.uk/",
    prepareHeaders: async (headers, { getState }) => {
      const token = 'eyJraWQiOiJIVGZ2T3hONmpVUHIzS1lKU0pqQkRKaW40VFhPa2pOcG1TVFpBVmNNUmtFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMDc2ZTJkMC0xZDUwLTQ4MWEtYTcwZC01NTZkZjcwOGFiNWEiLCJkZXZpY2Vfa2V5IjoiZXUtd2VzdC0yXzdjNTJhN2E0LTMyZDYtNDhmNC1iMjJiLWRhZWI4NGU4MTdmZCIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0yX3ZtbG5ya2FoYyIsImNsaWVudF9pZCI6IjYyajUzMW1nZGYyaTIyaGphazFnNXFxdjRpIiwib3JpZ2luX2p0aSI6ImYyNGM3NzkwLTgzMjMtNGEyMC1iNzEyLTkxMmYwNWIyNjZhZiIsImV2ZW50X2lkIjoiZTFhZTBhZmUtN2FlOS00OGJjLThjZDMtNGVkYzhjY2VhN2MyIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY5ODc2MTk0NCwiZXhwIjoxNjk4NzgzNTQ0LCJpYXQiOjE2OTg3NjE5NDQsImp0aSI6ImIwNTFmYjQ1LTA1MDgtNDRkNy1iMjkyLWQyYWIyMWJkNGVhMCIsInVzZXJuYW1lIjoiYzA3NmUyZDAtMWQ1MC00ODFhLWE3MGQtNTU2ZGY3MDhhYjVhIn0.wkXn6UHGNQlM7gbdeeXQVN2n_KSkEN0lA8jPxcSQohDnTd00LPcvZhwpBHh2NMHEtSIcRuTX_tdgFFdja2CZHXEFaM0nCnsnPeXifMj7h2hoIIkOgLvu-raUmpSUkhCbGIfZkk8gatFSNrTqkkGKrYSptpaMDDr4-C5qVPB66dPaNSPNdevvXcw2jKSrdsx1cq8F46i9tm-VXxZnn4HCayZy-997tJ94dyPSt9qdMrpkr7Dr13mGeiqsX7wIdTnohNgwJ5NxscGQHaaaTBYCh6ZNjjCYq2vKfRIC1q3ppzTcWhgyCx9ju4GUUNXVOdPxraMYgoJwaixO_QSUO9-RIQ'
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.query({
      query: (arg) => {
        return{
          url: `employees?limit=1&offset=0`,
          method: "GET",
        }
      }
    })
  }),
});

export const { useLoginUserQuery } = api;
