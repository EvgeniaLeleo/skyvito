import { Skeleton } from '@mui/material'
import { FC, useState } from 'react'
import { UserRESTAPI } from '../../types'

// import { FirebaseUserRESTAPI } from '../../types'
// import { Button } from '../Button/Button'
// import { EmailModal } from '../ProfileModal/EmailModal'
// import { PasswordModal } from '../ProfileModal/PasswordModal'

import styles from './style.module.css'

type Props = {
  user: UserRESTAPI
}

export const Avatar: FC<Props> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(true)

  const handleLoad = () => setLoading(false)

  return (
    <div className={styles.imgWrapper}>
      {loading && (
        <Skeleton variant="rectangular" className={styles.skeleton} />
      )}
      <img
        className={styles.img}
        width="100%"
        height="100%"
        src={`${user.avatarLink}`}
        alt={user.name}
        onLoad={handleLoad}
      />
    </div>
  )
}
