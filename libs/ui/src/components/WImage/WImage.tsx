import { FC, Fragment } from 'react'

import { AspectRatio, ImageProps as ChakraImageProps } from '@chakra-ui/react'
import { FileFormatsType, UploadFile } from '@wsvvrijheid/types'
import { getImageUrl } from '@wsvvrijheid/utils'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'

// const shimmer = (
//   width: number,
//   height: number,
// ) => `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//         <defs>
//           <linearGradient id="g">
//             <stop stop-color="#ccc" offset="20%" />
//             <stop stop-color="#eee" offset="50%" />
//             <stop stop-color="#ccc" offset="70%" />
//           </linearGradient>
//         </defs>
//         <rect width="${width}" height="${height}" fill="#E2E8F0" />
//         <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
//         <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
//       </svg>`

export type WImageProps = {
  ratio?: number | 'twitter'
  format?: FileFormatsType
  src: UploadFile | string
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
  ...rest
}) => {
  const source = getImageUrl(src, format)
  // const thumbnailSrc = getImageUrl(src, 'thumbnail')

  const alternativeText = alt || (src as UploadFile)?.alternativeText || 'image'

  // const blurDataURL =
  //   thumbnailSrc || `data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`

  const height = rest.height
  const width = rest.width
  const hasDimensions = width && height

  const Wrapper = hasZoom ? Zoom : Fragment

  return (
    <AspectRatio
      ratio={hasDimensions ? 0 : ratio === 'twitter' ? 1200 / 675 : ratio}
      overflow="hidden"
      boxSize="full"
      pos="relative"
      {...rest}
    >
      <Wrapper {...(hasZoom && { ...rest })}>
        <Image
          style={{ objectFit }}
          fill={hasDimensions ? undefined : fill}
          src={source}
          alt={alternativeText}
          {...(hasDimensions && {
            width: parseInt(width as string, 10),
            height: parseInt(height as string, 10),
          })}
        />
      </Wrapper>
    </AspectRatio>
  )
}
