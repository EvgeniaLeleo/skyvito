import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gallery } from '../../components/Gallery/Gallery'
import { UserSettings } from '../../components/UserSettings/UserSettings'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useGetCurrentUserQuery } from '../../services/usersApi'
import { setCurrentUser } from '../../store/currentUserSlice'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import styles from './style.module.css'

export const ProfilePage = () => {
  const dispatch = useAppDispatch()

  const timestamp = useRef(Date.now()).current
  const { data: user } = useGetCurrentUserQuery(timestamp)

  useEffect(() => {
    if (user) {
      dispatch(setCurrentUser(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <PageWrapper scrollToTop={true}>
      {user && (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>
            Здравствуйте{user.name ? `, ${user.name}` : ''}!
          </h1>
          <h2 className={styles.subtitle}>Настройки профиля</h2>
          {!!user && <UserSettings user={user} />}
          <h2 className={styles.subtitle}>Мои товары</h2>
          <Gallery sellerId={user.id} isProfilePage={true} />

          {/* <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}>
              <Button type="tertiary" size="s">
                Войти
              </Button>
            </Link>*/}
        </div>
      )}
    </PageWrapper>
  )
}
