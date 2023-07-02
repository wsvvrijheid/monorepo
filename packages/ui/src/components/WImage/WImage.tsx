import { FC, Fragment } from 'react'

import { AspectRatio, ImageProps as ChakraImageProps } from '@chakra-ui/react'
import Image from 'next/image'
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

// TODO: add loader
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
    console.warn('No src provided to WImage')

    return null
  }

  const alternativeText = alt || 'image'

  const Wrapper = hasZoom ? Zoom : Fragment

  const zoomImg =
    typeof src === 'string'
      ? { src }
      : {
          // If the image is larger than largest format (1080px), use the original size
          // Otherwise, use the largest format
          src:
            (src.width as number) < 1080
              ? src.formats?.large?.url || src.url
              : src.url,
        }

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
        {typeof src === 'string' ? (
          <Image
            unoptimized
            fill
            src={src}
            alt={alternativeText}
            style={{ objectFit }}
          />
        ) : (
          <StrapiImage
            style={{ objectFit }}
            image={src}
            alt={alternativeText}
            sizes={sizes}
            unoptimized={unoptimized}
          />
        )}
      </Wrapper>
    </AspectRatio>
  )
}
