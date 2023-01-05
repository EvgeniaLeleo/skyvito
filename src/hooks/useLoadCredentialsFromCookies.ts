import { useCookies } from 'react-cookie'
import { useAppDispatch } from '../hook'
import { setToken } from '../store/tokenSlice'

export const useLoadCredentialsFromCookies = () => {
  const [cookies] = useCookies(['access', 'refresh'])
  const dispatch = useAppDispatch()

  if (cookies && cookies.access !== '' && cookies.access !== undefined) {
    dispatch(
      setToken({ access_token: cookies.access, refresh_token: cookies.refresh })
    )
    return true
  }

  console.warn('no credentials found in cookies')
  return false
}
