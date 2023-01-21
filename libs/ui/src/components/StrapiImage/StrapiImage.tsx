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

  const imageToUse =
    images.find(({ width: imageWidth }) => imageWidth || 480 >= width) ||
    images[0]

  if (!imageToUse) {
    console.warn('No image found for', image)
  }

  return API_URL + imageToUse?.url
}

export const StrapiImage: FC<StrapiImageProps> = ({
  image,
  alt,
  sizes,
  ...rest
}) => {
  return (
    <Image
      src={image.url}
      alt={alt || image.name}
      fill
      loader={({ width }) => mapStrapiImage(width, image)}
      sizes={sizes || '100vw'}
      {...rest}
    />
  )
}
