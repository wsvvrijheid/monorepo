import { AuthContextType } from './types'

export const initialAuthState: AuthContextType = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  token: null,
  user: null,
  roles: ['public'],
  checkAuth: () => Promise.resolve(initialAuthState),
  login: () => Promise.resolve(initialAuthState),
  logout: () => Promise.resolve(initialAuthState),
  register: () => Promise.resolve(initialAuthState),
}
