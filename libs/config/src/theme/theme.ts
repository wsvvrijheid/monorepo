import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { components } from './components'
import { styles } from './global'

const fonts = { body: `'Rubik', sans-serif`, club: `'Sriracha', cursive` }

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'wsvv',
}

export const theme = extendTheme({
  config,
  fonts,
  colors,
  components,
  styles,
  shadows: {
    outline: 'none',
    primary: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;',
  },
})
