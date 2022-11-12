// import { Link } from 'react-router-dom'

// import { useAppSelector } from '../../hooks/appHooks'
// import { ROUTES } from '../../routes'
// import { selectCurrentUser } from '../../slices/currentUserSlice'

import { Gallery } from '../../components/Gallery/Gallery'
import { Header } from '../../components/Header/Header'

import styles from './style.module.css'

export const MainPage = () => {
  let localId // const { localId } = useAppSelector(selectCurrentUser)
  const isLoggedIn = localId ? true : false

  return (
    <>
      <Header type={isLoggedIn ? 'auth' : 'main'} />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Объявления</h1>
        <Gallery />

        {/* <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}>
            </Link>
          */}
      </div>
      {/* <Footer />  */}
    </>
  )
}
