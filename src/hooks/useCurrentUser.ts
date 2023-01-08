/**
 * Returns the current user, refreshing his token if necessary
 * Returns undefined if no logged in user or the refresh token is invalid
 */

import { useEffect, useRef, useState } from 'react'

import { useGetCurrentUserQuery } from '../services/usersApi'
import { tokensSelector } from '../store/selectors/tokens'
import { UserTokensRequest } from '../types'
import { useAppSelector } from './useAppDispatch'
import { useRefreshToken } from './useRefreshToken'

// setIsOpened is if for LoginModal

export const useCurrentUser = (setIsOpened?: Function) => {
  const timestamp = useRef(Date.now()).current
  const { data, isLoading, isError, error } = useGetCurrentUserQuery(timestamp)

  const doRefreshToken = useRefreshToken()

  const oldTokens = useAppSelector(tokensSelector)

  const [resultError, setResultError] = useState(false)

  const handleRefreshToken = async (tokens: UserTokensRequest) => {
    const newTokens = await doRefreshToken(tokens)

    if ('error' in newTokens && setIsOpened) {
      setIsOpened(true)
    }
  }

  const shouldRefreshTokens = () =>
    error ? 'status' in error && error.status === 401 : false

  useEffect(() => {
    if (isError) {
      if (
        shouldRefreshTokens() &&
        oldTokens.access_token &&
        oldTokens.refresh_token
      ) {
        setResultError(false)
        handleRefreshToken(oldTokens)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, oldTokens.access_token, oldTokens.refresh_token])

  return { user: data, isLoading, isError, error: resultError }
}
