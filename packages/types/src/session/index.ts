import { RoleType } from '../role'
import { User } from '../user'

export type SessionUser = Pick<
  User,
  'id' | 'username' | 'email' | 'confirmed' | 'blocked'
> & {
  applicantId?: number
  artistId?: number
  avatar?: string
  roles: RoleType[]
  name?: string
  volunteerId?: number
}

export type Auth = {
  user: SessionUser | null
  isLoggedIn: boolean
  token: string | null
}

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
}
