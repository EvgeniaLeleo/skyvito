import { FC } from 'react'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

export const ProfileHeader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Logo mr="60px" />
      <Button>Вернуться на главную</Button>
    </div>
  )
}
