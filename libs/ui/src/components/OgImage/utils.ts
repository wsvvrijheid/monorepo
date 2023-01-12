import { theme } from '@chakra-ui/react'
import { sample } from 'lodash'

import { OgImageProps } from './types'

export const getOgImage = (props: OgImageProps) => {
  const image = props.image || 'https://picsum.photos/300/675'

  const bgs = Object.entries(theme.colors)
    .filter(([key]) => key !== 'black' && key !== 'white')
    .map(([key, val]) => val[50])

  const colors = Object.entries(theme.colors)
    .filter(([key]) => key !== 'black' && key !== 'white')
    .map(([key, val]) => val[500])

  const index = Math.floor(Math.random() * bgs.length)
  const bg = sample([bgs[index], 'white'])
  const color = colors[index]

  const query = Object.entries({
    ...props,
    bg,
    color,
    image,
  })
    .map(([key, val]) => val && `${key}=${encodeURIComponent(val)}`)
    .join('&')

  return `/api/og?${query}`
}
