import { extendTheme } from '@chakra-ui/react'

import { theme } from './theme'

export const admin = extendTheme({
  ...theme,
  fonts: { body: `'Poppins', sans-serif`, heading: `'Poppins', sans-serif` },
  colors: {
    primary: theme['colors'].green,
  },
})
