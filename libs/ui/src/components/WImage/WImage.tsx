import { FC } from 'react'

import {
  AspectRatio,
  chakra,
  ImageProps as ChakraImageProps,
} from '@chakra-ui/react'
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
} & Omit<ImageProps, 'src'> &
  ChakraImageProps

const ChakraNextImage = chakra(Image, {
  shouldForwardProp: prop =>
    [
      'width',
      'height',
      'src',
      'alt',
      'layout',
      'loader',
      'blurDataUrl',
      'placeholder',
      'objectFit',
    ].includes(prop),
})

// TODO: add loader
export const WImage: FC<WImageProps> = ({
  image,
  format,
  alt,
  ratio,
  ...rest
}) => {
  const src = getImageUrl(image, format)

  const alternativeText =
    typeof alt || (image as UploadFile)?.alternativeText || 'image'

  return (
    <AspectRatio
      pos="relative"
      overflow="hidden"
      ratio={ratio === 'twitter' ? 1200 / 675 : ratio}
    >
      <ChakraNextImage
        objectFit="cover"
        layout="fill"
        src={src}
        alt={alternativeText}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`}
        {...rest}
      />
    </AspectRatio>
  )
}
