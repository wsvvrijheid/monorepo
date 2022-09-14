import { SnakeCase } from 'type-fest'

import { Expand } from './common'
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

export type Role = Expand<
  Omit<StrapiBase, 'publishedAt'> & {
    description: string
    name: RoleName
    permissions?: Permission
    type: SnakeCase<RoleName>
    users?: User
  }
>

export type Permission = Expand<
  Omit<StrapiBase, 'publishedAt'> & {
    action: string
    role?: Role
  }
>
