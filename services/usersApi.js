import { baseAPI } from "./base-api";

export const usersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    usersList: builder.query({
      query: ({ limit, page, role }) => ({
        url: `/users/findAll?page=${page}&limit=${limit}&role=${role}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUsersListQuery } = usersApi;
