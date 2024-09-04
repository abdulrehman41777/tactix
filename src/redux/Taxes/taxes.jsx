import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const taxes = createApi({
  reducerPath: "taxes",
  tagTypes: ["taxes"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    Add_Taxes: builder.mutation({
      query: (data) => ({
        url: `/tax/add-tax`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["taxes"],
    }),
    Get_Taxes: builder.query({
      query: () => ({
        url: `/tax/get-tax`,
        method: "GET",
      }),
      providesTags: ["taxes"],
    }),
  }),
});
export const { useAdd_TaxesMutation, useGet_TaxesQuery } = taxes;

export default taxes;
