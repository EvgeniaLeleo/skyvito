import { ErrorTypes } from './types'

export const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoic3RyaW5nIiwiZXhwIjoxNjcyODY1NjY4fQ.EoQrRW0fHoRCXWw54E3N70bAPrUuXyCHeSX6er96RoM'

export const API_URL = 'http://localhost:8090/'

export const API_AUTH_URL = 'https://identitytoolkit.googleapis.com/v1'

export const NUMBER_OF_IMAGES = 5

export const ERRORS: ErrorTypes = {
  'Incorrect email': 'Неверный email',
  'Incorrect password': 'Неверный пароль',
  // TODO find the key of email:
  EMAIL_EXISTS: 'Email занят',
}

// export const EXP_MESSAGE = 'Ваша сессия истекла. Пожалуйста, войдите в систему!'

// export const accessTokenName = 'idToken'

export const validPasswordLength = 6
