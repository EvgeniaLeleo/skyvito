export type CardMainData = {
  id: number
  name?: string
  image_link?: string
  lifespan?: string
  weight_min?: string
  animal_type?: string
  description?: string
}

export type Feedback = {
  id: number
  text: string
  created_on: string
  author: UserRESTAPI
}

export type Product = {
  title: string
  description: string
  price: number
  id: number
  images: ProductImage[]
  user_id: number
  created_on: string
  user: UserRESTAPI
}

export type ProductImage = {
  id: number
  ad_id: number
  url: string
}

export type UserRESTAPI = {
  id: number
  email: string
  city: string
  role: string
  name: string
  surname: string
  phone: string

  // localId?: string
  // name?: string
  // email?: string
  avatarLink?: string
  // idToken?: string
  // refreshToken?: string
  // registered?: boolean
  // kind?: string
  // expiresIn?: string
  // needRelogin?: boolean

  // image_link?: string
  // lifespan?: string
  // weight_min?: string
  // animal_type?: string
  // description?: string
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
