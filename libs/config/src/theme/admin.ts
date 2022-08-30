import { extendTheme } from '@chakra-ui/react'

import { theme } from './theme'

export const admin = extendTheme({
  ...theme,
  colors: {
    primary: theme['colors'].blue,
  },
})
