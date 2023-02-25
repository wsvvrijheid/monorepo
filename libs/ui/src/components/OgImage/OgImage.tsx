import { FC, memo } from 'react'

import { Image, ImageProps } from '@chakra-ui/react'
import { OgImageParams } from '@wsvvrijheid/types'
import { getOgImageSrc } from '@wsvvrijheid/utils'

type OgImageProps = ImageProps & {
  imageParams: OgImageParams
}

export const OgImage: FC<OgImageProps> = memo(({ imageParams, ...rest }) => {
  const src = getOgImageSrc(imageParams)

  return <Image w="full" src={src} {...rest} />
})
