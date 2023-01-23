import { FC } from 'react'

import { API_URL } from '@wsvvrijheid/config'
import { UploadFile } from '@wsvvrijheid/types'
import Image, { ImageProps } from 'next/image'

type StrapiImageProps = Omit<ImageProps, 'src'> & {
  image: UploadFile
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

  const imageToUse = images.find(image => image.width >= width) || images[0]

  if (!imageToUse) {
    console.warn('No image found for', image)
  }

  return imageToUse?.url
}

export const StrapiImage: FC<StrapiImageProps> = ({
  image,
  alt,
  sizes,
  unoptimized,
  ...rest
}) => {
  return (
    <Image
      src={API_URL + image.url}
      alt={alt || image.name}
      fill
      loader={({ width }) => mapStrapiImage(width, image)}
      sizes={sizes || '100vw'}
      unoptimized={image.url.includes('.svg') ? true : unoptimized}
      {...rest}
    />
  )
}
