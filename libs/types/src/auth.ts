import { User } from './user'

export type Auth = {
  user: User
  isLoggedIn: boolean
  token: string
}
