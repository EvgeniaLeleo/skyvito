import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import { User } from '../../types'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import {
  useChangeUserDetailsMutation,
  useUploadUserAvatarMutation,
} from '../../services/usersApi'

import styles from './style.module.css'

type Props = {
  user: User
}

type Form = {
  name: string
  surname: string
  city: string
  phone: string
}

const regexp = new RegExp(/[^0-9+\-()]/i)

export const UserSettings: FC<Props> = ({ user }) => {
  const initialValue = {
    name: user.name,
    surname: user.surname,
    city: user.city,
    phone: user.phone,
  }

  const [uploadedAvatar, setUploadedAvatar] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [fieldValue, setFieldValue] = useState<Form>(initialValue)
  const [phone, setPhone] = useState<string>(user.phone || '')

  const [uploadAvatar, { error: avatarError }] = useUploadUserAvatarMutation()
  const [changeUserDetails] = useChangeUserDetailsMutation()

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    setFieldValue((prev: Form) => ({ ...prev, [field]: e.target.value }))
  }

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneValue = e.target.value

    if (regexp.test(inputPhoneValue)) {
      e.target.value = inputPhoneValue.replace(regexp, '')
    }

    setPhone(e.target.value)
  }

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
                value={fieldValue.name}
                placeholder="Имя"
                onChange={(e) => handleFieldChange(e, 'name')}
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
                value={fieldValue.surname}
                placeholder="Фамилия"
                onChange={(e) => handleFieldChange(e, 'surname')}
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
              value={fieldValue.city}
              placeholder="Город"
              onChange={(e) => handleFieldChange(e, 'city')}
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
