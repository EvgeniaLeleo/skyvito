// import { Link } from 'react-router-dom'
// import { useAppSelector } from '../../hooks/appHooks'
// import { selectCurrentUser } from '../../slices/currentUserSlice'

import { Gallery } from '../../components/Gallery/Gallery'
import { Header } from '../../components/Header/Header'
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop'
import { UserSettings } from '../../components/UserSettings/UserSettings'
import { USER } from '../../constants'

import styles from './style.module.css'

export const ProfilePage = () => {
  // const { localId } = useAppSelector(selectCurrentUser)
  // const isLoggedIn = localId ? true : false

  return (
    <>
      <ScrollToTop />
      <Header page="profile" />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Здравствуйте, {USER.username}!</h1>
        <h2 className={styles.subtitle}>Настройки профиля</h2>
        <UserSettings user={USER} />
        <h2 className={styles.subtitle}>Мои товары</h2>
        <Gallery />

        {/* <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}>
              <Button type="tertiary" size="s">
                Войти
              </Button>
            </Link>*/}
      </div>
      {/* <Footer />  */}
    </>
  )
}
