export type CardMainData = {
  id: number
  name?: string
  image_link?: string
  lifespan?: string
  weight_min?: string
  animal_type?: string
  description?: string
}

export type UserRESTAPI = {
  // localId?: string
  name?: string
  email?: string
  avatarLink?: string
  // idToken?: string
  // refreshToken?: string
  // registered?: boolean
  // kind?: string
  // expiresIn?: string
  // needRelogin?: boolean

  image_link?: string
  lifespan?: string
  weight_min?: string
  animal_type?: string
  description?: string
}

export type ErrorTypes = {
  [index: string]: string
}

export type AuthErrorType = {
  status: number
  data: {
    error: {
      message: string
    }
  }
}

export type FormData = {
  email: string
  password: string
  confirmPassword?: string
}
