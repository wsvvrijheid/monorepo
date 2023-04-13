import { PascalCase } from 'type-fest'

import { StrapiBase } from './strapi'
import { User } from './user'

export type RoleName =
  | 'Admin'
  | 'Authenticated'
  | 'Art Editor'
  | 'Author'
  | 'Editor'
  | 'Jury'
  | 'Public'
  | 'Translator'

export type Role = Omit<StrapiBase, 'publishedAt'> & {
  description: string
  name: RoleName
  permissions?: Permission
  type: Lowercase<PascalCase<RoleName>>
  users?: User
}

export type Permission = Omit<StrapiBase, 'publishedAt'> & {
  action: string
  role?: Role
}
