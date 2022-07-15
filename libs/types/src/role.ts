import { StrapiRawCollection, StrapiRawEntity } from './strapi'
import { RawUser, User } from './user'

export type RawRole = {
  createdAt: string
  description: string
  name: string
  permissions: RawPermission
  type: string
  updatedAt: string
  users: StrapiRawCollection<RawUser>
}

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

export type RawPermission = {
  action: string
  createdAt: string
  updatedAt: string
  role: RawRole
}

export type Permission = {
  id: number
  action: string
  createdAt: string
  updatedAt: string
  role: Role
}
