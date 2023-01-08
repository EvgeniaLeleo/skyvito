import { ErrorTypes } from './types'

export const API_URL = 'http://localhost:8090/'

export const API_AUTH_URL = 'https://identitytoolkit.googleapis.com/v1'

export const NUMBER_OF_IMAGES = 5

export const ERRORS: ErrorTypes = {
  'Incorrect email': 'Неверный email',
  'Incorrect password': 'Неверный пароль',
}

export const SCREEN_SIZE = {
  mobile: '(max-width: 425px)',
  desktop: '(min-width: 425.99px)',
}

export const validPasswordLength = 6
