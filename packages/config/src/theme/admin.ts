import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { fonts } from './fonts'
import { defaultTheme } from './theme'

export const admin = extendTheme(
  merge(defaultTheme, {
    fonts,
    colors: {
      primary: defaultTheme['colors'].green,
    },
  }),
)
