import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CreateProductModal } from '../../modals/CreateProductModal copy/CreateProductModal '
import { LoginModal } from '../../modals/LoginModal/LoginModal'
import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'

import styles from './style.module.css'

type Props = {
  authorized?: boolean
}

export const Navigation: FC<Props> = ({ authorized = true }) => {
  const [isLoginModalShown, setIsLoginModalShown] = useState<boolean>(false)
  const [isCreateModalShown, setIsCreateModalShown] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleLoginClick = () => {
    if (!authorized) {
      setIsLoginModalShown(true)
    } else {
      navigate(ROUTES.profile)
    }
  }

  const handleCreateProduct = () => {
    setIsCreateModalShown(true)
  }

  const nav = authorized
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
          <img
            className={styles.icon}
            src="./assets/images/home.svg"
            alt="Home"
          />
          <img
            className={styles.icon}
            src="./assets/images/plus.svg"
            alt="Add"
          />
          <Link
            to={ROUTES.profile}
            className={styles.link}
            // onMouseEnter={() => prefetchCourse(product.id!)}
          >
            <img
              className={styles.icon}
              src="./assets/images/profile.svg"
              alt="Profile"
            />
          </Link>
        </ul>
      </nav>

      {isLoginModalShown && <LoginModal setIsOpened={setIsLoginModalShown} />}
      {isCreateModalShown && (
        <CreateProductModal setIsOpened={setIsCreateModalShown} />
      )}
    </>
  )
}
