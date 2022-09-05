import { StrapiCore } from './strapi'
import { User } from './user'

export type RoleName = 'Public' | 'Authenticated' | 'Admin'

export type Role = {
  description: string
  name: RoleName
  permissions?: Permission
  type: string
  users?: User
} & Omit<StrapiCore, 'publishedAt'>

export type Permission = {
  action: string
  role?: Role
} & Omit<StrapiCore, 'publishedAt'>
