import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth, SessionUser } from '@wsvvrijheid/types'
import axios from 'axios'

export type AuthState = {
  user: SessionUser | null
  isAuthLoading: boolean
  token: string | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthLoading: false,
  token: null,
  isLoggedIn: false,
}

export const checkAuth = createAsyncThunk('auth/check', async () => {
  const response = await axios.get<Auth>('/api/auth/user')
  return response.data
})

export const destroyAuth = createAsyncThunk('auth/destroy', async () => {
  await axios.get<Auth>('/api/auth/logout')
  return initialState
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
      state.isAuthLoading = false
    },
    loadingAuth: state => {
      state.isAuthLoading = true
    },
  },
  extraReducers: builder => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      return {
        ...action.payload,
        error: null,
        isAuthLoading: false,
      }
    })
    builder.addCase(checkAuth.pending, state => {
      state.isAuthLoading = true
    })
    builder.addCase(destroyAuth.fulfilled, (state, action) => {
      return initialState
    })
  },
})

export const { setAuth, loadingAuth } = authSlice.actions

export const { reducer: authReducer } = authSlice
