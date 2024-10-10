import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const percel = createApi({
  reducerPath: "parcel",
  tagTypes: ["parcel", "tracking", "assign_parcel", "update_assign_parcel", "transfer_parcel"],
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
      providesTags: ["assign_parcel", "update_assign_parcel", "transfer_parcel"],
    }),
    getSingleParcels: builder.query({
      query: (parcelID) => {
        return {
          url: `parcel/${parcelID}/get-single-parcel`,
          method: "GET",
        };
      },
    }),
    assign_Parcel: builder.mutation({
      query: ({ branchID, riderGroupID, data }) => {
        return {
          url: `parcel/${branchID}/${riderGroupID}/assign-parcels`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["assign_parcel"],
    }),
    update_assign_Parcel: builder.mutation({
      query: ({ assignmentID, data }) => {
        return {
          url: `assignments/update-assignment-status/${assignmentID}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["update_assign_parcel"],
    }),
    transfer_Parcel: builder.mutation({
      query: ({ assignmentID, newRiderID, newriderGroupID, assignedFromManager }) => {
        return {
          url: `assignments/transfer-assignments/${assignmentID}/${newRiderID}/${newriderGroupID}/${assignedFromManager}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["transfer_parcel"],
    }),
    get_Group_Parcel: builder.query({
      query: (riderGroupID) => {
        return {
          url: `/parcel/get-parcels-rider-group/${riderGroupID}`,
          method: "GET",
        };
      },
      providesTags: ["transfer_parcel", "update_assign_parcel", "assign_parcel"],
    }),
    get_Rider_Parcel: builder.query({
      query: ({ riderID, history }) => {
        return {
          url: `/assignments/get-rider-assignments/${riderID}?isHistory=${history}`,
          method: "GET",
        };
      },
      providesTags: ["transfer_parcel", "update_assign_parcel", "assign_parcel"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useParcel_AssignedQuery,
  useParcel_StatusMutation,
  useRider_ParcelQuery,
  useGet_User_ParcelQuery,
  useCreate_User_ParcelMutation,
  useCreate_Bulk_ParcelMutation,
  useBulk_ParcelMutation,
  useGetParcelsQuery,
  useGetSingleParcelsQuery,
  useAssign_ParcelMutation,
  useUpdate_assign_ParcelMutation,
  useTransfer_ParcelMutation,
  useGet_Group_ParcelQuery,
  useGet_Rider_ParcelQuery
} = percel;

export default percel;
