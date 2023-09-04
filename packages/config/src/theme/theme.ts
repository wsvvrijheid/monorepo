import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { components } from './components'
import { styles } from './global'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'wsvv',
}

export const defaultTheme = extendTheme({
  config,
  colors,
  components,
  styles,
  shadows: {
    outline: 'none',
  },
})
