import { FC } from 'react'

import { AspectRatio, ImageProps as ChakraImageProps } from '@chakra-ui/react'
import { UploadFile, FileFormatsType } from '@wsvvrijheid/types'
import { getImageUrl, toBase64 } from '@wsvvrijheid/utils'
import Image, { ImageProps } from 'next/image'

const shimmer = (
  width: number,
  height: number,
) => `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="g">
            <stop stop-color="#ccc" offset="20%" />
            <stop stop-color="#eee" offset="50%" />
            <stop stop-color="#ccc" offset="70%" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="#E2E8F0" />
        <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
      </svg>`

export type WImageProps = {
  ratio?: number | 'twitter'
  format?: FileFormatsType
  image: UploadFile | string
  alt: string
  isExternal?: boolean
} & Omit<ImageProps, 'src' | 'placeholder' | 'blurDataURL'> &
  ChakraImageProps

// TODO: add loader
export const WImage: FC<WImageProps> = ({
  image,
  format,
  alt,
  ratio,
  objectFit,
  layout,
  ...rest
}) => {
  const src = getImageUrl(image, format)
  const thumbnailSrc = getImageUrl(image, 'thumbnail')

  const alternativeText =
    alt || (image as UploadFile)?.alternativeText || 'image'

  const blurDataURL =
    thumbnailSrc || `data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`

  const height = rest.height || rest.h
  const width = rest.width || rest.w

  return (
    <AspectRatio
      ratio={width && height ? 0 : ratio === 'twitter' ? 1200 / 675 : ratio}
      h={height || 'full'}
      w={width || 'full'}
      overflow="hidden"
      {...rest}
    >
      <Image
        objectFit={objectFit || 'cover'}
        layout={layout || (height && width) ? 'fixed' : 'fill'}
        src={src}
        alt={alternativeText}
        placeholder="blur"
        blurDataURL={blurDataURL as string}
        height={parseInt(height as string, 10) || 0}
        width={parseInt(width as string, 10) || 0}
      />
    </AspectRatio>
  )
}
