import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  useChangeUserDetailsMutation,
  useUploadUserAvatarMutation,
} from '../../services/usersApi'
import { User } from '../../types'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { Input } from './Input'

import styles from './style.module.css'

type Props = {
  user?: User
}

export const UserSettings: FC<Props> = ({ user }) => {
  const [name, setName] = useState<string | undefined>(user?.name)
  const [surname, setSurname] = useState<string | undefined>(user?.surname)
  const [uploadedAvatar, setUploadedAvatar] = useState<string>()
  // console.log('user', user)
  // const user = useAppSelector(selectCurrentUser)
  // console.log(name, surname)
  // console.log('ok')
  // console.log('name', name)

  const [uploadAvatar, { error: avatarError }] = useUploadUserAvatarMutation()
  const [changeUserDetails] = useChangeUserDetailsMutation()
  // console.log(user?.name)

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value)
  }

  useEffect(() => {
    setName(user?.name)
    setSurname(user?.surname)
    // setImgUrl(user?.avatar ? API_URL + user?.avatar : '')

    // return () => {
    //   setName(user?.name)
    //   setSurname(user?.surname)
    //   // setImgUrl(user?.avatar ? API_URL + user?.avatar : '')
    // }
  }, [user?.name, user?.surname])

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<any> = async (data) => {
    // if (!user.idToken) {
    //   goToLoginWithMessage(EXP_MESSAGE)
    //   return
    // }
    console.log('dd', data.name)
    try {
      // dispatch(showSpinner())
      await changeUserDetails({
        // idToken: user?.idToken,
        email: data.email,
        name: data.name,
        surname: data.surname,
      }).unwrap()
      // dispatch(hideSpinner())
      // setIsOpened(false)
    } catch {
      // dispatch(hideSpinner())
      // goToLoginWithMessage(EXP_MESSAGE)
    }
  }

  const handleChange = async (event: any) => {
    const files = event.target.files
    const file = files[0]

    if (!file) {
      console.log('no file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    await uploadAvatar({ body: formData })

    if (files && file && !avatarError) {
      setUploadedAvatar(URL.createObjectURL(file))
    }
  }

  // const handleEmailClick = () => {
  //   setIsModalEmailShown(true)
  // }

  // const handlePasswordClick = () => {
  //   setIsModalPasswordShown(true)
  // }

  return (
    <div className={styles.userSettings}>
      <div className={styles.avatarBlock}>
        {!!avatarError && <Avatar error={true} mb="10px" />}
        {!avatarError && !uploadedAvatar && <Avatar user={user} mb="10px" />}
        {!avatarError && !!uploadedAvatar && (
          <Avatar user={user} uploadedAvatar={uploadedAvatar} mb="10px" />
        )}
        <label className={styles.changeAvatar}>
          Заменить
          <input
            className={styles.changeAvatarInput}
            type="file"
            onChange={handleChange}
            accept="image/*"
          />
        </label>
      </div>

      <form
        className={styles.settingsForm}
        action="#"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.nameWrapper}>
          <Input
            label="Имя"
            placeholder={'Имя'}
            onChange={handleChangeName}
            value={name}
          />
          <Input
            label="Фамилия"
            placeholder="Фамилия"
            onChange={handleChangeSurname}
            value={surname}
          />
        </div>
        <Input label="Город" placeholder="Город" size="m" />
        <Input label="Телефон" type="tel" placeholder="Телефон" size="l" />

        <Button>Сохранить</Button>
      </form>

      {/* <div className={styles.infoBlock}>
        <p className={styles.user}>
          {`Логин: ${user.displayName || user.email}`}
        </p>
      </div> 
      <div className={styles.editBlock} data-cy="edit-data-user">
        <Button onClick={handleEmailClick}>Редактировать e-mail</Button>
        <Button onClick={handlePasswordClick}>Редактировать пароль</Button> </div> */}
    </div>
  )
}
