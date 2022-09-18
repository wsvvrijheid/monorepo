import { SnakeCase } from 'type-fest'

import { StrapiBase } from './strapi'
import { User } from './user'

export type RoleName =
  | 'Admin'
  | 'Authenticated'
  | 'Author'
  | 'Editor'
  | 'Jury'
  | 'Public'
  | 'Translator'
  | 'Translator Editor'

export type Role = Omit<StrapiBase, 'publishedAt'> & {
  description: string
  name: RoleName
  permissions?: Permission
  type: SnakeCase<RoleName>
  users?: User
}

export type Permission = Omit<StrapiBase, 'publishedAt'> & {
  action: string
  role?: Role
}
