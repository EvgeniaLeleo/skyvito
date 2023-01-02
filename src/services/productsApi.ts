import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL, TOKEN } from '../constants'
import { Feedback, Product } from '../types'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => 'ads',
      // providesTags: (result) =>
      //   result
      //     ? [
      //         { type: 'Products', id: 'LIST' },
      //         ...result.map(({ id }) => ({
      //           type: 'Products' as const,
      //           id,
      //         })),
      //       ]
      //     : [{ type: 'Products', id: 'LIST' }],
    }),
    getProduct: build.query<Product, number>({
      query: (idx: number) => `ads/${idx}`,
      providesTags: () => [{ type: 'Products', id: 'LIST' }],

      // transformResponse: (response: CourseData) => {
      //   if (!response) throw Error('Нет такого курса')
      //   if (response.description)
      //     response.description = parseFirebaseString(response.description)
      //   return response
      // },
    }),
    getProductComments: build.query<Feedback[], number>({
      query: (idx: number) => `ads/${idx}/comments`,
    }),
    deleteProduct: build.mutation<void, any>({
      query: ({ idx }) => ({
        url: `ads/${idx}`,
        headers: { Authorization: `Bearer ${TOKEN}` },
        method: 'DELETE',
      }),
    }),
    uploadProductImage: build.mutation<void, any>({
      query: ({ idx, body }) => ({
        url: `ads/${idx}/image`,
        headers: { Authorization: `Bearer ${TOKEN}` },
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'UserCourse', id: arg.arg.courseId },
      //   { type: 'UserCourse', id: 'LIST' },
      //   'User',
      // ],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductCommentsQuery,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productsApi
