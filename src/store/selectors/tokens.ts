import { RootState } from '../store'

export const accessTokenSelector = (state: RootState) =>
  state.token.access_token

export const refreshTokenSelector = (state: RootState) =>
  state.token.refresh_token

export const tokensSelector = (state: RootState) => {
  // console.log('selectTokens', state.token)
  return state.token
}
