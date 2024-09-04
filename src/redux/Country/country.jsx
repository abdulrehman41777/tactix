import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const country = createApi({
  reducerPath: "country",
  tagTypes: ["country"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    Add_country: builder.mutation({
      query: ({ id, token, data }) => {
        return {
          url: `/api/countries/${id}/add-country`,
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["country"],
    }),
    All_country: builder.query({
      query: () => {
        return {
          url: `/api/countries/all-countries`,
          method: "GET",
        };
      },
      providesTags: ["country"],
    }),
    Add_State: builder.mutation({
      query: ({ id, token, data }) => {
        return {
          url: `/api/state/${id}/create-state`,
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["country"],
    }),
    All_State: builder.query({
      query: (countryID) => {
        return {
          url: `/api/state/${countryID}/get-states`,
          method: "GET",
        };
      },
      providesTags: ["country"],
    }),
    Add_City: builder.mutation({
      query: ({ id, token, data }) => {
        return {
          url: `/api/cities/${id}/create-city`,
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["country"],
    }),
    All_City: builder.query({
      query: (stateID) => {
        return {
          url: `/api/cities/${stateID}/get-cities`,
          method: "GET",
        };
      },
      providesTags: ["country"],
    }),
    All_Country_Data: builder.query({
      query: () => {
        return {
          url: `/api/super-admin/get-pop-cities`,
          method: "GET",
        };
      },
      providesTags: ["country"],
    }),
  }),
});
export const {
  useAdd_countryMutation,
  useAll_countryQuery,
  useAdd_StateMutation,
  useAll_StateQuery,
  useAdd_CityMutation,
  useAll_CityQuery,
  useAll_Country_DataQuery,
} = country;

export default country;
