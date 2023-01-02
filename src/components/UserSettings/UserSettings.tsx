import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import {
  useChangeUserDetailsMutation,
  useUploadUserAvatarMutation,
} from '../../services/usersApi'
import { User } from '../../types'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'

import styles from './style.module.css'

type Props = {
  user: User
}

export const UserSettings: FC<Props> = ({ user }) => {
  const [name, setName] = useState<string>(user?.name || '')
  const [surname, setSurname] = useState<string>(user?.surname || '')
  const [city, setCity] = useState<string>(user?.city || '')
  const [phone, setPhone] = useState<string>(user?.phone || '')
  const [uploadedAvatar, setUploadedAvatar] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  // const user = useAppSelector(selectCurrentUser)

  const [uploadAvatar, { error: avatarError }] = useUploadUserAvatarMutation()
  const [changeUserDetails] = useChangeUserDetailsMutation()

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value)
  }

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  useEffect(() => {
    setName(user?.name)
    setSurname(user?.surname)
    setCity(user?.city)
    setPhone(user?.phone)
    // setImgUrl(user?.avatar ? API_URL + user?.avatar : '')

    // return () => {
    //   setName(user?.name)
    //   setSurname(user?.surname)
    //   // setImgUrl(user?.avatar ? API_URL + user?.avatar : '')
    // }
  }, [user?.city, user?.name, user?.phone, user?.surname])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string
    surname: string
    city: string
    phone: string
  }>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<any> = async (data: {
    name: string
    surname: string
    city: string
    phone: string
  }) => {
    // if (!user.idToken) {
    //   goToLoginWithMessage(EXP_MESSAGE)
    //   return
    // }
    try {
      setLoading(true)
      // dispatch(showSpinner())
      await changeUserDetails({
        // idToken: user?.idToken,
        // email: data.email,
        name: data.name,
        surname: data.surname,
        city: data.city,
        phone: data.phone,
      }).unwrap()
      setLoading(false)
      // dispatch(hideSpinner())
      // setIsOpened(false)
    } catch {
      // dispatch(hideSpinner())
      // goToLoginWithMessage(EXP_MESSAGE)
    }
  }

  const handleUploadAvatar = async (event: any) => {
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
            onChange={handleUploadAvatar}
            accept="image/*"
          />
        </label>
      </div>

      <form
        className={styles.settingsForm}
        action="#"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.nameWrapper}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>
              Имя
              <input
                {...register('name', {
                  required: 'Введите имя',
                })}
                className={styles.input}
                value={name}
                placeholder="Имя"
                onChange={handleChangeName}
              />
            </label>
            <div className={styles.error}>
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>
              Фамилия
              <input
                {...register('surname')}
                className={styles.input}
                value={surname}
                placeholder="Фамилия"
                onChange={handleChangeSurname}
              />
            </label>
          </div>
        </div>

        <div className={cn(styles.inputWrapper, styles.sizeM)}>
          <label className={styles.label}>
            Город
            <input
              {...register('city')}
              className={styles.input}
              value={city}
              placeholder="Город"
              onChange={handleChangeCity}
            />
          </label>
        </div>

        <div className={cn(styles.inputWrapper, styles.sizeL)}>
          <label className={styles.label}>
            Телефон
            <input
              {...register('phone', { required: 'Введите номер телефона' })}
              className={styles.input}
              type="tel"
              value={phone}
              placeholder="Телефон"
              onChange={handleChangePhone}
            />
          </label>
          <div className={styles.error}>
            {errors.phone && <p>{errors.phone.message}</p>}
          </div>
        </div>

        <Button btnType="submit" buttonStatus={loading ? 'disabled' : 'normal'}>
          Сохранить
        </Button>
      </form>
    </div>
  )
}
