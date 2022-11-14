import { FC, useState } from 'react'
import { EditProductModal } from '../../modals/EditProductModal/EditProductModal'

import { LoginModal } from '../../modals/LoginModal/LoginModal'
import { Button } from '../Button/Button'

import styles from './style.module.css'

type Props = {
  type: 'main' | 'auth'
}

export const Navigation: FC<Props> = ({ type = 'auth' }) => {
  const [isLoginModalShown, setIsLoginModalShown] = useState<boolean>(false)
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false)

  const handleLoginClick = () => {
    setIsLoginModalShown(true)
  }

  const handleEditProduct = () => {
    setIsEditModalShown(true)
  }

  const nav =
    type === 'auth'
      ? [
          <Button type="secondary" onClick={handleEditProduct}>
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
        <ul className={styles.items}>
          {nav.map((item, index) => (
            <li key={index.toString()}>{item}</li>
          ))}
        </ul>
      </nav>

      {isLoginModalShown && <LoginModal setIsOpened={setIsLoginModalShown} />}
      {isEditModalShown && (
        <EditProductModal setIsOpened={setIsEditModalShown} mode="new" />
      )}
    </>
  )
}
