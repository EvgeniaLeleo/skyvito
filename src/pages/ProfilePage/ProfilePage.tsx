import { Gallery } from '../../components/Gallery/Gallery'
import { UserSettings } from '../../components/UserSettings/UserSettings'
import { useGetCurrentUserQuery } from '../../services/usersApi'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import styles from './style.module.css'

export const ProfilePage = () => {
  // const { localId } = useAppSelector(selectCurrentUser)
  // const isLoggedIn = localId ? true : false

  const { data: user } = useGetCurrentUserQuery()

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
          <Gallery sellerId={user.id} />

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
