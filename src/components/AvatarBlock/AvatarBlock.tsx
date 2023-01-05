import { FC, useState } from 'react'

import { User } from '../../types'
import { useUploadUserAvatarMutation } from '../../services/usersApi'
import { AvatarImageBlock } from '../AvatarImageBlock/AvatarImageBlock'

import styles from './style.module.css'
import { Button } from '../Button/Button'
import { useLogout } from '../../hooks/useLogout'

type Props = {
  user: User
}

export const AvatarBlock: FC<Props> = ({ user }) => {
  const [uploadedAvatar, setUploadedAvatar] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const [uploadAvatar, { error: avatarError }] = useUploadUserAvatarMutation()
  const logout = useLogout()

  const handleUploadAvatar = async (event: { target: { files: any } }) => {
    const files = event.target.files
    const file = files[0]

    if (!file) {
      console.log('no file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    await uploadAvatar(formData).unwrap()
    setLoading(false)

    if (files && file && !avatarError) {
      setUploadedAvatar(URL.createObjectURL(file))
    }
  }

  const handleLogout = async () => {
    logout()
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

      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  )
}
