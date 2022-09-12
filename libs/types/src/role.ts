import { Expand } from './common'
import { StrapiCore } from './strapi'
import { User } from './user'

export type RoleName = 'Public' | 'Authenticated' | 'Editor' | 'Admin'

export type Role = Expand<
  Omit<StrapiCore, 'publishedAt'> & {
    description: string
    name: RoleName
    permissions?: Permission
    type: string
    users?: User
  }
>

export type Permission = Expand<
  Omit<StrapiCore, 'publishedAt'> & {
    action: string
    role?: Role
  }
>
