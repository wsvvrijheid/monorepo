import { AspectRatioProps } from '@chakra-ui/react'
import { ImageProps } from 'next/image'

import { OgImageParams } from '@wsvvrijheid/types'

export type CapsImageProps = ImageProps & {
  imageParams: OgImageParams
}

export type CapsProps = AspectRatioProps & {
  imageParams: OgImageParams
  hasRandomImage?: boolean
}
