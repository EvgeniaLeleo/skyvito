import { FC, useState } from 'react'

import { LoginModal } from '../../modals/LoginModal/LoginModal'
import { Button } from '../Button/Button'

import styles from './style.module.css'

type Props = {
  type: 'main' | 'auth'
}

export const Navigation: FC<Props> = ({ type = 'auth' }) => {
  const [isLoginModalShown, setIsLoginModalShown] = useState<boolean>(false)

  const handleLoginClick = () => {
    setIsLoginModalShown(true)
  }

  const nav =
    type === 'auth'
      ? [
          <Button type="secondary">Разместить объявление</Button>,
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
    </>
  )
}
