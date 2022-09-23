import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { defaultTheme } from './theme'

export const kunsthalte = extendTheme(
  merge(defaultTheme, {
    styles: {
      global: {
        body: {
          fontFamily: 'club',
        },
      },
    },
    colors: {
      primary: defaultTheme['colors'].red,
    },
  }),
)
