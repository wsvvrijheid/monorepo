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

export const loginAuth = createAsyncThunk<
  Auth,
  { identifier: string; password: string }
>('auth/login', async data => {
  const response = await axios.post('/api/auth/login', data)
  return response.data
})

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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      return {
        ...action.payload,
        isAuthLoading: false,
      }
    })
    builder.addCase(checkAuth.pending, state => {
      state.isAuthLoading = true
    })
    builder.addCase(destroyAuth.fulfilled, (state, action) => {
      return initialState
    })
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      return {
        ...action.payload,
        isAuthLoading: false,
      }
    })
    builder.addCase(loginAuth.pending, (state, action) => {
      state.isAuthLoading = true
    })
  },
})

export const { reducer: authReducer } = authSlice
