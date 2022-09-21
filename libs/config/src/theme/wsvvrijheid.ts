import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { defaultTheme } from './theme'

export const wsvvrijheid = extendTheme(
  merge(defaultTheme, {
    colors: {
      primary: defaultTheme['colors'].blue,
    },
  }),
)
