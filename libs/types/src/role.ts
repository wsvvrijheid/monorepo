import { Expand } from './common'
import { StrapiBase } from './strapi'
import { User } from './user'

export type RoleName = 'Public' | 'Authenticated' | 'Editor' | 'Admin'

export type Role = Expand<
  Omit<StrapiBase, 'publishedAt'> & {
    description: string
    name: RoleName
    permissions?: Permission
    type: string
    users?: User
  }
>

export type Permission = Expand<
  Omit<StrapiBase, 'publishedAt'> & {
    action: string
    role?: Role
  }
>
