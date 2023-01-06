import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie'

import { Button } from '../../components/Button/Button'
import { validPasswordLength } from '../../constants'
import { AuthErrorType, FormData } from '../../types'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { SignUpModal } from '../SignUpModal/SignUpModal'
import { Modal } from '../Modal/Modal'
import { useLoginMutation } from '../../services/authApi'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import { getErrorMessage } from '../../utils/getErrorMessage'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setToken } from '../../store/tokenSlice'

import logo from './assets/skyLogo.svg'
import styles from './style.module.css'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i)

type Props = {
  setIsOpened: Function
}

export const LoginModal: FC<Props> = ({ setIsOpened }) => {
  useEscapeKey(() => setIsOpened(false))

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login, { data: userTokens }] = useLoginMutation()

  const [error, setError] = useState<string>('')
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const [isLoginModalShown, setIsLoginModalShown] = useState<boolean>(true)
  const [isSignUpModalShown, setIsSignUpModalShown] = useState<boolean>(false)
  const [cookies, setCookies] = useCookies(['access', 'refresh'])

  // const message = useAppSelector(selectMessage)
  // const [formMessage, setFormMessage] = useState('')

  // useEffect(() => {
  //   if (message) {
  //     setFormMessage(message)
  //     dispatch(clearMessage())
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  //?
  // useEffect(() => {
  //   //  return () => setIsLoginModalShown(true)
  // }, [isLoginModalShown, isSignUpModalShown])

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
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsBlocked(true)
    setError('')

    try {
      await login({ email: data.email, password: data.password }).unwrap()
      navigate(ROUTES.profile)
    } catch (error) {
      setError(getErrorMessage(error as AuthErrorType))
      setIsBlocked(false)
    }
  }

  const focusHandler = () => setError('')

  const handleSignUpClick = () => {
    setIsLoginModalShown(false)
    setIsSignUpModalShown(true)
  }

  // console.log(isLoginModalShown)

  const inputPasswordStyle = classNames(styles.input, styles.inputPassword)

  return (
    <>
      {isLoginModalShown && (
        <Modal isOpen={setIsOpened}>
          {/* {formMessage && <h2 className={styles.formMessage}>{formMessage}</h2>} */}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <img className={styles.logo} src={logo} alt="logo" />
            <div className={styles.inputs}>
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

              <input
                onFocus={focusHandler}
                className={inputPasswordStyle}
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
            <p className={classNames(styles.error, styles.back)}>
              {error && <span>{error}</span>}
            </p>
            <div className={styles.buttons}>
              <Button
                buttonStatus={isBlocked ? 'disabled' : 'normal'}
                size="xxl"
                mb="20px"
                btnType="submit"
              >
                Войти
              </Button>
              <Button
                type="outlined"
                btnType="button"
                onClick={handleSignUpClick}
                buttonStatus={isBlocked ? 'disabled' : 'normal'}
                size="xxl"
              >
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {isSignUpModalShown && (
        <SignUpModal setIsOpened={setIsSignUpModalShown} />
      )}
    </>
  )
}
