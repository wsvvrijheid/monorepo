import { FC, Fragment } from 'react'

import { AspectRatio, ImageProps as ChakraImageProps } from '@chakra-ui/react'
import Zoom from 'react-medium-image-zoom'

import { UploadFile } from '@wsvvrijheid/types'

import { StrapiImage } from '../StrapiImage'

import 'react-medium-image-zoom/dist/styles.css'

export type WImageProps = {
  ratio?: number | 'twitter'
  src?: UploadFile | string
  alt?: string
  hasZoom?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  unoptimized?: boolean
} & Omit<ChakraImageProps, 'objectFit' | 'src' | 'fill'>

export const WImage: FC<WImageProps> = ({
  src,
  alt,
  ratio,
  objectFit = 'cover',
  hasZoom,
  sizes,
  unoptimized,
  ...rest
}) => {
  if (!src) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('No src provided to WImage')
    }

    return null
  }

  const alternativeText = alt || 'image'

  const Wrapper = hasZoom ? Zoom : Fragment

  const zoomImg = typeof src === 'string' ? { src } : { src: src.url }

  return (
    <AspectRatio
      ratio={ratio === 'twitter' ? 1200 / 675 : ratio}
      overflow="hidden"
      boxSize="full"
      pos="relative"
      // When using the zoom, Next image should be wrapped in a div with position relative
      sx={{
        '[data-rmiz-content]': {
          position: 'relative',
          boxSize: 'full',
        },
      }}
      {...rest}
    >
      <Wrapper {...(hasZoom && { zoomImg })}>
        <StrapiImage
          style={{ objectFit }}
          src={src}
          alt={alternativeText}
          sizes={sizes}
          unoptimized={unoptimized}
        />
      </Wrapper>
    </AspectRatio>
  )
}
