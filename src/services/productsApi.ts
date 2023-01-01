import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL, TOKEN } from '../constants'
import { Feedback, Product } from '../types'

export const productsApi = createApi({
  reducerPath: 'products/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => 'ads',
    }),
    getProduct: build.query<Product, number>({
      query: (idx: number) => `ads/${idx}`,

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
        method: 'DELETE',
      }),
    }),
    uploadProductPicture: build.mutation<void, any>({
      query: ({ idx, body }) => ({
        url: `ads/${idx}/image`,
        headers: { Authorization: `Bearer ${TOKEN}` },
        method: 'POST',
        body: body,
      }),
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
  useUploadProductPictureMutation,
  useDeleteProductMutation,
} = productsApi
