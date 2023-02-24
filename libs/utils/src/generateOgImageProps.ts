import { theme } from '@chakra-ui/react'
import { OgImageParams } from '@wsvvrijheid/types'
import { sample } from 'lodash'

export const generateOgImageParams = (props?: OgImageParams) => {
  const image = props?.image
    ? props.image
    : props?.randomImage
    ? 'https://picsum.photos/300/675'
    : undefined

  const bgs = Object.entries(theme.colors)
    .filter(([key]) => key !== 'black' && key !== 'white')
    .map(([key, val]) => val[50])

  const colors = Object.entries(theme.colors)
    .filter(([key]) => key !== 'black' && key !== 'white')
    .map(([key, val]) => val[500])

  const index = Math.floor(Math.random() * bgs.length)
  const bg = sample([bgs[index], 'white'])
  const color = colors[index]

  const shape = props?.shape ?? Math.floor(Math.random() * 4)

  const flip = props?.flip ?? Math.random() > 0.5
  const hasLine = props?.hasLine ?? Math.random() > 0.5

  return {
    bg,
    color,
    image,
    shape,
    flip,
    hasLine,
    ...props,
  }
}

export const getOgImageSrc = (props: OgImageParams) => {
  const ogImageProps = generateOgImageParams(props)

  const params = new URLSearchParams(
    JSON.parse(JSON.stringify(ogImageProps)),
  ).toString()

  return `/api/og?${params}`
}
