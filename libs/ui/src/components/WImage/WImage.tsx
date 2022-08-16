import { FC, Fragment } from 'react'

import {
  AspectRatio,
  chakra,
  ImageProps as ChakraImageProps,
} from '@chakra-ui/react'
import { UploadFile, FileFormatsType } from '@wsvvrijheid/types'
import { getImageUrl } from '@wsvvrijheid/utils'
import Image, { ImageProps } from 'next/image'
import Zoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'
// import { ZoomComponent } from './ZoomComponent'

export type WImageProps = {
  ratio?: number | 'twitter'
  format?: FileFormatsType
  image: UploadFile | string
  alt: string
  isExternal?: boolean
  hasZoom?: boolean
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
  isExternal = false,
  hasZoom,
  ...rest
}) => {
  const src = isExternal ? image : getImageUrl(image, format)
  const thumbnailSrc = isExternal ? image : getImageUrl(image, 'thumbnail')

  console.log('src', src)
  console.log('thumbnailSrc', thumbnailSrc)

  const alternativeText =
    alt || (image as UploadFile)?.alternativeText || 'image'

  // if (hasZoom) {
  //   console.log('has zoom', hasZoom, 'image url', image)
  //   return (
  //     <Zoom>
  //       <AspectRatio
  //         pos="relative"
  //         overflow="hidden"
  //         ratio={ratio === 'twitter' ? 1200 / 675 : ratio}
  //         h="full"
  //       >
  //         <ChakraNextImage
  //           objectFit="cover"
  //           layout="fill"
  //           src={src as string}
  //           alt={alternativeText}
  //           unoptimized={true}
  //           {...rest}
  //         />
  //       </AspectRatio>
  //     </Zoom>
  //   )
  // }
  const Wrapper = hasZoom ? Zoom : Fragment
  return (
    <Wrapper>
      <AspectRatio
        pos="relative"
        overflow="hidden"
        ratio={ratio === 'twitter' ? 1200 / 675 : ratio}
        h="full"
      >
        <ChakraNextImage
          objectFit="cover"
          layout="fill"
          src={src as string}
          alt={alternativeText}
          unoptimized={true}
          {...rest}
        />
      </AspectRatio>
    </Wrapper>
  )
}
