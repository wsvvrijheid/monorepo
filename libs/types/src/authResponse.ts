import { StrapiCore } from './strapi'

export type AuthResponse = {
  jwt: string
  user: {
    id: number | null
    username: string | null
    email: string | null
    provider: string | null
    confirmed: boolean | null
    blocked: boolean | null
    createdAt: string | null
    updatedAt: string | null
  }
} & StrapiCore
