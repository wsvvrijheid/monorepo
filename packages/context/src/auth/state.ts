import { AuthContextType } from './types'

export const initialAuthState: AuthContextType = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  token: null,
  user: null,
  profile: null,
  roles: ['public'],
  openAuthModal: () => {},
  closeAuthModal: () => {},
  isAuthModalOpen: false,
  checkAuth: () => Promise.resolve(initialAuthState),
  login: () => Promise.resolve(initialAuthState),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(initialAuthState),
}
