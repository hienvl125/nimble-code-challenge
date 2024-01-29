export type RegisterUserCredentials = {
  email: string;
  password: string;
}

export type LoginUserCredentials = {
  email: string;
  password: string;
}

export type UserSession = {
  id: string
  email: string
  accessToken: string
}
