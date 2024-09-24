import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const branch = createApi({
  reducerPath: "branch",
  tagTypes: ["branch"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    Add_branch: builder.mutation({
      query: ({ superAdminID, data }) => {
        return {
          url: `/branch/create_branch/${superAdminID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["branch"],
    }),
    All_branches: builder.query({
      query: (superAdminID) => {
        return {
          url: `/branch/get_all_branches_for_Superadmin/${superAdminID}`,
          method: "GET",
        };
      },
      providesTags: ["branch"],
    }),

    assignBranchToAdmin: builder.mutation({
      query: ({ superAdminId, branchId, data }) => {


        return {
          url: `/branch/asign_branches_to_admin/${superAdminId}/${branchId}`,
          method: "PATCH",
          body: data
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

    branchesByAdmin: builder.query({
      query: (AdminId) => {
        return {
          url: `branch/get_admin_branches/${AdminId}`,
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
  useAssignBranchToAdminMutation,
  useBranchesByAdminQuery
} = branch;

export default branch;
