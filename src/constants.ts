import { ErrorTypes } from './types'

export const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoic3RyaW5nIiwiZXhwIjoxNjcyNzk2OTE2fQ.tyFqtBaopDqfAr5kfcslh4ybI-1iOkCOe10AO_Y-gv0'

export const API_URL = 'http://localhost:8090/'

export const API_AUTH_URL = 'https://identitytoolkit.googleapis.com/v1'

export const NUMBER_OF_IMAGES = 5

export const USER = {
  username: 'друг любезный',
  avatarLink:
    'https://upload.wikimedia.org/wikipedia/commons/e/ee/Gorfou_sauteur_-_Rockhopper_Penguin.jpg',
  // id: 1,
  // password: 'MySecret12345',
  // uid: 'kwtEgq2ylcZI0iUjgDAWlRqHixB3',
  // courses: [
  //   {
  //     id: 1,
  //     name: 'Йога',
  //   },
  // ],
}

// export const NUMBER_OF_SKELETONS = 6

// export const API_URL =
//   'https://skyfitnesspro-202210-default-rtdb.europe-west1.firebasedatabase.app/'

// export const API_AUTH_URL = 'https://identitytoolkit.googleapis.com/v1'

export const ERRORS: ErrorTypes = {
  EMAIL_NOT_FOUND: 'Неверный email',
  INVALID_PASSWORD: 'Неверный пароль',
  EMAIL_EXISTS: 'Email занят',
}

// export const EXP_MESSAGE = 'Ваша сессия истекла. Пожалуйста, войдите в систему!'

// export const accessTokenName = 'idToken'

export const validPasswordLength = 6
