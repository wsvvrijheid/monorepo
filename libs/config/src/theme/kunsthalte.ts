import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { fonts } from './fonts'
import { styles } from './global'
import { defaultTheme } from './theme'

export const kunsthalte = extendTheme(
  merge(defaultTheme, {
    fonts: {
      body: fonts.club,
      heading: fonts.club,
    },
    styles: styles(fonts.club),
    colors: {
      primary: defaultTheme['colors'].pink,
    },
  }),
)
