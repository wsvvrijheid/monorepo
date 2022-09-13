import { extendTheme } from '@chakra-ui/react'

import { theme } from './theme'

export const kunsthalte = extendTheme({
  ...theme,
  styles: {
    global: {
      body: {
        fontFamily: 'club',
      },
    },
  },
  colors: {
    primary: theme['colors'].red,
  },
})
