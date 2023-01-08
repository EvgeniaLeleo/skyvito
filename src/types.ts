export type User = {
  id?: number
  name?: string
  email?: string
  city?: string
  surname?: string
  phone?: string
  avatar?: string
  sells_from?: string
}

export type Credentials = {
  email: string
  password: string
  confirmPassword?: string
  name?: string
  surname?: string
  city?: string
}

export type ChangeUserDetailsArg = {
  name?: string
  surname?: string
  city?: string
  phone?: string
}

export type Feedback = {
  id: number
  text: string
  created_on: string
  author: User
}

export type Product = {
  title: string
  description: string
  price: number
  id: number
  images: ProductImage[]
  user_id: number
  created_on: string
  user: User
}

export type ProductImage = {
  id: number
  ad_id: number
  url: string
}

export type ErrorTypes = {
  [index: string]: string
}

export type AuthError = {
  status: number
  data: {
    detail: string
    details: string
  }
}

export type FormData = {
  email: string
  password: string
  confirmPassword?: string
  name?: string
  surname?: string
  city?: string
}

export type UserTokensResponse = {
  access_token: string
  refresh_token: string
  token_type: string
}

export type UserTokensRequest = {
  access_token?: string
  refresh_token?: string
}

export type ButtonSize = 'unset' | 's' | 'm' | 'l' | 'xl' | 'xxl'
