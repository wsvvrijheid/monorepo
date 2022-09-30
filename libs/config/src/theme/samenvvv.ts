import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { colors } from './colors'
import { defaultTheme } from './theme'

export const samenvvv = extendTheme(
  merge(defaultTheme, {
    colors: {
      primary: colors.samen,
    },
  }),
)
