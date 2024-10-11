import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const auth = createApi({
  reducerPath: "auth",
  tagTypes: ["auth", "update", "createUser"],
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
          url: `/auth/update-role/${userID}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["update"],
    }),
    createUser: builder.mutation({
      query: ({ BranchId, managerID, data }) => {
        console.log(data)
        return {
          url: `/auth/create_user/${BranchId}/${managerID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["createUser"],
    }),
    getAllUserByBranch: builder.query({
      query: (branchId) => {
        return {
          url: `/auth/get_branch_user/${branchId}`,
          method: "GET",
        };
      },
      providesTags: ["createUser"],
    }),
    getSingleUserByID: builder.query({
      query: (userId) => {
        console.log(userId)
        return {
          url: `/auth/get-single-user/${userId}`,
          method: "GET",
        };
      },
      // providesTags: ["createUser"],
    }),
    addBulkRatelist: builder.mutation({
      query: ({ data }) => {
        return {
          url: `Auth/bulk-create-ratelist`,
          method: "POST",
          body: data
        };
      },
    }),
    updateBulkRatelist: builder.mutation({
      query: ({ userID, data }) => {
        return {
          url: `/Auth/bulk-upload-ratelist/${userID}`,
          method: "PATCH",
          body: data
        };
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useSignupMutation,
  useUsersQuery,
  useUpdate_ProfileMutation,
  useCreateUserMutation,
  useGetAllUserByBranchQuery,
  useGetSingleUserByIDQuery,
  useAddBulkRatelistMutation,
  useUpdateBulkRatelistMutation
} = auth;

export default auth;
