import { FC, useState } from 'react'

import Image, { ImageProps } from 'next/image'

import { VERCEL_ENV } from '@wsvvrijheid/config'
import { UploadFile } from '@wsvvrijheid/types'
import { getMediaUrl } from '@wsvvrijheid/utils'

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

  return getMediaUrl(imageToUse.url) || getMediaUrl(image)
}

export const StrapiImage: FC<StrapiImageProps> = ({
  src,
  alt,
  sizes,
  unoptimized,
  ...rest
}) => {
  const [fallbackUrl, setFallbackUrl] = useState<string>()

  const url = fallbackUrl || getMediaUrl(src)

  const isFile = typeof src !== 'string'
  const isSvg = isFile ? src.url?.includes('.svg') : src?.includes('.svg')

  return (
    <Image
      src={url}
      alt={alt || (src as UploadFile).name}
      fill
      // We use fallback only in development and staging
      // Because when we import the database from production
      // The images are not available in the staging environment or locally
      {...(isFile &&
        VERCEL_ENV === 'production' && {
          loader: ({ width }) => mapStrapiImage(width, src as UploadFile),
        })}
      sizes={sizes || '100vw'}
      unoptimized={isSvg || unoptimized}
      onError={() => {
        const fallback = getMediaUrl(src, true)
        console.log('fallback', fallback)
        setFallbackUrl(fallback)
      }}
      {...rest}
    />
  )
}
