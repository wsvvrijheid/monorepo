import { ReactNode } from 'react'

import { SessionUser } from '@wsvvrijheid/types'

export type AuthState = {
  user: SessionUser | null
  isLoading: boolean
  token: string | null
  isLoggedIn: boolean
  error: string | null
}

export type AuthActions = {
  login: (identifier: string, password: string) => Promise<AuthState>
  logout: () => Promise<AuthState>
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
