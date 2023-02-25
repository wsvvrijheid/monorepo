import { FC, memo } from 'react'

import { OgImageParams } from '@wsvvrijheid/types'
import { getOgImageSrc } from '@wsvvrijheid/utils'
import Image from 'next/image'

type OgImageProps = {
  imageParams: OgImageParams
}

const OgImage: FC<OgImageProps> = memo(({ imageParams }) => {
  const src = getOgImageSrc(imageParams)

  return (
    <Image
      unoptimized
      width={1200}
      height={675}
      src={src}
      style={{ objectFit: 'cover', width: '100%' }}
      alt={imageParams.title || ''}
    />
  )
})

export default OgImage
