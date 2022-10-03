import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { colors } from './colors'
import { fonts } from './fonts'
import { styles } from './global'
import { defaultTheme } from './theme'

export const samenvvv = extendTheme(
  merge(defaultTheme, {
    fonts: {
      body: fonts.body,
      heading: fonts.body,
    },
    styles: styles(fonts.body),
    colors: {
      primary: colors.samen,
    },
  }),
)
