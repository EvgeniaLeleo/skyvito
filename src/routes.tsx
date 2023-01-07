import { FC } from 'react'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'

import { useLoadCredentialsFromCookies } from './hooks/useLoadCredentialsFromCookies'
import { MainPage } from './pages/MainPage/MainPage'
import { ProductPage } from './pages/ProductPage/ProductPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { SellersPage } from './pages/SellersPage/SellersPage'

// const Main = lazy(() => import('./pages/Main/Main'))
// const AboutCourse = lazy(() => import('./pages/AboutCourse/AboutCourse'))
// const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'))
// const SignUpForm = lazy(() => import('./pages/AuthForm/SignUpForm'))
// const LoginForm = lazy(() => import('./pages/AuthForm/LoginForm'))
// const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'))
// const Workout = lazy(() => import('./pages/WorkoutPage/Workout'))

export const ROUTES = {
  main: '/',
  login: '/login',
  signup: '/signup',
  product: '/product',
  profile: '/profile',
  seller: '/seller',
}

type Props = {
  redirectPath?: string
  isAllowed?: boolean
}

const ProtectedRoute: FC<Props> = ({
  redirectPath = ROUTES.main,
  isAllowed,
}) => {
  if (isAllowed === undefined) redirectPath = ROUTES.main

  if (!isAllowed) return <Navigate to={redirectPath} replace={true} />

  return <Outlet />
}

export const AppRoutes = () => {
  const isLoggedIn = useLoadCredentialsFromCookies()

  return (
    <Routes>
      <Route path={ROUTES.main} element={<MainPage />} />
      <Route path={ROUTES.seller + '/:id'} element={<SellersPage />} />
      <Route path={ROUTES.product + '/:id'} element={<ProductPage />} />
      {/* <Route path={ROUTES.login} element={<LoginForm />} /> */}
      {/* <Route path={ROUTES.signup} element={<SignUpForm />} /> */}
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  )
}
