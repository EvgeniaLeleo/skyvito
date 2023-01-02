import { FC } from 'react'

import { API_URL } from '../../constants'
import { User } from '../../types'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'

import styles from './style.module.css'

type Props = {
  user?: User
  uploadedAvatar?: string
  error?: boolean
  mb?: string
  cursor?: 'pointer' | 'default'
}

export const Avatar: FC<Props> = ({
  user,
  mb,
  uploadedAvatar,
  cursor,
  error,
}) => {
  if (error) {
    return (
      <div className={styles.wrapper} style={{ marginBottom: mb }}>
        Ошибка
        <br /> загрузки
      </div>
    )
  } else if (!user) {
    return (
      <div className={styles.wrapper} style={{ marginBottom: mb }}>
        Аватар
        <br /> не загружен
      </div>
    )
  } else {
    return (
      <div className={styles.wrapper} style={{ marginBottom: mb }}>
        {!uploadedAvatar && (
          <ImageWrapper
            imageUrl={user?.avatar ? API_URL + user?.avatar : ''}
            name={user?.name}
            cursor={cursor}
          />
        )}
        {!!uploadedAvatar && (
          <ImageWrapper
            imageUrl={uploadedAvatar}
            name={user?.name}
            cursor={cursor}
          />
        )}
      </div>
    )
  }
}
