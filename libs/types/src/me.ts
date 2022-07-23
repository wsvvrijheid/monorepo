import { StrapiCore } from './strapi'

export type Me = {
  blocked: boolean
  confirmed: boolean
  email: string
  role: MeRole
  username: string
} & StrapiCore

export type MeRole = {
  description: string
  name: string
  type: string
} & StrapiCore
