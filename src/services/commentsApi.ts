import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { RootState } from '../store/store'
import { Feedback } from '../types'

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.access_token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    getComments: build.query<Feedback[], number>({
      query: (productId) => `ads/${productId}/comments`,
      providesTags: (result) =>
        result
          ? [
              { type: 'Comments', id: 'CommentsList' },
              ...result.map(({ id }) => ({
                type: 'Comments' as const,
                id,
              })),
            ]
          : [{ type: 'Comments', id: 'CommentsList' }],
    }),
    createComment: build.mutation<
      Feedback,
      { productId: number; body: { text: string } }
    >({
      query: ({ productId, body }) => ({
        url: `ads/${productId}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Comments', id: 'CommentsList' }],
    }),
  }),
})

export const { useGetCommentsQuery, useCreateCommentMutation } = commentsApi
