import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'

import styles from './style.module.css'

type Props = {
  type: 'main' | 'auth'
}

export const Navigation: FC<Props> = ({ type = 'auth' }) => {
  const navigate = useNavigate()

  const handleGoToProfile = () => {
    navigate(ROUTES.profile)
  }

  const nav =
    type === 'auth'
      ? [
          <Button type="secondary">Разместить объявление</Button>,
          <Button type="secondary">Личный кабинет</Button>,
        ]
      : [
          <Button type="secondary" onClick={handleGoToProfile}>
            Вход в личный кабинет
          </Button>,
        ]

  return (
    <nav className={styles.nav}>
      <ul className={styles.items}>
        {nav.map((item, index) => (
          <li key={index.toString()}>{item}</li>
        ))}
      </ul>
    </nav>
  )
}
