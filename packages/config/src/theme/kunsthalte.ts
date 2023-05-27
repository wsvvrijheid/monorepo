import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { fonts } from './fonts'
import { defaultTheme } from './theme'

export const kunsthalte = extendTheme(
  merge(defaultTheme, {
    fonts: {
      body: fonts.club,
      heading: fonts.club,
    },
    colors: {
      primary: defaultTheme['colors'].teal,
    },
  }),
)
