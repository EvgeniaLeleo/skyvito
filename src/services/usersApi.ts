import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL, TOKEN } from '../constants'
import { ChangeUserDetailsArg, User } from '../types'

export const usersApi = createApi({
  reducerPath: 'users/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).token.access_token
    //   if (token) headers.set('authorization', `Bearer ${token}`)
    //   return headers
    // },
  }),
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query() {
        return {
          url: 'user',
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      },
    }),
    changeUserDetails: build.mutation<User, ChangeUserDetailsArg>({
      query: (arg: ChangeUserDetailsArg) => ({
        url: 'user',
        method: 'PATCH',
        headers: { Authorization: `Bearer ${TOKEN}` },
        body: {
          ...arg,
          // returnSecureToken: true,
        },
      }),
    }),
  }),
})

export const { useGetCurrentUserQuery, useChangeUserDetailsMutation } = usersApi
