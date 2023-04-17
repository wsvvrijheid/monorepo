import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { defaultTheme } from './theme'

export const admin = extendTheme(
  merge(defaultTheme, {
    styles: {
      global: {
        body: {
          overflow: 'hidden',
        },
        '#__next': {
          h: '100vh',
          overflow: 'hidden',
        },
      },
    },
    colors: {
      primary: defaultTheme['colors'].green,
    },
  }),
)
