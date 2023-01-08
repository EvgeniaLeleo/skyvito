import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { Button } from '../../components/Button/Button'
import { AuthError, FormData } from '../../types'
import { useLoginMutation, useRegisterMutation } from '../../services/authApi'
import { ROUTES } from '../../routes'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useCookies } from 'react-cookie'
import { setToken } from '../../store/tokenSlice'
import { CrossIcon } from '../../components/CrossIcon/CrossIcon'
import { getErrorMessage } from '../../utils/getErrorMessage'
import { useLogout } from '../../hooks/useLogout'

import logo from './assets/skyLogo.svg'
import styles from './style.module.css'
import { PageWrapper } from '../PageWrapper/PageWrapper'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.\w{2,3}$/i)
const validPasswordLength = 6

export const SignUpPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  const [signUp] = useRegisterMutation()
  const [login, { data: userTokens }] = useLoginMutation()

  const [, setCookies] = useCookies(['access', 'refresh'])

  useEffect(() => {
    if (userTokens) {
      setCookies('access', userTokens.access_token)
      setCookies('refresh', userTokens.refresh_token)

      dispatch(
        setToken({
          access_token: userTokens.access_token,
          refresh_token: userTokens.refresh_token,
        })
      )

      // navigate(ROUTES.profile)
    }
    // eslint-disable-next-line
  }, [userTokens])

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError('')
    setIsBlocked(true)

    try {
      const user = await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
        surname: data.surname,
        city: data.city,
      }).unwrap()
      if (user)
        await login({ email: data.email, password: data.password }).unwrap()
      navigate(ROUTES.profile)
    } catch (error: any) {
      setError(getErrorMessage(error as AuthError))
      setIsBlocked(false)
    }
  }

  const focusHandler = () => setError('')

  return (
    <PageWrapper>
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
          {...register('name')}
        />

        <input
          className={cn(styles.input, styles.notRequired)}
          placeholder="Фамилия (необязательно)"
          {...register('surname')}
        />

        <div className={styles.inputWrapper}>
          <input
            className={cn(styles.input, styles.notRequired, styles.lastInput)}
            placeholder="Город (необязательно)"
            {...register('city')}
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
    </PageWrapper>
  )
}