import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const branch = createApi({
  reducerPath: "branch",
  tagTypes: ["branch"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    Add_branch: builder.mutation({
      query: ({ id, token, data }) => {
        return {
          url: `/branch/${id}/create-branch`,
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["branch"],
    }),
    All_branches: builder.query({
      query: (token) => {
        return {
          url: `/branch/all-branch`,
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        };
      },
      providesTags: ["branch"],
    }),
    Branch_With_id: builder.query({
      query: (cityID) => {
        return {
          url: `branch/get-branches/${cityID}`,
          method: "GET",
        };
      },
      providesTags: ["branch"],
    }),
    Update_Branch: builder.mutation({
      query: ({ id, token, data }) => {
        return {
          url: `/branch/edit-branch/${id}`,
          headers: { Authorization: `Bearer ${token}` },
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["branch"],
    }),
  }),
});
export const {
  useAdd_branchMutation,
  useAll_branchesQuery,
  useBranch_With_idQuery,
  useUpdate_BranchMutation,
} = branch;

export default branch;
