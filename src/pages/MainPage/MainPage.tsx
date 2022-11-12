// import { Link } from 'react-router-dom'

// import { Button } from '../../components/Button/Button'
// import { Footer } from '../../components/Footer/Footer'
// import { Gallery } from '../../components/Gallery/Gallery'
// import { Logo } from '../../components/Logo/Logo'
// import { LOGO_COLOR_LIGHT } from '../../constants'
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

        {/* <header className={styles.header}>
          <nav className={styles.nav}>
            <Logo color={LOGO_COLOR_LIGHT} />
            <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}>
              <Button type="tertiary" size="s">
                Войти
              </Button>
            </Link>
          </nav> 
        </header>          
        </main>*/}
      </div>
      {/* <Footer />  */}
    </>
  )
}
