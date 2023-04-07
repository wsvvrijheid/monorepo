import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { defaultTheme } from './theme'

export const admin = extendTheme(
  merge(defaultTheme, {
    colors: {
      primary: defaultTheme['colors'].green,
    },
  }),
)
