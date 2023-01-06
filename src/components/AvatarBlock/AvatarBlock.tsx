import { FC, useState } from 'react'

import { User } from '../../types'
import { AvatarImageBlock } from '../AvatarImageBlock/AvatarImageBlock'
import { Button } from '../Button/Button'
import { useLogout } from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'

import styles from './style.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { buttonState } from '../../store/buttonStateSlice'

type Props = {
  user: User
  loading: boolean
  formData: any
  avatarError?: any
}

export const AvatarBlock: FC<Props> = ({
  user,
  formData,
  avatarError,
  loading,
}) => {
  const [uploadedAvatar, setUploadedAvatar] = useState<string>()

  const logout = useLogout()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleUploadAvatar = async (event: { target: { files: any } }) => {
    const files = event.target.files
    const file = files[0]

    if (!file) {
      console.log('no file')
      return
    }

    dispatch(buttonState(false))

    formData[0] = new FormData()
    formData[0].append('file', file)

    if (files && file) {
      setUploadedAvatar(URL.createObjectURL(file))
    }
  }

  const handleLogout = () => {
    logout()
    navigate(ROUTES.main)
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
