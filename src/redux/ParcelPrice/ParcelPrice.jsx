import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const ParcelPrice = createApi({
  reducerPath: "ParcelPrice",
  tagTypes: ["ParcelPrice"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),

  endpoints: (builder) => ({
    Create_Parcel_Price: builder.mutation({
      query: ({ id, branchID, token, data }) => {
        return {
          url: `/weight/${id}/add-weight/${branchID}`,
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ParcelPrice"],
    }),
    Get_All_Parcel_Price: builder.query({
      query: (branchID) => {
        return {
          url: `/weight/${branchID}/get-prices`,
          method: "GET",
        };
      },
      providesTags: ["ParcelPrice"],
    }),
    Update_Parcel_Price: builder.mutation({
      query: ({ branchID, kgID, token, data }) => {
        return {
          url: `/weight/${branchID}/update-weight/${kgID}`,
          headers: { Authorization: `Bearer ${token}` },
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["ParcelPrice"],
    }),
  }),
});

export const {
  useCreate_Parcel_PriceMutation,
  useGet_All_Parcel_PriceQuery,
  useUpdate_Parcel_PriceMutation,
} = ParcelPrice;

export default ParcelPrice;
