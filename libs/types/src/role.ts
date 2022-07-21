import { User } from './user'

export type Role = {
  id: number
  createdAt: string
  description: string
  name: string
  permissions: Permission
  type: string
  updatedAt: string
  users: User
}

export type Permission = {
  id: number
  action: string
  createdAt: string
  updatedAt: string
  role: Role
}
