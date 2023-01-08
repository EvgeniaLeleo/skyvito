import { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useCurrentUser'

import { CreateProductModal } from '../../modals/CreateProductModal/CreateProductModal '
import { LoginModal } from '../../modals/LoginModal/LoginModal'
import { SignUpModal } from '../../modals/SignUpModal/SignUpModal'
import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { useMediaQuery } from 'react-responsive'

import homeIcon from './assets/home.svg'
import plusIcon from './assets/plus.svg'
import profileIcon from './assets/profile.svg'
import styles from './style.module.css'
import { SCREEN_SIZE } from '../../constants'

type Props = {
  isAuthorized?: boolean
}

export const Navigation: FC<Props> = ({ isAuthorized = true }) => {
  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const [isLoginModalShown, setIsLoginModalShown] = useState<boolean>(false)
  const [isSingUpModalShown, setIsSignUpModalShown] = useState<boolean>(false)
  const [isCreateModalShown, setIsCreateModalShown] = useState<boolean>(false)

  const navigate = useNavigate()

  useCurrentUser(setIsLoginModalShown)

  const handleLoginClick = () => {
    if (!isAuthorized) {
      setIsLoginModalShown(true)
    } else {
      navigate(ROUTES.profile)
    }
  }

  const handleCreateProduct = () => {
    setIsCreateModalShown(true)
  }

  const nav = isAuthorized
    ? [
        <Button type="secondary" onClick={handleCreateProduct}>
          Разместить объявление
        </Button>,
        <Button type="secondary" onClick={handleLoginClick}>
          Личный кабинет
        </Button>,
      ]
    : [
        <Button type="secondary" onClick={handleLoginClick}>
          Вход в личный кабинет
        </Button>,
      ]

  useEffect(() => {
    if (isLoginModalShown || isSingUpModalShown || isCreateModalShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoginModalShown, isSingUpModalShown, isCreateModalShown])

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.buttonWrapper}>
          <ul className={styles.items}>
            {nav.map((item, index) => (
              <li key={index.toString()}>{item}</li>
            ))}
          </ul>
        </div>

        <ul className={styles.icons}>
          <Link to={ROUTES.main} className={styles.link}>
            <img className={styles.icon} src={homeIcon} alt="Home" />
          </Link>
          <img className={styles.icon} src={plusIcon} alt="Add" />
          <Link to={ROUTES.profile} className={styles.link}>
            <img className={styles.icon} src={profileIcon} alt="Profile" />
          </Link>
        </ul>
      </nav>

      {/* <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}>
              <Button type="tertiary" size="s">
                Войти
              </Button>
            </Link>*/}

      {isLoginModalShown && (
        <LoginModal
          setIsOpened={setIsLoginModalShown}
          setSignUpIsOpened={setIsSignUpModalShown}
        />
      )}

      {isSingUpModalShown && (
        <SignUpModal setIsOpened={setIsSignUpModalShown} />
      )}

      {isCreateModalShown && (
        <CreateProductModal setIsOpened={setIsCreateModalShown} />
      )}
    </>
  )
}
