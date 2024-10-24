import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const manager = createApi({
  reducerPath: "manager",
  tagTypes: ["managers", "groups"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    Create_Manager: builder.mutation({
      query: ({ adminID, data }) => {
        return {
          url: `/Auth/create_manager_by_admin/${adminID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["managers"],
    }),

    Managers: builder.query({
      query: ({ adminID }) => {
        return {
          url: `/branch/get_branch_managers/${adminID}`,
          method: "GET",
        };
      },
      providesTags: ["managers"],
    }),

    CreateGroup: builder.mutation({
      query: ({ BranchManagerID, BranchID, data }) => {
        return {
          url: `/riders_group/create_riders_group/${BranchManagerID}/${BranchID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["groups"],
    }),

    GetGroup: builder.query({
      query: (BranchManagerID) => {
        return {
          url: `/riders_group/get_riders_group/${BranchManagerID}`,
          method: "GET",
        };
      },
      providesTags: ["groups"],
    }),

    GetGroupByAdmin: builder.query({
      query: ({ AdminId }) => {
        return {
          url: `/riders_group/GetRidersGroupForAdmin/${AdminId}`,
          method: "GET",
        };
      },
      providesTags: ["groups"],
    }),

    getRiderGroup: builder.query({
      query: (BranchID) => {
        return {
          url: `/riders_group/get_riders_group_by_branch/${BranchID}`,
          method: "GET",
        };
      },
    }),
    getAllUserByBranch: builder.query({
      query: (branchId) => {
        return {
          url: `/auth/get_branch_user/${branchId}`,
          method: "GET",
        };
      },
      providesTags: ["groups"],
    }),
    addBulkRatelist: builder.mutation({
      query: ({ data, branchID }) => {

        console.log(branchID)

        return {
          url: `Auth/bulk-create-ratelist/${branchID}`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["groups"],

    }),
  }),
});
export const {
  useCreate_ManagerMutation,
  useManagersQuery,
  useCreateGroupMutation,
  useGetGroupQuery,
  useGetGroupByAdminQuery,
  useGetRiderGroupQuery,
  useGetAllUserByBranchQuery,
  useAddBulkRatelistMutation
} = manager;

export default manager;
