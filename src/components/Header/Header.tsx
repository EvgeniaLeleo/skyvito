import { FC } from 'react'
import { Navigation } from '../Navigation/Navigation'

import styles from './style.module.css'

type Props = {
  type?: 'main' | 'auth'
}

export const Header: FC<Props> = ({ type = 'auth' }) => {
  return (
    <div className={styles.header}>
      <Navigation type={type} />
    </div>
  )
}
