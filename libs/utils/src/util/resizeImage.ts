import { fromImage } from 'imtool'
import { ImageType } from 'imtool/lib/Utils'

export const resizeImage = async (
  image: ImageType,
  maxSize = 1080,
): Promise<Blob> => {
  const img = await fromImage(image)
  const thumbnail = img.thumbnail(maxSize || 1920)

  return thumbnail.toBlob()
}
