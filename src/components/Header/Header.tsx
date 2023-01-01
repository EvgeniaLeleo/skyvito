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
  // const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  // const style = {
  //   position: 'absolute' as 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // }

  return (
    <>
      {/* onClick={handleOpen} */}
      <div className={styles.navWrapper}>
        <Navigation type={type} />
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
      <div className={styles.searchWrapper}>
        {page === 'profile' ? <ProfileHeader /> : <SearchBar />}
      </div>
    </>
  )
}
