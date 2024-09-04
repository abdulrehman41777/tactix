import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const Tracking = createApi({
  reducerPath: "trackID",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    Track_Parcel: builder.query({

      query: (trakingId) => {
        console.log(trakingId, 'redux re');
        return {
          url: `track-your-tracking/${trakingId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLazyTrack_ParcelQuery } = Tracking;

export default Tracking;
