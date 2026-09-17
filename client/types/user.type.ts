import { IProject } from './project.type'

export interface IUserRole {
  _id: string
  role: string
}

export interface IUser {
  _id: string
  name: string
  username: string
  description: string
  image: string
  projects: IProject[]
  avatar: string | null
  roles: IUserRole[]
}