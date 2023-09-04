import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'
import { MuseoModerno } from 'next/font/google'

import { defaultTheme } from './theme'

const museo = MuseoModerno({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const kunsthalte = extendTheme(
  merge(defaultTheme, {
    fonts: {
      body: museo.style.fontFamily,
      heading: museo.style.fontFamily,
    },
    colors: {
      primary: defaultTheme['colors'].teal,
    },
  }),
)
