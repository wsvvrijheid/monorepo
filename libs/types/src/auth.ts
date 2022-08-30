import { IronSession } from 'iron-session'

import { User } from './user'

export type SessionUser = Pick<
  User,
  'id' | 'username' | 'email' | 'avatar' | 'artist' | 'volunteer'
>

export type Auth = {
  user: SessionUser | null
  isLoggedIn: boolean
  token: string
}

export type Session = IronSession & Auth
