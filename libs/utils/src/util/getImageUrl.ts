import { FileFormatsType, UploadFile } from '@wsvvrijheid/types';

export type GetImageUrlType = (
  image: UploadFile | string,
  format?: FileFormatsType
) => string;

export const getImageUrl: GetImageUrlType = (image, format) => {
  if (!image) return '';

  const apiUrl = process.env['NX_API_URL'];
  const siteUrl = process.env['NX_PUBLIC_URL'];

  if (typeof image === 'string') {
    if (image?.startsWith('http')) {
      return image;
    }

    return `${siteUrl}${image}`;
  }

  const src = format ? image.formats[format].url || image.url : image.url;
  return `${apiUrl}${src}`;
};
