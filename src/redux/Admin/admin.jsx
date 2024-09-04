import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const admin = createApi({
  reducerPath: "admin",
  tagTypes: ["admins"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    Create_Admin: builder.mutation({
      query: ({ id, branch_id, token, data }) => {
        return {
          url: `/api/admin/${id}/admin-signup/${branch_id}`,
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["admins"],
    }),
    All_Admins: builder.query({
      query: (id) => {
        return {
          url: `/api/admin/get-admins`,
          method: "GET",
        };
      },
      providesTags: ["admins"],
    }),
  }),
});
export const { useCreate_AdminMutation, useAll_AdminsQuery } = admin;

export default admin;
