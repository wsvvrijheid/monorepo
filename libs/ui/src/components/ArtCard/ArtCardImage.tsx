import { FC } from 'react'

import { StrapiLocale, UploadFile } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { ArtCardImageProps, CardImageProps } from './types'
import { WImage } from '../WImage'

const CardImage: FC<CardImageProps> = ({ art, isMasonry, image, locale }) => (
  <WImage
    pos="relative"
    zIndex={-1}
    h={isMasonry ? undefined : 300}
    src={image as UploadFile}
    alt={art?.[`title_${locale as StrapiLocale}`]}
    userSelect="none"
  />
)

export const ArtCardImage: FC<ArtCardImageProps> = ({ art, isMasonry }) => {
  const router = useRouter()
  return (
    <CardImage
      art={art}
      isMasonry={isMasonry}
      image={art.image}
      locale={router.locale as StrapiLocale}
    />
  )
}
