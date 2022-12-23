import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { productsApi } from './services/productsApi'

// import modalReducer from './slices/modalSlice'

// import { authApi } from './api/auth.api'
// // import { coursesApi } from './api/courses.api'
import { usersApi } from './services/usersApi'

export const store = configureStore({
  reducer: {
    // modal: modalReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(productsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
// import currentUserReducer from './slices/currentUserSlice'
// import messageReducer from './slices/messageSlice'
// import spinnerReducer from './slices/spinnerSlice'

// export const store = configureStore({
//   reducer: {
//     //     currentUser: currentUserReducer,
//     //     message: messageReducer,
//     //     spinner: spinnerReducer,
//     //     [coursesApi.reducerPath]: coursesApi.reducer,
//     //     [usersApi.reducerPath]: usersApi.reducer,
//     //     [authApi.reducerPath]: authApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       //       .concat(coursesApi.middleware)
//       .concat(usersApi.middleware),
//   //       .concat(authApi.middleware),
// })

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >
