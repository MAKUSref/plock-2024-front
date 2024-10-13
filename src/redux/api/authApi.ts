import { ActivateAccountSchema, LoginSchema, User, UserBase } from "@/types/user";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelfInfo: builder.query<User, void>({
      query: () => "/user/self/info",
      providesTags: ["me"],
    }),
    login: builder.mutation<{ accessToken: string }, LoginSchema>({
      query: (data) => ({
        method: "POST",
        url: "/auth/login",
        body: data,
      }),
      invalidatesTags: ["me", "course"],
    }),
    activateAccount: builder.mutation<
      { accessToken: string },
      ActivateAccountSchema
    >({
      query: (data) => ({
        method: "PUT",
        url: "/auth/profile/activate",
        body: data,
      }),
      invalidatesTags: ["me"],
    }),
    signIn: builder.mutation<{ accessToken: string }, UserBase>({
      query: (data) => ({
        method: "POST",
        url: "/user",
        body: data,
      }),
      invalidatesTags: ["me"],
    }),
  }),
});

export const {
  useGetSelfInfoQuery,
  useLoginMutation,
  useActivateAccountMutation,
  useSignInMutation,
} = authApi;
