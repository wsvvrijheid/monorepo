import { StrapiCore } from './strapi'
import { User } from './user'

export type Role = {
  description: string
  name: string
  permissions?: Permission
  type: string
  users?: User
} & Omit<StrapiCore, 'publishedAt'>

export type Permission = {
  action: string
  role?: Role
} & Omit<StrapiCore, 'publishedAt'>
