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
    // getProduct: build.query<Product, number>({
    //   query: (idx: number) => `ads/${idx}`,
    //   providesTags: () => [{ type: 'Products', id: 'LIST' }],

    //   // transformResponse: (response: CourseData) => {
    //   //   if (!response) throw Error('Нет такого курса')
    //   //   if (response.description)
    //   //     response.description = parseFirebaseString(response.description)
    //   //   return response
    //   // },
    // }),
    // getProductComments: build.query<Feedback[], number>({
    //   query: (idx: number) => `ads/${idx}/comments`,
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           { type: 'Products', id: 'LIST' },
    //           ...result.map(({ id }) => ({
    //             type: 'Products' as const,
    //             id,
    //           })),
    //         ]
    //       : [{ type: 'Products', id: 'LIST' }],
    // }),
    // deleteProduct: build.mutation<void, number>({
    //   query: (idx) => ({
    //     url: `ads/${idx}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    // }),
    // uploadProductImage: build.mutation<void, { idx: number; body: FormData }>({
    //   query: ({ idx, body }) => ({
    //     url: `ads/${idx}/image`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    //   // invalidatesTags: (result, error, arg) => [
    //   //   { type: 'UserCourse', id: arg.arg.courseId },
    //   //   { type: 'UserCourse', id: 'LIST' },
    //   //   'User',
    //   // ],
    // }),
    // changeProductDetails: build.mutation({
    //   query: ({ idx, body }) => ({
    //     url: `ads/${idx}`,
    //     method: 'PATCH',
    //     body,
    //   }),
    //   invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    // }),
    // deleteProductImage: build.mutation<void, { idx: number; imgUrl: string }>({
    //   query: ({ idx, imgUrl }) => ({
    //     url: `ads/${idx}/image?file_url=${imgUrl}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    // }),
  }),
})

export const { useGetCommentsQuery, useCreateCommentMutation } = commentsApi

// getSellersProducts: build.query<Product[], number>({
//   query: (userId: number) => `ads?user_id=${userId}`,
//   providesTags: (result) =>
//     result
//       ? [
//           { type: 'Products', id: 'LIST' },
//           ...result.map(({ id }) => ({
//             type: 'Products' as const,
//             id,
//           })),
//         ]
//       : [{ type: 'Products', id: 'LIST' }],
// }),
