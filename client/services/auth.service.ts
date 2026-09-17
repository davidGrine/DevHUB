import { api } from './api'

import {
  IAuthResponse,
  ILoginDto,
  IRegistrationDto,
} from '@/types/auth.types'

export const authService = {
  async login(dto: ILoginDto): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>(
      '/auth/login',
      dto
    )

    return response.data
  },

  async registration(
    dto: IRegistrationDto
  ): Promise<IAuthResponse> {
    const formData = new FormData()

    formData.append('name', dto.name)
    formData.append('username', dto.username)
    formData.append('email', dto.email)
    formData.append('password', dto.password)
    formData.append('description', dto.description)

    if (dto.avatar) {
      formData.append('avatar', dto.avatar)
    }

    const response = await api.post<IAuthResponse>(
      '/auth/registration',
      formData
    )

    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },

  async refresh(
    refreshToken: string
  ): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>(
      '/auth/refresh',
      {
        refreshToken,
      }
    )

    return response.data
  },
}