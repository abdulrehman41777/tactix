import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const alluser = createApi({
  reducerPath: "alluser",
  tagTypes: ["alluser"],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    All_User: builder.query({
      query: (id) => {
        return {
          url: `/api/user/${id}/all-users`,
          method: "GET",
        };
      },
      providesTags: ["alluser"],
    }),
  }),
});
export const { useAll_UserQuery } = alluser;

export default alluser;
