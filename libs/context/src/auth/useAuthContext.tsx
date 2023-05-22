import { useContext } from 'react'

import { AuthContext } from './AuthProvider'

export const useAuthContext = () => useContext(AuthContext)
