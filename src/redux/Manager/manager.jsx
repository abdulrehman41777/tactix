import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const manager = createApi({
  reducerPath: "manager",
  tagTypes: ["managers"],
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
  }),
});
export const { useCreate_ManagerMutation, useManagersQuery } = manager;

export default manager;
