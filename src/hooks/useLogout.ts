import { useCookies } from 'react-cookie'
import { useAppDispatch } from '../hook'
import { setToken } from '../store/tokenSlice'

export const useLogout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookies, removeCookies] = useCookies(['access', 'refresh'])
  const dispatch = useAppDispatch()

  const logout = () => {
    console.log('processing logout')
    removeCookies('access')
    removeCookies('refresh')
    dispatch(setToken({ access_token: undefined, refresh_token: undefined }))
  }

  return logout
}
