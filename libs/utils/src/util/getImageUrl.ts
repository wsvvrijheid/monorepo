import { FileFormatsType, UploadFile } from '@wsvvrijheid/types'

export const getImageUrl = (
  image: UploadFile | string,
  format?: FileFormatsType,
) => {
  if (!image) return ''

  const apiUrl = process.env['NX_API_URL']
  const siteUrl = process.env['NX_PUBLIC_URL']

  if (typeof image === 'string') {
    if (image?.startsWith('http')) {
      return image
    }

    return `${siteUrl}${image}`
  }

  const src = format ? image.formats?.[format]?.url || image.url : image.url
  return `${apiUrl}${src}`
}
