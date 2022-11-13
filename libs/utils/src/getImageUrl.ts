import { API_URL, SITE_URL } from '@wsvvrijheid/config'
import { FileFormatsType, UploadFile } from '@wsvvrijheid/types'

export const getImageUrl = (
  image: UploadFile | string,
  format?: FileFormatsType,
) => {
  if (!image) return ''

  if (typeof image === 'string') {
    if (
      image?.startsWith('http') ||
      image?.startsWith('data:') ||
      image?.startsWith('blob:')
    ) {
      return image
    }

    if (image?.startsWith('/uploads')) {
      return `${API_URL}${image}`
    }

    return `${SITE_URL}${image}`
  }

  const src = format ? image.formats?.[format]?.url || image.url : image.url
  return `${API_URL}${src}`
}
