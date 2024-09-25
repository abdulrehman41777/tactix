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

  }),
});
export const { useCreate_ManagerMutation, useManagersQuery, useCreateGroupMutation, useGetGroupQuery, useGetGroupByAdminQuery } = manager;

export default manager;
