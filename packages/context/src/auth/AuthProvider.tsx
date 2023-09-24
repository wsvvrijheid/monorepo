import { FC, createContext, useContext, useEffect, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Auth, Profile, RoleType, SessionUser } from '@wsvvrijheid/types'

import { initialAuthState } from './state'
import { AuthContextType, AuthProviderProps, AuthState } from './types'

export const AuthContext = createContext<AuthContextType>(initialAuthState)

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  initialState = initialAuthState,
}) => {
  // TODO: Use useReducer instead of useState
  const [user, setUser] = useState<SessionUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [roles, setRoles] = useState<RoleType[]>(initialAuthState.roles)
  const [token, setToken] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const authModalDisclosure = useDisclosure()
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if (initialState) {
      setUser(initialState.user)
      setRoles(initialState.roles)
      setToken(initialState.token)
      setIsLoggedIn(initialState.isLoggedIn)
      setError(initialState.error)
    }
  }, [initialState])

  const checkAuth = async (): Promise<AuthState> => {
    setIsLoading(true)
    try {
      const response = await axios.get<Auth>('/api/auth/user')

      if (response.data?.user) {
        setUser(response.data?.user)
        setRoles(response.data?.user?.roles)
        setToken(response.data?.token)
        setIsLoggedIn(response.data?.isLoggedIn)
        setProfile(response.data?.profile)
      }

      return {
        ...response.data,
        roles: response.data?.user?.roles || initialAuthState.roles,
        error: null,
        isAuthModalOpen: false,
        isLoading: false,
      }
    } catch (error: any) {
      setError(error.message)

      return initialAuthState
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setIsLoading(true)

    try {
      await axios.post<Auth>('/api/auth/logout')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setUser(null)
      setToken(null)
      setRoles(initialAuthState.roles)
      setIsLoggedIn(false)
      setIsLoading(false)

      router.push('/')
    }
  }

  const login = async (
    identifier: string,
    password: string,
  ): Promise<AuthState> => {
    setIsLoading(true)
    try {
      const response = await axios.post<Auth>('/api/auth/login', {
        identifier,
        password,
      })

      if (response.data) {
        setUser(response.data.user)
        setToken(response.data.token)
        setIsLoggedIn(response.data.isLoggedIn)
        setProfile(response.data.profile)
      }

      return {
        ...response.data,
        roles: initialAuthState.roles,
        isAuthModalOpen: false,
        error: null,
        isLoading: false,
      }
    } catch (error: any) {
      setError(error.message)
      if (error.response.status === 400) {
        throw t('login.wrong-password-username')
      } else {
        throw error.message
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    username: string,
    name: string,
  ): Promise<AuthState> => {
    setIsLoading(true)

    try {
      const response = await axios.post<Auth>('/api/auth/register', {
        email,
        password,
        username,
        name,
      })

      if (response.data) {
        setUser(response.data.user)
        setToken(response.data.token)
        setIsLoggedIn(response.data.isLoggedIn)
        setProfile(response.data.profile)
      }

      return {
        ...response.data,
        roles: initialAuthState.roles,
        isAuthModalOpen: false,
        error: null,
        isLoading: false,
      }
    } catch (error: any) {
      setError(error.message)

      return initialAuthState
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        roles,
        token,
        isLoggedIn,
        isLoading,
        error,
        checkAuth,
        logout,
        login,
        register,
        isAuthModalOpen: authModalDisclosure.isOpen,
        openAuthModal: authModalDisclosure.onOpen,
        closeAuthModal: authModalDisclosure.onClose,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
