import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const percel = createApi({
  reducerPath: "parcel",
  tagTypes: ["parcel", "tracking"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),

  endpoints: (builder) => ({
    createParcel: builder.mutation({
      query: (data) => {
        return {
          url: "/parcel/create-parcel",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["parcel"],
    }),
    Branch_parcel: builder.query({
      query: (branchID) => {
        return {
          url: `/parcel/get-parcels/${branchID}`,
          method: "GET",
        };
      },
      providesTags: ["parcel"],
    }),
    All_parcel: builder.query({
      query: () => {
        return {
          url: `/parcel/all-parcels`,
          method: "GET",
        };
      },
      providesTags: ["parcel"],
    }),
    User_parcel: builder.query({
      query: (id) => {
        return {
          url: `/parcel/created-parcels/${id}`,
          method: "GET",
        };
      },
      providesTags: ["parcel"],
    }),
    Assign_Parcel: builder.mutation({
      query: ({ branchID, parcelID, data }) => {
        return {
          url: `/assignments/${branchID}/assign-parcel/${parcelID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["parcel"],
    }),
    Parcel_Assigned: builder.query({
      query: (branchID) => {
        return {
          url: `/assignments/assigned-parcels/${branchID}`,
          method: "GET",
        };
      },
      providesTags: ["parcel"],
    }),
    Parcel_Status: builder.mutation({
      query: ({ assignmentID, data }) => {
        return {
          url: `/assignments/update-status/${assignmentID}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["parcel", "tracking"],
    }),
    Rider_Parcel: builder.query({
      query: (riderID) => {
        return {
          url: `assignments/assigned-to-riders/${riderID}`,
          method: "GET",
        };
      },
      providesTags: ["parcel"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useBranch_parcelQuery,
  useAll_parcelQuery,
  useUser_parcelQuery,
  useAssign_ParcelMutation,
  useParcel_AssignedQuery,
  useParcel_StatusMutation,
  useRider_ParcelQuery,
} = percel;

export default percel;
