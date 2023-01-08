import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useCurrentUser'

import { ROUTES } from '../../routes'

import homeIcon from './assets/home.svg'
import plusIcon from './assets/plus.svg'
import profileIcon from './assets/profile.svg'
import styles from './style.module.css'

type Props = {
  isAuthorized?: boolean
}

export const NavigationMobile: FC<Props> = ({ isAuthorized }) => {
  const navigate = useNavigate()

  useCurrentUser()

  // const handleLoginClick = () => {
  //   if (!isAuthorized) {
  //     // setIsLoginModalShown(true)
  //     console.log('s', isAuthorized)
  //     navigate(ROUTES.login)
  //   } else {
  //     navigate(ROUTES.profile)
  //   }
  // }

  // const handleCreateProduct = () => {
  //   // setIsCreateModalShown(true)
  //   console.log('y')
  // }

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.icons}>
          <Link to={ROUTES.main} className={styles.link}>
            <img className={styles.icon} src={homeIcon} alt="Home" />
          </Link>

          <Link to={isAuthorized ? ROUTES.createProduct : ROUTES.login}>
            <img className={styles.icon} src={plusIcon} alt="Add" />
          </Link>

          <Link
            to={isAuthorized ? ROUTES.profile : ROUTES.login}
            className={styles.link}
          >
            <img className={styles.icon} src={profileIcon} alt="Profile" />
          </Link>
        </ul>
      </nav>

      {/* <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}>
              <Button type="tertiary" size="s">
                Войти
              </Button>
            </Link>*/}
    </>
  )
}
