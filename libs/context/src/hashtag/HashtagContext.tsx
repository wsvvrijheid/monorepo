import { createContext } from 'react'

import { initialHashtagState } from './state'
import { HashtagContextType } from './types'

export const HashtagContext =
  createContext<HashtagContextType>(initialHashtagState)
