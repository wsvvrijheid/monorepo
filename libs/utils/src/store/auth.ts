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
  isAuthLoading: true,
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isAuthLoading = false
      state.token = action.payload.token
      state.isLoggedIn = true
    })
    builder.addCase(checkAuth.pending, (state, action) => {
      state.isAuthLoading = true
    })
    builder.addCase(destroyAuth.fulfilled, state => {
      state = initialState
    })
  },
})

export const { reducer: authReducer } = authSlice
