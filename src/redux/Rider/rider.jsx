import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const rider = createApi({
  reducerPath: "rider",
  tagTypes: ["rides"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({

    Create_Rider: builder.mutation({
      query: ({ managerID, data }) => ({
        url: `/auth/create_rider_by_manager/${managerID}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rides"],
    }),

    All_Riders: builder.query({
      query: (id) => {
        return {
          url: `/branch/branch-riders/${id}`,
          method: "GET",
        };
      },
      providesTags: ["rides"],
    }),
  }),
});
export const { useCreate_RiderMutation, useAll_RidersQuery } = rider;

export default rider;
