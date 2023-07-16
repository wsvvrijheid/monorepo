import { FC, createContext, useEffect, useState } from 'react'
import { useContext } from 'react'

import axios from 'axios'

import { Auth, RoleType, SessionUser } from '@wsvvrijheid/types'

import { initialAuthState } from './state'
import { AuthContextType, AuthProviderProps, AuthState } from './types'

export const AuthContext = createContext<AuthContextType>(initialAuthState)

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  initialState = initialAuthState,
}) => {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [roles, setRoles] = useState<RoleType[]>([])
  const [token, setToken] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialState) {
      setUser(initialState.user)
      setRoles(initialState.roles)
      setToken(initialState.token)
      setIsLoggedIn(initialState.isLoggedIn)
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
      }

      return {
        ...response.data,
        roles: response.data?.user?.roles || initialAuthState.roles,
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

  const logout = async (): Promise<AuthState> => {
    setIsLoading(true)

    try {
      await axios.post<Auth>('/api/auth/logout')
    } catch (error: any) {
      return initialAuthState
    } finally {
      setUser(null)
      setToken(null)
      setIsLoggedIn(false)
      setIsLoading(false)
    }

    return initialAuthState
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
      }

      return {
        ...response.data,
        roles: initialAuthState.roles,
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
      }

      return {
        ...response.data,
        roles: initialAuthState.roles,
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
        roles,
        token,
        isLoggedIn,
        isLoading,
        error,
        checkAuth,
        logout,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
