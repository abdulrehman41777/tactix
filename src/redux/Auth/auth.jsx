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
          url: "/api/user/login",
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
  }),
});
export const {
  useLoginMutation,
  useSignupMutation,
  useUsersQuery,
  useUpdate_ProfileMutation,
} = auth;

export default auth;
