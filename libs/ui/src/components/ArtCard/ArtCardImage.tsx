import { FC } from 'react'

import { UploadFile } from '@wsvvrijheid/types'

import { WImage } from '../WImage'
import { ArtCardImageProps, CardImageProps } from './types'

const CardImage: FC<CardImageProps> = ({ art, isMasonry, image }) => (
  <WImage
    pos="relative"
    zIndex={-1}
    h={isMasonry ? undefined : 300}
    src={image as UploadFile}
    alt={art.title}
    userSelect="none"
  />
)

export const ArtCardImage: FC<ArtCardImageProps> = ({ art, isMasonry }) => {
  return <CardImage art={art} isMasonry={isMasonry} image={art.image} />
}
