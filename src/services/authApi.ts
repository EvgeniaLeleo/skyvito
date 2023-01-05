import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { RootState } from '../store/store'
import { Credentials, User, UserTokens } from '../types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.access_token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<UserTokens, Credentials>({
      query: (body: Credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body,
        // {
        // ...arg,
        // returnSecureToken: true,
        // },
      }),
    }),
    register: build.mutation<User, Credentials>({
      query: (body: Credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),

    // getCurrentUser: build.query<User, void>({
    //   query() {
    //     return {
    //       url: 'user',
    //       headers: { Authorization: `Bearer ${TOKEN}` },
    //     }
    //   },
    //   providesTags: () => [{ type: 'User', id: 'UserDetails' }],
    // }),
    // changeUserDetails: build.mutation<User, ChangeUserDetailsArg>({
    //   query: (arg: ChangeUserDetailsArg) => ({
    //     url: 'user',
    //     method: 'PATCH',
    //     headers: { Authorization: `Bearer ${TOKEN}` },
    //     body: {
    //       ...arg,
    //       // returnSecureToken: true,
    //     },
    //   }),
    //   invalidatesTags: [{ type: 'User', id: 'UserDetails' }],
    // }),
    // uploadUserAvatar: build.mutation<void, any>({
    //   query: ({ body }) => ({
    //     url: 'user/avatar',
    //     headers: { Authorization: `Bearer ${TOKEN}` },
    //     method: 'POST',
    //     body: body,
    //   }),
    //   invalidatesTags: [{ type: 'User', id: 'UserDetails' }],
    //   // invalidatesTags: (result, error, arg) => [
    //   //   { type: 'UserCourse', id: arg.arg.courseId },
    //   //   { type: 'UserCourse', id: 'LIST' },
    //   //   'User',
    //   // ],
    // }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
