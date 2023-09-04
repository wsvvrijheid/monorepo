import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'
import { Tulpen_One } from 'next/font/google'

import { fonts } from './fonts'
import { defaultTheme } from './theme'

const tulpen = Tulpen_One({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const lotus = extendTheme(
  merge(defaultTheme, {
    config: {
      initialColorMode: 'dark',
    },
    fonts: {
      body: fonts.body,
      heading: fonts.body,
      lotus: tulpen.style.fontFamily,
    },
    colors: {
      primary: defaultTheme['colors'].lotus,
    },
  }),
)
