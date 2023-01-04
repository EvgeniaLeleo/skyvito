import { ERRORS } from '../constants'
import { AuthErrorType } from '../types'

export const getErrorMessage = (
  error: AuthErrorType,
  defaultError = 'Неверный логин или пароль'
) => {
  const testValue: string = ERRORS[error.data.detail]
  return testValue || defaultError
}
