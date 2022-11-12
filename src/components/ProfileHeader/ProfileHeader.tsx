import { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

export const ProfileHeader: FC = () => {
  const navigate = useNavigate()

  const handleGoToMainPage = () => {
    navigate(ROUTES.main)
  }

  return (
    <div className={styles.wrapper}>
      <Link to={ROUTES.main} className={styles.link}>
        <Logo mr="60px" />
      </Link>
      <Button onClick={handleGoToMainPage}>Вернуться на главную</Button>
    </div>
  )
}
