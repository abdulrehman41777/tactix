import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const percel = createApi({
  reducerPath: "parcel",
  tagTypes: ["parcel", "tracking"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),

  endpoints: (builder) => ({
    // Del
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
    // Del
    Branch_parcel: builder.query({
      query: (branchID) => {
        return {
          url: `/parcel/get-parcels/${branchID}`,
          method: "GET",
        };
      },
      providesTags: ["parcel"],
    }),
    // Del
    All_parcel: builder.query({
      query: () => {
        return {
          url: `/parcel/all-parcels`,
          method: "GET",
        };
      },
      providesTags: ["parcel"],
    }),
    // Del
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

    get_User_Parcel: builder.query({
      query: (userId) => {
        return {
          url: `parcel/get-user-parcel/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["parcel"],
    }),
    create_User_Parcel: builder.mutation({
      query: ({ userId, BranchId, rateListID, data }) => {
        return {
          url: `/parcel/create_parcel/${userId}/${BranchId}/${rateListID}`,
          method: "POST",
          body: data,
        };
      },
      // providesTags: ["parcel"],
    }),
    create_Bulk_Parcel: builder.mutation({
      query: ({ userId, branchID, data }) => {
        return {
          url: `parcel/bulk-parcel/${userId}/${branchID}`,
          method: "POST",
          body: data,
        };
      },
      // providesTags: ["parcel"],
    }),
    bulk_Parcel: builder.mutation({
      query: ({ userId, branchID, data }) => {
        return {
          url: `parcel/bulk-parcel-create/${userId}/${branchID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["parcel", "tracking"],
    }),
    getParcels: builder.query({
      query: (id) => {
        return {
          url: `parcel/${id}/get-parcels`,
          method: "GET",
        };
      },
    }),
    getSingleParcels: builder.query({
      query: (parcelID) => {
        return {
          url: `parcel/${parcelID}/get-single-parcel`,
          method: "GET",
        };
      },
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
  useGet_User_ParcelQuery,
  useCreate_User_ParcelMutation,
  useCreate_Bulk_ParcelMutation,
  useBulk_ParcelMutation,
  useGetParcelsQuery,
  useGetSingleParcelsQuery,
} = percel;

export default percel;
