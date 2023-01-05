import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import { User } from '../../types'
import { Button } from '../Button/Button'
import { useChangeUserDetailsMutation } from '../../services/usersApi'
import { AvatarBlock } from '../AvatarBlock/AvatarBlock'

import styles from './style.module.css'

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

  const [changeUserDetails] = useChangeUserDetailsMutation()

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

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Form>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<any> = async (data: Form) => {
    // if (!user.idToken) {
    //   goToLoginWithMessage(EXP_MESSAGE)
    //   return
    // }
    try {
      setIsBlocked(true)
      // dispatch(showSpinner())
      await changeUserDetails({
        // idToken: user?.idToken,
        name: data.name,
        surname: data.surname,
        city: data.city,
        phone: data.phone,
      }).unwrap()
      setError('')
      setButtonText('Сохранено')
      // dispatch(hideSpinner())
      // setIsOpened(false)
    } catch {
      setButtonText('Сохранить')
      setIsBlocked(false)
      setError('⚠ Ошибка! Попробуйте еще раз!')
      // dispatch(hideSpinner())
      // goToLoginWithMessage(EXP_MESSAGE)
    }
  }

  // const isFormValid = fieldValue?.name?.length && phone.length

  return (
    <div className={styles.userSettings}>
      <AvatarBlock user={user} />
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
                {...register('name')}
                className={styles.input}
                value={fieldValue.name}
                placeholder="Имя"
                onChange={(e) => handleFieldChange(e, 'name')}
              />
            </label>
            {/* <div className={styles.error}>
              {errors.name && <p>{errors.name.message}</p>}
            </div> */}
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
              // {...register('phone', { required: 'Введите номер телефона' })}
              {...register('phone')}
              className={styles.input}
              type="tel"
              value={phone}
              placeholder="Телефон"
              onChange={handleChangePhone}
            />
          </label>
          {/* <div className={styles.error}>
            {errors.phone && <p>{errors.phone.message}</p>}
          </div> */}
        </div>
        <div>
          <Button
            btnType="submit"
            // buttonStatus={isFormValid && !isBlocked ? 'normal' : 'disabled'}
            buttonStatus={!isBlocked ? 'normal' : 'disabled'}
          >
            {buttonText}
          </Button>
          <span className={styles.uploadError}>{error}</span>
        </div>
      </form>
    </div>
  )
}
