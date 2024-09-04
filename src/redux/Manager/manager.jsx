import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const manager = createApi({
  reducerPath: "manager",
  tagTypes: ["managers"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    Create_Manager: builder.mutation({
      query: ({ id, branch_id, token, data }) => {
        return {
          url: `/api/manager/${id}/manager-signup/${branch_id}`,
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["managers"],
    }),
    Managers: builder.query({
      query: ({ userID, branchID }) => {
        return {
          url: `/api/user/${userID}/branch-managers/${branchID}`,
          method: "GET",
        };
      },
      providesTags: ["managers"],
    }),
  }),
});
export const { useCreate_ManagerMutation, useManagersQuery } = manager;

export default manager;
