import { Expand } from './common'
import { StrapiCore } from './strapi'

export type Me = Expand<
  StrapiCore & {
    blocked: boolean
    confirmed: boolean
    email: string
    role: MeRole
    username: string
  }
>

export type MeRole = Expand<
  StrapiCore & {
    description: string
    name: string
    type: string
  }
>
