import { FC, useState } from 'react'

import axios from 'axios'

import { Auth } from '@wsvvrijheid/types'

import { AuthContext } from './AuthContext'
import { initialAuthState } from './state'
import { AuthProviderProps, AuthState } from './types'

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  initialState = initialAuthState,
}) => {
  const [state, setState] = useState<AuthState>(initialState)

  const checkAuth = async () => {
    try {
      const response = await axios.get<Auth>('/api/auth/user')

      const newState: AuthState = {
        ...state,
        ...response.data,
      }

      setState(newState)

      return newState
    } catch (error: any) {
      setState({
        ...initialAuthState,
        error: error.message,
      })

      return initialAuthState
    }
  }

  const logout = async () => {
    await axios.post<Auth>('/api/auth/logout')

    setState(initialAuthState)

    return initialAuthState
  }

  const login = async (identifier: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', {
        identifier,
        password,
      })

      const newState = {
        ...state,
        user: response.data.user,
        isLoggedIn: true,
        token: response.data.token,
      }

      setState(newState)

      return newState
    } catch (error: any) {
      setState({
        ...initialAuthState,
        error: error.message,
      })

      return initialAuthState
    }
  }

  const register = async (
    email: string,
    password: string,
    username: string,
    name: string,
  ) => {
    try {
      const response = await axios.post('/api/auth/register', {
        email,
        password,
        username,
        name,
      })

      const newState = {
        ...state,
        user: response.data.user,
        isLoggedIn: true,
        token: response.data.token,
      }

      setState(newState)

      return newState
    } catch (error: any) {
      setState({
        ...initialAuthState,
        error: error.message,
      })

      return initialAuthState
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
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
