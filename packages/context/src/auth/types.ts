/* eslint-disable no-unused-vars */
import { ReactNode } from 'react'

import { Profile, RoleType, SessionUser } from '@wsvvrijheid/types'

export type AuthState = {
  user: SessionUser | null
  profile: Profile | null
  roles: RoleType[]
  isLoading: boolean
  token: string | null
  isLoggedIn: boolean
  isAuthModalOpen: boolean
  error: string | null
}

export type AuthActions = {
  login: (identifier: string, password: string) => Promise<AuthState>
  logout: () => Promise<void>
  openAuthModal: () => void
  closeAuthModal: () => void
  checkAuth: () => Promise<AuthState>
  register: (
    email: string,
    password: string,
    username: string,
    name: string,
  ) => Promise<AuthState>
}

export type AuthContextType = AuthState & AuthActions

export type AuthProviderProps = {
  children: ReactNode
  initialState?: AuthState
}
