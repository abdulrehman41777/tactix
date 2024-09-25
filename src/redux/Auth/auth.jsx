import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const auth = createApi({
  reducerPath: "auth",
  tagTypes: ["auth", "update"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/Auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    signup: builder.mutation({
      query: (data) => {
        return {
          url: "/api/user/user-signup",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    Users: builder.query({
      query: () => {
        return {
          url: `api/user/all-users-role`,
          method: "GET",
        };
      },
      providesTags: ["auth", "update"],
    }),
    Update_Profile: builder.mutation({
      query: ({ userID, data }) => {
        return {
          url: `/api/user/update-profile/${userID}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["update"],
    }),
    createUser: builder.mutation({
      query: ({ BranchId, data }) => {
        console.log(data)
        return {
          url: `/auth/create_user/${BranchId}`,
          method: "POST",
          body: data,
        };
      },
      // providesTags: ["alluser"],
    }),
    getAllUserByBranch: builder.query({
      query: (branchId) => {
        console.log(branchId)
        return {
          url: `/auth/get_branch_user/${branchId}`,
          method: "GET",
        };
      },
      // providesTags: ["alluser"],
    }),
  }),
});
export const {
  useLoginMutation,
  useSignupMutation,
  useUsersQuery,
  useUpdate_ProfileMutation,
  useCreateUserMutation,
  useGetAllUserByBranchQuery
} = auth;

export default auth;
