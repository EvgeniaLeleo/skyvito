import { FC, useEffect, useState } from 'react'
import cn from 'classnames'

import { Navigation } from '../Navigation/Navigation'
import { ProfileHeader } from '../ProfileHeader/ProfileHeader'
import { SearchBar } from '../SearchBar/SearchBar'

import styles from './style.module.css'

type Props = {
  authorized?: boolean
  searchHeader?: boolean
}

export const Header: FC<Props> = ({
  authorized = true,
  searchHeader = false,
}) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 15) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
  }, [])

  return (
    <>
      <div className={styles.navWrapper}>
        <Navigation authorized={authorized} />
      </div>
      <div
        className={cn(styles.searchWrapper, { [styles.scrolled]: scrolled })}
      >
        {searchHeader ? <SearchBar /> : <ProfileHeader />}
      </div>
    </>
  )
}
