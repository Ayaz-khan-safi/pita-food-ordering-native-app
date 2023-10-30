import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/users",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (arg) => {
        const {username, password} = arg
        console.log(username, password)
        return{
          url: `/findAll`,
          method: "Post",
          // params: {username, password},
        }
      }
    }),
    loginUser: builder.mutation({
      query: (arg) => {
        const {username, password} = arg
        console.log(username, password)
        return{
          url: "/auth/login/",
          method: "Post",
          params: {username, password},
        }
      }
    }),
    getUserJson : builder.query({
      query: (arg)=>{
        const {id} = arg
        return{
          url: "/users/",
          method: "Get",
          params: {id}
        }
      }
    })
  }),
});

export const { useGetUserQuery, useLoginUserMutation, useGetUserJsonQuery } = api;
