import { Expand } from './common'
import { StrapiBase } from './strapi'

export type Me = Expand<
  StrapiBase & {
    blocked: boolean
    confirmed: boolean
    email: string
    role: MeRole
    username: string
  }
>

export type MeRole = Expand<
  StrapiBase & {
    description: string
    name: string
    type: string
  }
>
