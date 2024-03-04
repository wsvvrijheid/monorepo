import { FC } from 'react'

import { useRouter } from 'next/router'

import { UploadFile } from '@fc/types'

import { ArtCardImageProps, CardImageProps } from './types'
import { WImage } from '../WImage'

const CardImage: FC<CardImageProps> = ({ art, isMasonry, image, locale }) => (
  <WImage
    pos="relative"
    zIndex={-1}
    h={isMasonry ? undefined : 300}
    src={image as UploadFile}
    alt={art?.[`title_${locale}`]}
    userSelect="none"
    ratio={
      art.image?.width && art.image?.height
        ? art.image.width / art.image.height
        : 1
    }
  />
)

export const ArtCardImage: FC<ArtCardImageProps> = ({ art, isMasonry }) => {
  const router = useRouter()
  const locale = router.locale

  return (
    <CardImage
      art={art}
      isMasonry={isMasonry}
      image={art.image}
      locale={locale}
    />
  )
}
