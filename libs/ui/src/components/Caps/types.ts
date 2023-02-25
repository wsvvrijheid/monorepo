import { AspectRatioProps } from '@chakra-ui/react'
import { OgImageParams } from '@wsvvrijheid/types'
import { ImageProps } from 'next/image'

export type CapsImageProps = ImageProps & {
  imageParams: OgImageParams
}

export type CapsProps = AspectRatioProps & {
  imageParams: OgImageParams
  hasRandomImage?: boolean
}
