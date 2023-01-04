import { FC } from 'react'

import { User } from '../../types'
import { Avatar } from '../Avatar/Avatar'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'

import styles from './style.module.css'

type Props = {
  user: User
  loading: boolean
  avatarError?: FetchBaseQueryError | SerializedError
  uploadedAvatar?: string
}

export const AvatarImageBlock: FC<Props> = ({
  user,
  loading,
  avatarError,
  uploadedAvatar,
}) => {
  if (loading) {
    return <div className={styles.wrapper}>Загрузка...</div>
  }

  if (!!avatarError) {
    return <Avatar error={true} mb="10px" />
  }

  if (!uploadedAvatar) {
    return <Avatar user={user} mb="10px" />
  } else {
    return <Avatar user={user} uploadedAvatar={uploadedAvatar} mb="10px" />
  }
}

// return (
//   <div className={styles.avatarBlock}>
//     {loading && <div className={styles.wrapper}>Загрузка...</div>}

//     {!loading && !!avatarError && <Avatar error={true} mb="10px" />}
//     {!loading && !avatarError && !uploadedAvatar && (
//       <Avatar user={user} mb="10px" />
//     )}
//     {!loading && !avatarError && !!uploadedAvatar && (
//       <Avatar user={user} uploadedAvatar={uploadedAvatar} mb="10px" />
//     )}
//   </div>
// )