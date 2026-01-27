import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./config";

export const healthApi = createApi({
  reducerPath: "healthApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getHealthStatus: builder.query<string, void>({
      query: () => "/health",
    }),
  }),
});

export const { useGetHealthStatusQuery } = healthApi;
