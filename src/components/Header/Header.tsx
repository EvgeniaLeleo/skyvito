import { FC } from 'react'
import { Navigation } from '../Navigation/Navigation'
import { SearchBar } from '../SearchBar/SearchBar'

import styles from './style.module.css'

type Props = {
  type?: 'main' | 'auth'
}

export const Header: FC<Props> = ({ type = 'auth' }) => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.navWrapper}>
          <Navigation type={type} />
        </div>
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
      </div>
    </>
  )
}
