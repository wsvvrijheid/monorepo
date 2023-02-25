import { FC, memo } from 'react'

import { OgImageParams } from '@wsvvrijheid/types'
import { getOgImageSrc } from '@wsvvrijheid/utils'
import Image from 'next/image'

type OgImageProps = {
  imageParams: OgImageParams
}

export const OgImage: FC<OgImageProps> = memo(({ imageParams }) => {
  const src = getOgImageSrc(imageParams)

  return (
    <Image
      loader={({ src }) => src}
      width={1200}
      height={675}
      src={src}
      alt={imageParams.title || ''}
    />
  )
})
