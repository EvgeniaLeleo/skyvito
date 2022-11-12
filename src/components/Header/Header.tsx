import { FC } from 'react'
import { Navigation } from '../Navigation/Navigation'
import { ProfileHeader } from '../ProfileHeader/ProfileHeader'
import { SearchBar } from '../SearchBar/SearchBar'

import styles from './style.module.css'

type Props = {
  type?: 'main' | 'auth'
  page?: 'regular' | 'profile'
}

export const Header: FC<Props> = ({ type = 'auth', page = 'regular' }) => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.navWrapper}>
          <Navigation type={type} />
        </div>
        <div className={styles.searchWrapper}>
          {page === 'profile' ? <ProfileHeader /> : <SearchBar />}
        </div>
      </div>
    </>
  )
}
