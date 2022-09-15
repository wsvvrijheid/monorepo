import { ComponentProps, FC, useState } from 'react'

import { AspectRatio, ImageProps as ChakraImageProps } from '@chakra-ui/react'
import { UploadFile, FileFormatsType } from '@wsvvrijheid/types'
import { getImageUrl, toBase64 } from '@wsvvrijheid/utils'
import Image from 'next/image'
import Cropper from 'react-easy-crop'
import { Point } from 'react-easy-crop/types'

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
  src: UploadFile | string
  alt?: string
  hasZoom?: boolean
} & Pick<ComponentProps<typeof Image>, 'layout' | 'objectFit'> &
  Omit<ChakraImageProps, 'objectFit' | 'src'>

// TODO: add loader
export const WImage: FC<WImageProps> = ({
  src,
  format,
  alt,
  ratio,
  objectFit,
  layout = 'fill',
  hasZoom,
  ...rest
}) => {
  const source = getImageUrl(src, format)
  const thumbnailSrc = getImageUrl(src, 'thumbnail')
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const alternativeText = alt || (src as UploadFile)?.alternativeText || 'image'

  const blurDataURL =
    thumbnailSrc || `data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`

  const height = rest.height || rest.h
  const width = rest.width || rest.w

  return (
    <AspectRatio
      ratio={width && height ? 0 : ratio === 'twitter' ? 1200 / 675 : ratio}
      overflow="hidden"
      boxSize="full"
      pos="relative"
      {...rest}
    >
      {hasZoom ? (
        <Cropper
          crop={crop}
          zoom={zoom}
          aspect={16 / 16}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          image={source}
        />
      ) : (
        <Image
          objectFit={objectFit || 'cover'}
          layout={layout}
          src={source}
          alt={alternativeText}
          placeholder="blur"
          blurDataURL={blurDataURL as string}
          height={parseInt(height as string, 10) || 0}
          width={parseInt(width as string, 10) || 0}
        />
      )}
    </AspectRatio>
  )
}
