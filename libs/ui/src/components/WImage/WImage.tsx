import { FC, Fragment } from 'react'

import {
  AspectRatio,
  Image,
  ImageProps as ChakraImageProps,
} from '@chakra-ui/react'
import { FileFormatsType, UploadFile } from '@wsvvrijheid/types'
import Zoom from 'react-medium-image-zoom'

import { StrapiImage } from '../StrapiImage'

export type WImageProps = {
  ratio?: number | 'twitter'
  format?: FileFormatsType
  src?: UploadFile | string
  alt?: string
  hasZoom?: boolean
  fill?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
} & Omit<ChakraImageProps, 'objectFit' | 'src' | 'fill'>

// TODO: add loader
export const WImage: FC<WImageProps> = ({
  src,
  format,
  alt,
  ratio,
  objectFit = 'cover',
  fill = true,
  hasZoom,
  sizes,
  ...rest
}) => {
  if (!src) {
    console.warn('No src provided to WImage')
    return null
  }

  console.log('src', src)

  const alternativeText = alt || 'image'

  const Wrapper = hasZoom ? Zoom : Fragment

  return (
    <AspectRatio
      ratio={ratio === 'twitter' ? 1200 / 675 : ratio}
      overflow="hidden"
      boxSize="full"
      pos="relative"
      {...rest}
    >
      <Wrapper {...(hasZoom && { ...rest })}>
        {typeof src === 'string' ? (
          <Image src={src} alt={alternativeText} objectFit={objectFit} />
        ) : (
          <StrapiImage
            style={{ objectFit }}
            image={src}
            alt={alternativeText}
            sizes={sizes}
          />
        )}
      </Wrapper>
    </AspectRatio>
  )
}
