import { api } from '@/services/api'
import { IUser } from '@/types/user.type'

export const userService = {
  async getUser(id: string): Promise<IUser> {
    const response = await api.get<IUser>(`/users/${id}`)

    return response.data
  },

  async getCurrentUser(): Promise<IUser> {
    const response = await api.get<IUser>('/users/me')

    return response.data
  },

  async getAllUsers(): Promise<IUser[]> {
    const response = await api.get<IUser[]>(
      '/users'
    )

    return response.data
  }
}