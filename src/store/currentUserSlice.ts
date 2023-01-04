import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'

const initialState: User = {}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) =>
      (state = { ...action.payload }),
    updateCurrentUser: (state, action: PayloadAction<User>) => {
      return (state = {
        ...state,
        ...action.payload,
      })
    },
    // deleteCurrentUser: (state) => {
    //   Cookies.remove(accessTokenName)
    //   return (state = { ...initialState })
    // },
  },
  // extraReducers: (builder) => {
  //   // signUp
  //   builder.addMatcher(
  //     authApi.endpoints.signUp.matchFulfilled,
  //     (state, { payload }) => {
  //       if (payload.idToken) Cookies.set(accessTokenName, payload.idToken)

  //       return (state = {
  //         ...payload,
  //         needRelogin: false,
  //       })
  //     }
  //   )
  //   // signIn
  //   builder.addMatcher(
  //     authApi.endpoints.signIn.matchFulfilled,
  //     (state, { payload }) => {
  //       if (payload.idToken) Cookies.set(accessTokenName, payload.idToken)

  //       return (state = { ...payload })
  //     }
  //   )
  //   // changeEmail
  //   builder.addMatcher(
  //     authApi.endpoints.changeEmail.matchFulfilled,
  //     (state, { payload }) => {
  //       if (payload.idToken) Cookies.set(accessTokenName, payload.idToken)

  //       return (state = {
  //         ...state,
  //         ...payload,
  //       })
  //     }
  //   )
  //   // changePassword
  //   builder.addMatcher(
  //     authApi.endpoints.changePassword.matchFulfilled,
  //     (state, { payload }) => {
  //       if (payload.idToken) Cookies.set(accessTokenName, payload.idToken)

  //       return (state = {
  //         ...state,
  //         ...payload,
  //       })
  //     }
  //   )
  //   // refreshToken
  //   builder.addMatcher(
  //     authApi.endpoints.refreshToken.matchFulfilled,
  //     (state, { payload }) => {
  //       if (payload.id_token) Cookies.set(accessTokenName, payload.id_token)

  //       return (state = {
  //         ...state,
  //         idToken: payload.id_token,
  //         refreshToken: payload.refresh_token,
  //         needRelogin: false,
  //       })
  //     }
  //   )
  //   // getUserData
  //   builder.addMatcher(
  //     authApi.endpoints.getUserData.matchFulfilled,
  //     (state, { payload }) => {
  //       if (payload.idToken) Cookies.set(accessTokenName, payload.idToken)

  //       return (state = {
  //         ...state,
  //         ...payload,
  //       })
  //     }
  //   )
  // },
})

export const { setCurrentUser, updateCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer
