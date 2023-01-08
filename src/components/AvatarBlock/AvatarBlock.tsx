import { FC, useState } from 'react'

import { User } from '../../types'
import { AvatarImageBlock } from '../AvatarImageBlock/AvatarImageBlock'
import { Button } from '../Button/Button'
import { useLogout } from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'

import styles from './style.module.css'

type Props = {
  user: User
  loading: boolean
  setIsBlocked: Function
  formData: any
  avatarError?: any
}

export const AvatarBlock: FC<Props> = ({
  user,
  formData,
  avatarError,
  loading,
  setIsBlocked,
}) => {
  const [uploadedAvatar, setUploadedAvatar] = useState<string>()

  const handleUploadAvatar = async (event: { target: { files: any } }) => {
    const files = event.target.files
    const file = files[0]

    if (!file) {
      return
    }

    formData[0] = new FormData()
    formData[0].append('file', file)

    if (files && file) {
      setUploadedAvatar(URL.createObjectURL(file))
      setIsBlocked(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarBlock}>
        <AvatarImageBlock
          user={user}
          loading={loading}
          avatarError={avatarError}
          uploadedAvatar={uploadedAvatar}
        />
        <label className={styles.changeAvatar}>
          Заменить
          <input
            className={styles.changeAvatarInput}
            type="file"
            onChange={handleUploadAvatar}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  )
}
