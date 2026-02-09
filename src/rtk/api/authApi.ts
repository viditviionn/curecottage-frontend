import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./config";

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  profileImageUrl: string | null;
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  hostDetails?: unknown | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  aadhar?: string;
  profileImageUrl?: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export type UpdateUserRequest = {
  userId: string;
  body: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; 
  };
};

export type UpdateUserResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth_token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Profile"], 
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    userProfile: builder.query<User, void>({
      query: () => "/auth/profile",
      transformResponse: (response: ProfileResponse) => response.data.user,
      providesTags: ["Profile"], 
    }),

    // ✅ PUT /users/:id
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ userId, body }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"], 

      async onQueryStarted({ body }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            authApi.util.updateQueryData("userProfile", undefined, (draft) => {
              Object.assign(draft, data.data.user);
            })
          );
        } catch {
          // ignore
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUserProfileQuery,
  useUpdateUserMutation, 
} = authApi;