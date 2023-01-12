import { theme } from '@chakra-ui/react'
import { sample } from 'lodash'

import { OgImageProps } from './types'

export const getOgImage = (props: OgImageProps) => {
  const shape = sample([0, 1, 2, 3])
  const flip = sample([true, false])

  const bgs = Object.entries(theme.colors)
    .filter(([key]) => key !== 'black' && key !== 'white')
    .map(([key, val]) => val[50])

  const colors = Object.entries(theme.colors)
    .filter(([key]) => key !== 'black' && key !== 'white')
    .map(([key, val]) => val[500])

  const index = Math.floor(Math.random() * bgs.length)
  const bg = sample([bgs[index], 'white'])
  const color = colors[index]

  const query = Object.entries({ ...props, shape, flip, bg, color })
    .map(([key, val]) => val && `${key}=${encodeURIComponent(val)}`)
    .filter(Boolean)
    .join('&')

  return `/api/og?${query}`
}
