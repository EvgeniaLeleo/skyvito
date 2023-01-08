import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import { User } from '../../types'
import { Button } from '../Button/Button'
import {
  useChangeUserDetailsMutation,
  useUploadUserAvatarMutation,
} from '../../services/usersApi'
import { AvatarBlock } from '../AvatarBlock/AvatarBlock'

import styles from './style.module.css'
import { useLogout } from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'

type Props = {
  user: User
}

type Form = {
  name?: string
  surname?: string
  city?: string
  phone?: string
}

const regexp = new RegExp(/[^0-9+]/i)
let formData: any = []

export const UserSettings: FC<Props> = ({ user }) => {
  const initialValue = {
    name: user.name,
    surname: user.surname,
    city: user.city,
    phone: user.phone,
  }

  const [isBlocked, setIsBlocked] = useState<boolean>(true)
  const [buttonText, setButtonText] = useState<string>('Сохранить')
  const [error, setError] = useState<string>('')
  const [fieldValue, setFieldValue] = useState<Form>(initialValue)
  const [phone, setPhone] = useState<string>(user.phone || '')
  const [loading, setLoading] = useState<boolean>(false)

  const [changeUserDetails] = useChangeUserDetailsMutation()
  const [uploadAvatar, { error: avatarError }] = useUploadUserAvatarMutation()

  const logout = useLogout()
  const navigate = useNavigate()

  useEffect(() => {
    setIsBlocked(isBlocked)
  }, [isBlocked])

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    setIsBlocked(false)
    setButtonText('Сохранить')
    setFieldValue((prev: Form) => ({ ...prev, [field]: e.target.value }))
  }

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBlocked(false)
    setButtonText('Сохранить')

    const inputPhoneValue = e.target.value

    if (regexp.test(inputPhoneValue)) {
      e.target.value = inputPhoneValue.replace(regexp, '')
    }

    setPhone(e.target.value)
  }

  const { register, handleSubmit } = useForm<Form>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<any> = async (data: Form) => {
    // if (!user.idToken) {
    //   goToLoginWithMessage(EXP_MESSAGE)
    //   return
    // }
    setIsBlocked(true)

    try {
      await changeUserDetails({
        name: data.name,
        surname: data.surname,
        city: data.city,
        phone: data.phone,
      }).unwrap()

      if (formData[0]) {
        setLoading(true)
        await uploadAvatar(formData[0]).unwrap()
        setLoading(false)
      }

      setError('')
      setButtonText('Сохранено')
    } catch {
      setButtonText('Сохранить')
      setIsBlocked(false)

      setError('⚠ Ошибка! Попробуйте еще раз!')
      // goToLoginWithMessage(EXP_MESSAGE)
    }

    formData = []
  }

  const handleLogout = () => {
    logout()
    navigate(ROUTES.main)
  }

  return (
    <div className={styles.userSettings}>
      <AvatarBlock
        user={user}
        formData={formData}
        avatarError={avatarError}
        loading={loading}
        setIsBlocked={setIsBlocked}
      />
      <form className={styles.settingsForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.nameWrapper}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>
              Имя
              <input
                {...register('name')}
                className={styles.input}
                value={fieldValue.name}
                placeholder="Имя"
                onChange={(e) => handleFieldChange(e, 'name')}
              />
            </label>
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
        {/* <div className={cn(styles.inputWrapper, styles.sizeM)}> */}
        <div className={cn(styles.inputWrapper, styles.sizeL)}>
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
              {...register('phone')}
              className={styles.input}
              type="tel"
              value={phone}
              placeholder="Телефон"
              onChange={handleChangePhone}
            />
          </label>
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            btnType="submit"
            buttonStatus={isBlocked ? 'disabled' : 'normal'}
          >
            {buttonText}
          </Button>
          <span className={styles.uploadError}>{error}</span>
          <Button onClick={handleLogout}>Выйти</Button>
        </div>
      </form>
    </div>
  )
}
