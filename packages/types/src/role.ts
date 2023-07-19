import { PascalCase } from 'type-fest'

import { StrapiBase } from './strapi'
import { User } from './user'

export type RoleName =
  | 'Admin'
  | 'Authenticated'
  | 'Art Editor'
  | 'Author'
  | 'Jury'
  | 'Public'
  | 'Translator'
  | 'Account Manager'
  | 'Academy Editor'
  | 'Content Manager'
  | 'All'

export type RoleType = Lowercase<PascalCase<RoleName>>

export type Role = Omit<StrapiBase, 'publishedAt'> & {
  description: string
  name: RoleName
  permissions?: Permission
  type: RoleType
  users?: User
}

export type Permission = Omit<StrapiBase, 'publishedAt'> & {
  action: string
  role?: Role
}
