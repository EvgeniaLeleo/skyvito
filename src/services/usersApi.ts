import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { RootState } from '../store/store'
import { ChangeUserDetailsArg, User } from '../types'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.access_token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query() {
        return {
          url: 'user',
          // headers: { Authorization: `Bearer ${TOKEN}` },
        }
      },
      providesTags: () => [{ type: 'User', id: 'UserDetails' }],
    }),
    changeUserDetails: build.mutation<User, ChangeUserDetailsArg>({
      query: (body: ChangeUserDetailsArg) => ({
        url: 'user',
        method: 'PATCH',
        // headers: { Authorization: `Bearer ${TOKEN}` },
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'UserDetails' }],
    }),
    uploadUserAvatar: build.mutation<void, any>({
      query: ({ body }) => ({
        url: 'user/avatar',
        // headers: { Authorization: `Bearer ${TOKEN}` },
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'UserDetails' }],
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'UserCourse', id: arg.arg.courseId },
      //   { type: 'UserCourse', id: 'LIST' },
      //   'User',
      // ],
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useChangeUserDetailsMutation,
  useUploadUserAvatarMutation,
} = usersApi
