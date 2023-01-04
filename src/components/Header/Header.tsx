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
  // const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  return (
    <>
      {/* onClick={handleOpen} */}
      <div className={styles.navWrapper}>
        <Navigation authorized={authorized} />
      </div>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div onClick={handleClose}>d</div>
        </Box>
      </Modal> */}
      <div
        className={cn(styles.searchWrapper, { [styles.scrolled]: scrolled })}
      >
        {searchHeader ? <SearchBar /> : <ProfileHeader />}
      </div>
    </>
  )
}
