import { FC, useState } from 'react'

import Image, { ImageProps } from 'next/image'

import { UploadFile } from '@wsvvrijheid/types'
import { getImageUrl } from '@wsvvrijheid/utils'

type StrapiImageProps = Omit<ImageProps, 'src'> & {
  src: UploadFile | string
}

const mapStrapiImage = (width: number, image: UploadFile) => {
  const images = []

  if (image.formats) {
    const formats = Object.values(image.formats)
      .filter(f => !!f)
      .map(({ url, width }) => ({ url, width }))
      .sort((a, b) => a.width - b.width)

    images.unshift(...formats)
  }

  // Find the image that is closest in images array
  const imageToUse = images.reduce((prev, curr) => {
    return Math.abs(curr.width - width) < Math.abs(prev.width - width)
      ? curr
      : prev
  }, images[0])

  return getImageUrl(imageToUse.url) || getImageUrl(image)
}

export const StrapiImage: FC<StrapiImageProps> = ({
  src,
  alt,
  sizes,
  unoptimized,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl(src))

  const isFile = typeof src !== 'string'
  const isSvg = isFile ? src.url?.includes('.svg') : src?.includes('.svg')

  return (
    <Image
      src={imgSrc}
      alt={alt || (src as UploadFile).name}
      fill
      {...(isFile && {
        loader: ({ width }) => mapStrapiImage(width, src as UploadFile),
      })}
      sizes={sizes || '100vw'}
      unoptimized={isSvg || unoptimized}
      onError={() => {
        setImgSrc(getImageUrl(src, true))
      }}
      {...rest}
    />
  )
}
