export interface IAuthResponse {
  accessToken: string
  refreshToken: string
}

export interface ILoginDto {
  email: string
  password: string
}

export interface IRegistrationDto {
  name: string
  username: string
  email: string
  password: string
  description: string
  avatar: File | null
}