import { useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useGetCurrentUserQuery } from '../services/usersApi'

// export const useCurrentUser = () => {
//   const timestampRef = useRef(Date.now()).current
//   const { data, isLoading, isError, error } =
//     useGetCurrentUserQuery(timestampRef)
//   // const doRefreshToken = useRefreshToken();
//   // const refreshToken = useAppSelector(selectRefreshToken);
//   const [resultError, setResultError] = useState(false)
//   const navigate = useNavigate()

//   // const handleRefreshToken = async (rt: string) => {
//   //   const result = await doRefreshToken(rt)
//   //   if ('error' in result) navigate(ROUTES.login)
//   // }

//   const shouldRefreshTokens = () =>
//     error ? 'status' in error && error.status === 401 : false

//   // useEffect(() => {
//   //   if (isError) {
//   //     if (shouldRefreshTokens() && refreshToken) {
//   //       setResultError(false)
//   //       handleRefreshToken(refreshToken)
//   //     } else {
//   //       navigate(ROUTES.login)
//   //     }
//   //   }
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [isError, refreshToken])

//   return { user: data, isLoading, isError, error: resultError }
// }
