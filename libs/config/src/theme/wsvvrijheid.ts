import { extendTheme } from '@chakra-ui/react'

import { theme } from './theme'

export const wsvvrijheid = extendTheme({
  ...theme,
  colors: {
    primary: theme['colors'].blue,
  },
})
