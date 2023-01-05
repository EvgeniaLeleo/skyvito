export type User = {
  id?: number
  name?: string
  email?: string
  city?: string
  surname?: string
  phone?: string
  avatar?: string
  sells_from?: string
  role?: string
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

// export type RefreshTokenResponse = {
//   expires_in?: string
//   token_type?: string
//   refresh_token?: string
//   id_token?: string
//   user_id?: string
//   project_id?: string
// }

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

export type AuthErrorType = {
  status: number
  data: {
    detail: string
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

export type UserTokens = {
  access_token: string
  refresh_token: string
  token_type: string
}
