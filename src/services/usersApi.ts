import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { CardMainData, Feedback } from '../types'

export const usersApi = createApi({
  reducerPath: 'users/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getCurrentUser: build.query<CardMainData[], void>({
      query: () => 'user',
    }),
    // getProduct: build.query<CardMainData, number>({
    //   query: (idx: number) => `ads/${idx}`,
    // query: (idx: number) => `products/${idx}`,

    // transformResponse: (response: CourseData) => {
    //   if (!response) throw Error('Нет такого курса')
    //   if (response.description)
    //     response.description = parseFirebaseString(response.description)
    //   return response
    // },
    // }),
    // getProductComments: build.query<Feedback[], number>({
    //   query: (idx: number) => `ads/${idx}/comments`,
    // }),
  }),
})

export const { useGetCurrentUserQuery } = usersApi
