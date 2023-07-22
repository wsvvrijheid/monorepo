import { ASSETS_CALLBACK_URL, ASSETS_URL } from '@wsvvrijheid/config'
import { UploadFile } from '@wsvvrijheid/types'

export const getImageUrl = (
  src?: string | UploadFile | null,
  callback?: boolean,
) => {
  if (!src) {
    console.warn('No src provided to WImage')

    return ''
  }

  if (typeof src === 'string') {
    if (src.startsWith('/uploads')) {
      return (callback ? ASSETS_CALLBACK_URL : ASSETS_URL) + src
    }

    return src
  }

  if (src.url?.startsWith('/uploads')) {
    return (callback ? ASSETS_CALLBACK_URL : ASSETS_URL) + src?.url
  }

  return src.url
}
