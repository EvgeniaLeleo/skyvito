import classNames from 'classnames'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { Button } from '../../components/Button/Button'
import { FormData } from '../../types'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { Modal } from '../Modal/Modal'

import logo from './skyLogo.svg'

import styles from './style.module.css'
// import { useSignUpMutation } from '../../services/authApi'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.\w{2,3}$/i)
const validPasswordLength = 6

type Props = {
  setIsOpened: Function
}

export const SignUpModal: FC<Props> = ({ setIsOpened }) => {
  const navigate = useNavigate()
  useEscapeKey(() => setIsOpened(false))

  const [error, setError] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  // const [signUp] = useSignUpMutation()
  // const [addUser] = useAddUserMutation()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError('')
    setIsBlocked(true)
    // try {
    //   const { id } = await signUp({
    //     email: data.email,
    //     password: data.password,
    //   }).unwrap()
    //   // добавляем пользователя в таблицу users
    //   if (id) await addUser({ uid: id }).unwrap()
    //   navigate(ROUTES.profile)
    // } catch (error: any) {
    //   // TODO выяснить, какой тип сюда вписать
    //   // setError(getErrorMessage(error, 'Что-то пошло не так...'))
    //   setIsBlocked(false)
    // }
  }

  const focusHandler = () => setError('')

  return (
    <Modal isOpen={setIsOpened}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.inputWrapper}>
          <input
            onFocus={focusHandler}
            className={styles.input}
            placeholder="E-mail"
            {...register('email', {
              required: 'Введите e-mail',
              pattern: {
                value: validEmail,
                message: 'Введите корректный e-mail',
              },
            })}
          />
          <p className={styles.error}>
            {errors.email && <span>{errors.email.message}</span>}
          </p>
        </div>

        <div className={styles.inputWrapper}>
          <input
            onFocus={focusHandler}
            className={styles.input}
            placeholder="Пароль"
            type="password"
            {...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: validPasswordLength,
                message: `Пароль должен быть не менее ${validPasswordLength} символов`,
              },
            })}
          />
          <p className={styles.error}>
            {errors.password && <span>{errors.password.message}</span>}
          </p>
        </div>

        <div className={styles.inputWrapper}>
          <input
            onFocus={focusHandler}
            className={styles.input}
            placeholder="Повторите пароль"
            type="password"
            {...register('confirmPassword', {
              required: 'Подтвердите пароль',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues()
                  return password === value || `Пароли не совпадают`
                },
              },
            })}
          />
          <p className={styles.error}>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </p>
        </div>

        <input
          className={cn(styles.input, styles.notRequired)}
          placeholder="Имя (необязательно)"
          type="text"
          // onChange={onChangeName}
        />

        <input
          className={cn(styles.input, styles.notRequired)}
          placeholder="Фамилия (необязательно)"
          type="text"
          // onChange={onChangeName}
        />

        <div className={styles.inputWrapper}>
          <input
            className={cn(styles.input, styles.notRequired, styles.lastInput)}
            placeholder="Город (необязательно)"
            type="text"
            // onChange={onChangeName}
          />

          <p className={classNames(styles.error, styles.back)}>
            {error && <span>{error}</span>}
          </p>
        </div>

        <div className={styles.buttons}>
          <Button buttonStatus={isBlocked ? 'disabled' : 'normal'} size="xxl">
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </Modal>
  )
}
