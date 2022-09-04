/* eslint-disable @typescript-eslint/no-empty-interface */

import 'iron-session'
import { User } from './user'

export type SessionUser = Pick<
  User,
  'id' | 'username' | 'email' | 'confirmed' | 'blocked'
> & {
  name?: string
  avatar?: string
  isAuthenticated: boolean
  isAdmin: boolean
  artistId?: number
  authorId?: number
  applicantId?: number
  artEditorId?: number
  juryId?: number
  translatorId?: number
  volunteerId?: number
}

export type Auth = {
  user: SessionUser | null
  isLoggedIn: boolean
  token: string | null
}

export type AuthResponse = {
  jwt: string
  user: Pick<
    User,
    | 'id'
    | 'username'
    | 'email'
    | 'provider'
    | 'confirmed'
    | 'blocked'
    | 'createdAt'
    | 'updatedAt'
  >
}

declare module 'iron-session' {
  interface IronSessionData extends Auth {}
}
