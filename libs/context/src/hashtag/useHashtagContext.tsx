import { useContext } from 'react'

import { HashtagContext } from './HashtagProvider'

export const useHashtagContext = () => useContext(HashtagContext)
